import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Subscription } from '../types';
import { v4 as uuid } from 'uuid';

export default function Subscriptions() {
  const { subscriptions, customers, settings, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [newSub, setNewSub] = useState({ title: '', customerId: '', amount: '', frequency: 'monthly' as Subscription['frequency'], description: '' });

  const active = subscriptions.filter(s => s.status === 'active');
  const monthlyRevenue = active.reduce((sum, s) => {
    const mult = s.frequency === 'weekly' ? 4.33 : s.frequency === 'biweekly' ? 2.17 : s.frequency === 'monthly' ? 1 : s.frequency === 'quarterly' ? 0.333 : 0.083;
    return sum + s.amount * mult;
  }, 0);

  const annualRevenue = active.reduce((sum, s) => {
    const mult = s.frequency === 'weekly' ? 52 : s.frequency === 'biweekly' ? 26 : s.frequency === 'monthly' ? 12 : s.frequency === 'quarterly' ? 4 : 1;
    return sum + s.amount * mult;
  }, 0);

  function createSubscription() {
    const customer = customers.find(c => c.id === newSub.customerId);
    const sub: Subscription = {
      id: uuid(),
      customerId: newSub.customerId,
      customerName: customer?.name || '',
      title: newSub.title,
      description: newSub.description,
      amount: parseFloat(newSub.amount) || 0,
      frequency: newSub.frequency,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      notes: '',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_SUBSCRIPTION', payload: sub });
    setShowNew(false);
    setNewSub({ title: '', customerId: '', amount: '', frequency: 'monthly', description: '' });
  }

  function toggleStatus(sub: Subscription) {
    const next = sub.status === 'active' ? 'paused' : sub.status === 'paused' ? 'active' : 'cancelled';
    dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: { ...sub, status: next } });
  }

  const freqLabel = (f: string) => ({ weekly: '/wk', biweekly: '/2wk', monthly: '/mo', quarterly: '/qtr', yearly: '/yr' }[f] || '');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recurring Revenue</h2>
        <button onClick={() => setShowNew(!showNew)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ New</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs">Monthly (MRR)</p>
          <p className="text-2xl font-bold text-emerald-400">${monthlyRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs">Annual (ARR)</p>
          <p className="text-2xl font-bold text-brand-400">${annualRevenue.toFixed(0)}</p>
        </div>
      </div>

      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Service title" value={newSub.title} onChange={e => setNewSub({ ...newSub, title: e.target.value })} />
          <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newSub.customerId} onChange={e => setNewSub({ ...newSub, customerId: e.target.value })}>
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Amount" value={newSub.amount} onChange={e => setNewSub({ ...newSub, amount: e.target.value })} />
            <select className="bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newSub.frequency} onChange={e => setNewSub({ ...newSub, frequency: e.target.value as any })}>
              {['weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'].map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
            </select>
          </div>
          <button onClick={createSubscription} disabled={!newSub.title || !newSub.amount} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg py-2 font-medium">Create Subscription</button>
        </div>
      )}

      {/* List */}
      {subscriptions.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">🔄</p>
          <p>No recurring services yet.</p>
          <p className="text-sm mt-1">Set up retainers, maintenance plans, or subscriptions.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {subscriptions.sort((a, b) => a.status.localeCompare(b.status) || a.title.localeCompare(b.title)).map(sub => (
            <div key={sub.id} className={`bg-slate-900 rounded-lg p-4 border ${sub.status === 'active' ? 'border-slate-800' : 'border-slate-800 opacity-60'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{sub.title}</p>
                  <p className="text-slate-500 text-sm">{sub.customerName}</p>
                  <p className="text-slate-500 text-xs mt-1">Next: {sub.nextBillingDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${sub.amount.toFixed(2)}<span className="text-xs text-slate-500">{freqLabel(sub.frequency)}</span></p>
                  <button onClick={() => toggleStatus(sub)} className={`mt-1 badge ${sub.status === 'active' ? 'badge-accepted' : sub.status === 'paused' ? 'badge-in_progress' : 'badge-declined'}`}>
                    {sub.status}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
