import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { InvoiceLineItem, Payment } from '../types';
import { v4 as uuid } from 'uuid';
import { generateInvoicePDF } from '../utils/pdf';

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices, customers, settings, dispatch } = useApp();
  const invoice = invoices.find(i => i.id === id);
  const customer = customers.find(c => c.id === invoice?.customerId) || undefined;

  const defaultInvoice = invoice || {
    id: '', customerId: '', customerName: '', title: '',
    lineItems: [] as InvoiceLineItem[], taxRate: 0,
    subtotal: 0, tax: 0, total: 0, payments: [] as Payment[],
    amountPaid: 0, amountDue: 0, status: 'draft' as const,
    dueDate: '', issueDate: '', notes: '', createdAt: '', updatedAt: '',
  };

  const [draft, setDraft] = useState({ ...defaultInvoice });
  const [showPayment, setShowPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({ amount: '', method: 'cash' as Payment['method'], notes: '' });
  const [processingPay, setProcessingPay] = useState(false);

  if (!invoice) return <div className="text-center py-12 text-slate-500">Invoice not found</div>;

  function updateDraft(patch: Partial<typeof draft>) {
    setDraft(d => ({ ...d, ...patch, updatedAt: new Date().toISOString() }));
  }

  function recalc(d: typeof draft) {
    const subtotal = d.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
    const tax = subtotal * (d.taxRate / 100);
    const total = subtotal + tax;
    const amountPaid = d.payments.reduce((s, p) => s + p.amount, 0);
    const amountDue = total - amountPaid;
    let status = d.status;
    if (amountDue <= 0 && total > 0) status = 'paid';
    else if (amountPaid > 0) status = 'partial';
    return { ...d, subtotal, tax, total, amountPaid, amountDue, status };
  }

  function addLineItem() {
    const li: InvoiceLineItem = { id: uuid(), description: '', quantity: 1, unitPrice: 0 };
    setDraft(d => recalc({ ...d, lineItems: [...d.lineItems, li] }));
  }

  function updateLineItem(liId: string, patch: Partial<InvoiceLineItem>) {
    setDraft(d => recalc({ ...d, lineItems: d.lineItems.map(li => li.id === liId ? { ...li, ...patch } : li) }));
  }

  function removeLineItem(liId: string) {
    setDraft(d => recalc({ ...d, lineItems: d.lineItems.filter(li => li.id !== liId) }));
  }

  function addPayment() {
    const p: Payment = {
      id: uuid(),
      amount: parseFloat(newPayment.amount) || 0,
      method: newPayment.method,
      date: new Date().toISOString().split('T')[0],
      notes: newPayment.notes,
    };
    setDraft(d => recalc({ ...d, payments: [...d.payments, p] }));
    setShowPayment(false);
    setNewPayment({ amount: '', method: 'cash', notes: '' });
  }

  function save() {
    dispatch({ type: 'UPDATE_INVOICE', payload: draft });
  }

  function deleteInvoice() {
    if (confirm('Delete this invoice?')) {
      dispatch({ type: 'DELETE_INVOICE', payload: draft.id });
      navigate('/invoices');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Invoice</h2>
        <div className="flex gap-2">
          <button onClick={() => generateInvoicePDF(draft, customer, settings)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-lg font-medium">📄 PDF</button>
          <button onClick={save} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Save</button>
          <button onClick={deleteInvoice} className="bg-red-900 hover:bg-red-800 text-red-200 text-sm px-3 py-2 rounded-lg">🗑</button>
        </div>
      </div>

      <div className="space-y-3">
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Invoice title" value={draft.title} onChange={e => updateDraft({ title: e.target.value })} />
        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.customerId} onChange={e => {
          const cust = customers.find(c => c.id === e.target.value);
          updateDraft({ customerId: e.target.value, customerName: cust?.name || '' });
        }}>
          <option value="">Select customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.status} onChange={e => updateDraft({ status: e.target.value as any })}>
          {['draft', 'sent', 'partial', 'paid', 'overdue'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Issue date</label>
            <input type="date" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.issueDate} onChange={e => updateDraft({ issueDate: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Due date</label>
            <input type="date" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.dueDate} onChange={e => updateDraft({ dueDate: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Line items */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Line Items</h3>
        <div className="space-y-2">
          {draft.lineItems.map((li, i) => (
            <div key={li.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">#{i + 1}</span>
                <button onClick={() => removeLineItem(li.id)} className="text-red-400 text-xs">Remove</button>
              </div>
              <input className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Description" value={li.description} onChange={e => updateLineItem(li.id, { description: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">Qty</label>
                  <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={li.quantity} onChange={e => updateLineItem(li.id, { quantity: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Unit Price</label>
                  <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={li.unitPrice} onChange={e => updateLineItem(li.id, { unitPrice: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addLineItem} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2 text-sm">+ Add Line Item</button>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-2">
        <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span>${draft.subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-slate-400">Tax ({draft.taxRate}%)</span><span>${draft.tax.toFixed(2)}</span></div>
        <div className="flex justify-between text-lg font-bold border-t border-slate-700 pt-2"><span>Total</span><span>${draft.total.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm text-emerald-400"><span>Paid</span><span>${draft.amountPaid.toFixed(2)}</span></div>
        <div className="flex justify-between text-lg font-bold"><span className="text-slate-400">Due</span><span className={draft.amountDue > 0 ? 'text-amber-400' : 'text-emerald-400'}>${draft.amountDue.toFixed(2)}</span></div>
      </div>

      {/* Stripe Payment Section */}
      {draft.amountDue > 0 && (
        <div className="bg-gradient-to-r from-indigo-900/50 to-brand-900/50 rounded-xl p-4 border border-indigo-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium">Accept Payment</h3>
              <p className="text-slate-400 text-xs">Customer pays ${draft.amountDue.toFixed(2)} online</p>
            </div>
            <span className="text-indigo-400 text-sm">Powered by Stripe</span>
          </div>

          {processingPay ? (
            <div className="text-center py-3">
              <span className="animate-spin text-2xl">⏳</span>
              <p className="text-sm text-slate-400 mt-2">Processing payment...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Pay Now button */}
              <button
                onClick={() => {
                  // Navigate to the Stripe Checkout page
                  window.location.href = `/invoices/${draft.id}/pay`;
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2"
              >
                💳 Pay ${draft.amountDue.toFixed(2)} Now
              </button>

              {/* Payment Link button */}
              <button
                onClick={() => {
                  window.location.href = `/invoices/${draft.id}/payment-link`;
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"
              >
                🔗 Share Payment Link
              </button>
            </div>
          )}
        </div>
      )}

      {/* Payments */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Payments</h3>
        {draft.payments.length > 0 && (
          <div className="space-y-1 mb-3">
            {draft.payments.map(p => (
              <div key={p.id} className="flex items-center justify-between bg-slate-900 rounded px-3 py-2 border border-slate-800">
                <div>
                  <span className="text-sm capitalize">{p.method === 'stripe' ? '💳 Card (Stripe)' : p.method}</span>
                  <span className="text-xs text-slate-500 ml-2">{p.date}</span>
                </div>
                <span className="text-sm font-medium text-emerald-400">${p.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        {showPayment ? (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
            <input type="number" className="w-full bg-slate-900 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Amount" value={newPayment.amount} onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })} />
            <select className="w-full bg-slate-900 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newPayment.method} onChange={e => setNewPayment({ ...newPayment, method: e.target.value as any })}>
              {['cash', 'check', 'card', 'transfer', 'other'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <input className="w-full bg-slate-900 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes (optional)" value={newPayment.notes} onChange={e => setNewPayment({ ...newPayment, notes: e.target.value })} />
            <div className="flex gap-2">
              <button onClick={addPayment} className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded py-1.5 text-sm font-medium">Add</button>
              <button onClick={() => setShowPayment(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded py-1.5 text-sm">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowPayment(true)} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2 text-sm">+ Record Payment</button>
        )}
      </div>

      <textarea className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes" rows={3} value={draft.notes} onChange={e => updateDraft({ notes: e.target.value })} />
    </div>
  );
}
