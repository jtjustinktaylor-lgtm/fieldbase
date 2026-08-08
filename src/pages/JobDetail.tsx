import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Expense, Invoice, InvoiceLineItem } from '../types';
import { v4 as uuid } from 'uuid';
import PhotoCapture from '../components/PhotoCapture';
import SignaturePad from '../components/SignaturePad';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, customers, quotes, settings, dispatch } = useApp();
  const job = jobs.find(j => j.id === id);

  const defaultJob = job || {
    id: '', customerId: '', customerName: '', title: '', description: '',
    status: 'scheduled' as const, estimatedRevenue: 0, actualRevenue: 0,
    estimatedCost: 0, actualCost: 0, expenses: [] as Expense[],
    startDate: '', completedDate: '', notes: '', createdAt: '', updatedAt: '',
  };

  const [draft, setDraft] = useState({ ...defaultJob });
  const [showExpense, setShowExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'materials' as Expense['category'] });

  if (!job) return <div className="text-center py-12 text-slate-500">Job not found</div>;

  function updateDraft(patch: Partial<typeof draft>) {
    setDraft(d => ({ ...d, ...patch, updatedAt: new Date().toISOString() }));
  }

  function save() {
    dispatch({ type: 'UPDATE_JOB', payload: draft });
  }

  function deleteJob() {
    if (confirm('Delete this job?')) {
      dispatch({ type: 'DELETE_JOB', payload: draft.id });
      navigate('/jobs');
    }
  }

  // Build line items: prefer linked quote's items, fallback to single revenue line
  function getInvoiceLineItems(): InvoiceLineItem[] {
    if (job?.quoteId) {
      const quote = quotes.find(q => q.id === job.quoteId);
      if (quote && quote.lineItems.length > 0) {
        return quote.lineItems.map(li => ({
          id: uuid(),
          description: li.description,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
        }));
      }
    }
    // Fallback: single line item from job revenue
    const amount = draft.actualRevenue || draft.estimatedRevenue;
    return [{
      id: uuid(),
      description: draft.title || 'Job services',
      quantity: 1,
      unitPrice: amount,
    }];
  }

  function createInvoice() {
    const lineItems = getInvoiceLineItems();
    const subtotal = lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
    const taxRate = settings.taxRate || 0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const invoice: Invoice = {
      id: uuid(),
      jobId: draft.id,
      quoteId: draft.quoteId,
      customerId: draft.customerId,
      customerName: draft.customerName,
      title: `Invoice: ${draft.title}`,
      lineItems,
      taxRate,
      subtotal,
      tax,
      total,
      payments: [],
      amountPaid: 0,
      amountDue: total,
      status: 'draft',
      dueDate,
      issueDate: today,
      notes: draft.notes ? `Job: ${draft.title}\n${draft.notes}` : `Job: ${draft.title}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_INVOICE', payload: invoice });
    navigate(`/invoices/${invoice.id}`);
  }

  function addExpense() {
    const exp: Expense = {
      id: uuid(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount) || 0,
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = { ...draft, expenses: [...draft.expenses, exp], actualCost: draft.actualCost + exp.amount };
    setDraft(updated);
    setShowExpense(false);
    setNewExpense({ description: '', amount: '', category: 'materials' });
  }

  function removeExpense(expId: string) {
    const exp = draft.expenses.find(e => e.id === expId);
    if (exp) {
      setDraft(d => ({
        ...d,
        expenses: d.expenses.filter(e => e.id !== expId),
        actualCost: d.actualCost - exp.amount,
      }));
    }
  }

  const profit = draft.actualRevenue - draft.actualCost;
  const margin = draft.actualRevenue > 0 ? ((profit / draft.actualRevenue) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Edit Job</h2>
        <div className="flex gap-2">
          {draft.status !== 'cancelled' && (
            <button onClick={createInvoice} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
              📄 Create Invoice
            </button>
          )}
          <button onClick={save} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Save</button>
          <button onClick={deleteJob} className="bg-red-900 hover:bg-red-800 text-red-200 text-sm px-3 py-2 rounded-lg">🗑</button>
        </div>
      </div>

      {/* Basic info */}
      <div className="space-y-3">
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Job title" value={draft.title} onChange={e => updateDraft({ title: e.target.value })} />

        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.customerId} onChange={e => {
          const cust = customers.find(c => c.id === e.target.value);
          updateDraft({ customerId: e.target.value, customerName: cust?.name || '' });
        }}>
          <option value="">Select customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.status} onChange={e => updateDraft({ status: e.target.value as any })}>
          {['scheduled', 'in_progress', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>

        <textarea className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Description" rows={2} value={draft.description} onChange={e => updateDraft({ description: e.target.value })} />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Start date</label>
            <input type="date" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.startDate} onChange={e => updateDraft({ startDate: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Completed date</label>
            <input type="date" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.completedDate} onChange={e => updateDraft({ completedDate: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Financials */}
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Financials</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Estimated Revenue</label>
            <input type="number" className="w-full bg-slate-800 rounded px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.estimatedRevenue} onChange={e => updateDraft({ estimatedRevenue: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Actual Revenue</label>
            <input type="number" className="w-full bg-slate-800 rounded px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.actualRevenue} onChange={e => updateDraft({ actualRevenue: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Estimated Cost</label>
            <input type="number" className="w-full bg-slate-800 rounded px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.estimatedCost} onChange={e => updateDraft({ estimatedCost: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Actual Cost (auto)</label>
            <input type="number" disabled className="w-full bg-slate-950 rounded px-3 py-2 text-sm border border-slate-800 text-slate-500" value={draft.actualCost} />
          </div>
        </div>
        <div className="flex justify-between pt-2 border-t border-slate-700">
          <span className="text-sm text-slate-400">Profit</span>
          <span className={`text-lg font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>${profit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-400">Margin</span>
          <span className="text-sm font-medium">{margin.toFixed(1)}%</span>
        </div>
      </div>

      {/* Expenses */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Expenses</h3>
        {draft.expenses.length > 0 && (
          <div className="space-y-1 mb-3">
            {draft.expenses.map(exp => (
              <div key={exp.id} className="flex items-center justify-between bg-slate-900 rounded px-3 py-2 border border-slate-800">
                <div>
                  <span className="text-sm">{exp.description}</span>
                  <span className="text-xs text-slate-500 ml-2">({exp.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${exp.amount.toFixed(2)}</span>
                  <button onClick={() => removeExpense(exp.id)} className="text-red-400 text-xs">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showExpense ? (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
            <input className="w-full bg-slate-900 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Description" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <input type="number" className="bg-slate-900 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Amount" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} />
              <select className="bg-slate-900 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value as any })}>
                {['materials', 'labor', 'equipment', 'travel', 'other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={addExpense} className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded py-1.5 text-sm font-medium">Add</button>
              <button onClick={() => setShowExpense(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded py-1.5 text-sm">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowExpense(true)} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2 text-sm">
            + Add Expense
          </button>
        )}
      </div>

      {/* Photos */}
      <PhotoCapture parentId={draft.id} parentType="job" />

      {/* Signature */}
      <SignaturePad
        label="Customer sign-off"
        onSave={(dataUrl) => {
          const att = {
            id: uuid(), parentId: draft.id, parentType: 'job' as const,
            name: 'signature.png', type: 'signature' as const,
            dataUrl, notes: '', createdAt: new Date().toISOString(),
          };
          dispatch({ type: 'ADD_ATTACHMENT', payload: att });
        }}
      />

      {/* Notes */}
      <textarea className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes" rows={3} value={draft.notes} onChange={e => updateDraft({ notes: e.target.value })} />
    </div>
  );
}
