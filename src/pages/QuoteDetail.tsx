import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { QuoteLineItem } from '../types';
import { v4 as uuid } from 'uuid';
import { generateQuotePDF } from '../utils/pdf';

export default function QuoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quotes, customers, settings, dispatch } = useApp();
  const quote = quotes.find(q => q.id === id);
  const customer = customers.find(c => c.id === quote?.customerId);

  const defaultQuote = quote || {
    id: '', customerId: '', customerName: '', title: '', description: '',
    lineItems: [] as QuoteLineItem[], taxRate: 0, status: 'draft' as const,
    validUntil: '', notes: '', createdAt: '', updatedAt: '',
  };

  const [draft, setDraft] = useState({ ...defaultQuote });

  if (!quote) return <div className="text-center py-12 text-slate-500">Quote not found</div>;

  function updateDraft(patch: Partial<typeof draft>) {
    setDraft(d => ({ ...d, ...patch, updatedAt: new Date().toISOString() }));
  }

  function addLineItem() {
    const li: QuoteLineItem = { id: uuid(), description: '', quantity: 1, unitPrice: 0, cost: 0 };
    setDraft(d => ({ ...d, lineItems: [...d.lineItems, li] }));
  }

  function updateLineItem(liId: string, patch: Partial<QuoteLineItem>) {
    setDraft(d => ({
      ...d,
      lineItems: d.lineItems.map(li => li.id === liId ? { ...li, ...patch } : li),
    }));
  }

  function removeLineItem(liId: string) {
    setDraft(d => ({ ...d, lineItems: d.lineItems.filter(li => li.id !== liId) }));
  }

  function save() {
    dispatch({ type: 'UPDATE_QUOTE', payload: draft });
  }

  function deleteQuote() {
    if (confirm('Delete this quote?')) {
      dispatch({ type: 'DELETE_QUOTE', payload: draft.id });
      navigate('/quotes');
    }
  }

  const subtotal = draft.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
  const tax = subtotal * (draft.taxRate / 100);
  const total = subtotal + tax;
  const totalCost = draft.lineItems.reduce((s, li) => s + li.quantity * li.cost, 0);
  const profit = subtotal - totalCost;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Edit Quote</h2>
        <div className="flex gap-2">
          <button onClick={() => generateQuotePDF(draft, customer, settings)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-lg font-medium">📄 PDF</button>
          <button onClick={save} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Save</button>
          <button onClick={deleteQuote} className="bg-red-900 hover:bg-red-800 text-red-200 text-sm px-3 py-2 rounded-lg">🗑</button>
        </div>
      </div>

      {/* Basic info */}
      <div className="space-y-3">
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Quote title" value={draft.title} onChange={e => updateDraft({ title: e.target.value })} />

        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.customerId} onChange={e => {
          const cust = customers.find(c => c.id === e.target.value);
          updateDraft({ customerId: e.target.value, customerName: cust?.name || '' });
        }}>
          <option value="">Select customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.status} onChange={e => updateDraft({ status: e.target.value as any })}>
          {['draft', 'sent', 'accepted', 'declined', 'expired'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Valid until</label>
            <input type="date" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.validUntil} onChange={e => updateDraft({ validUntil: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Tax rate %</label>
            <input type="number" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.taxRate} onChange={e => updateDraft({ taxRate: parseFloat(e.target.value) || 0 })} />
          </div>
        </div>

        <textarea className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Description" rows={2} value={draft.description} onChange={e => updateDraft({ description: e.target.value })} />
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
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">Qty</label>
                  <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={li.quantity} onChange={e => updateLineItem(li.id, { quantity: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Unit Price</label>
                  <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={li.unitPrice} onChange={e => updateLineItem(li.id, { unitPrice: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Cost</label>
                  <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={li.cost} onChange={e => updateLineItem(li.id, { cost: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addLineItem} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2 text-sm">
            + Add Line Item
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-2">
        <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-slate-400">Tax ({draft.taxRate}%)</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between text-lg font-bold border-t border-slate-700 pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-slate-400">Est. Cost</span><span>${totalCost.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm font-medium"><span className="text-slate-400">Est. Profit</span><span className={profit >= 0 ? 'text-emerald-400' : 'text-red-400'}>${profit.toFixed(2)}</span></div>
      </div>

      {/* Notes */}
      <textarea className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes" rows={3} value={draft.notes} onChange={e => updateDraft({ notes: e.target.value })} />
    </div>
  );
}
