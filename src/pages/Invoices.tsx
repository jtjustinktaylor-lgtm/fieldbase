import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Invoice } from '../types';
import { v4 as uuid } from 'uuid';
import { validate, required, fieldError, hasErrors, type FieldError } from '../utils/validation';

export default function Invoices() {
  const { invoices, customers, settings, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [newInv, setNewInv] = useState({ title: '', customerId: '' });
  const [errors, setErrors] = useState<FieldError[]>([]);

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  function validateForm(): boolean {
    const result = validate(
      required(newInv.title, 'Title'),
      required(newInv.customerId, 'Customer'),
    );
    setErrors(result);
    return !hasErrors(result);
  }

  function createInvoice() {
    if (!validateForm()) return;
    const customer = customers.find(c => c.id === newInv.customerId);
    const invoice: Invoice = {
      id: uuid(),
      customerId: newInv.customerId,
      customerName: customer?.name || '',
      title: newInv.title.trim(),
      lineItems: [{ id: uuid(), description: '', quantity: 1, unitPrice: 0 }],
      taxRate: settings.taxRate,
      subtotal: 0, tax: 0, total: 0,
      payments: [],
      amountPaid: 0, amountDue: 0,
      status: 'draft',
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      issueDate: new Date().toISOString().split('T')[0],
      notes: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_INVOICE', payload: invoice });
    setShowNew(false);
    setNewInv({ title: '', customerId: '' });
    setErrors([]);
  }

  function closeForm() {
    setShowNew(false);
    setErrors([]);
    setNewInv({ title: '', customerId: '' });
  }

  const err = (field: string) => fieldError(errors, field);
  const statuses = ['all', 'draft', 'sent', 'partial', 'paid', 'overdue'];
  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amountDue, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amountDue, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Invoices</h2>
        <button onClick={() => { showNew ? closeForm() : setShowNew(true); }} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
          {showNew ? 'Cancel' : '+ New'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-slate-400 text-xs">Outstanding</p>
          <p className="text-xl font-bold text-amber-400">${totalOutstanding.toFixed(2)}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-slate-400 text-xs">Overdue</p>
          <p className="text-xl font-bold text-red-400">${totalOverdue.toFixed(2)}</p>
        </div>
      </div>

      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <div>
            <input
              className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Title') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`}
              placeholder="Invoice title *"
              value={newInv.title}
              onChange={e => { setNewInv({ ...newInv, title: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Title')); }}
            />
            {err('Title') && <p className="text-red-400 text-xs mt-1">{err('Title')}</p>}
          </div>
          <div>
            <select
              className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Customer') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`}
              value={newInv.customerId}
              onChange={e => { setNewInv({ ...newInv, customerId: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Customer')); }}
            >
              <option value="">Select customer *</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {err('Customer') && <p className="text-red-400 text-xs mt-1">{err('Customer')}</p>}
          </div>
          <button onClick={createInvoice} className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 font-medium">
            Create Invoice
          </button>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${filter === s ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">💳</p>
          <p>No invoices yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map(inv => (
            <Link key={inv.id} to={`/invoices/${inv.id}`} className="block bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{inv.title || 'Untitled Invoice'}</p>
                  <p className="text-slate-500 text-sm">{inv.customerName || 'No customer'}</p>
                </div>
                <div className="text-right">
                  <span className={`badge badge-${inv.status === 'partial' ? 'in_progress' : inv.status}`}>{inv.status}</span>
                  <p className="text-sm font-medium mt-1">${inv.amountDue.toFixed(2)} due</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
