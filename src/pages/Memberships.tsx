import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { v4 as uuid } from 'uuid';

type Tab = 'plans' | 'enrollments' | 'warranties';

export default function Memberships() {
  const { settings, customers, jobs, membershipPlans, customerMemberships, warranties, dispatch } = useApp();
  const [tab, setTab] = useState<Tab>('plans');
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [showWarrantyForm, setShowWarrantyForm] = useState(false);
  const [planDraft, setPlanDraft] = useState({ name: '', description: '', price: '', frequency: 'monthly' as 'monthly' | 'quarterly' | 'yearly', includedServices: '' });
  const [enrollDraft, setEnrollDraft] = useState({ customerId: '', planId: '', notes: '' });
  const [warrantyDraft, setWarrantyDraft] = useState({ jobId: '', type: 'both' as 'parts' | 'labor' | 'both', description: '', endDate: '', notes: '' });
  const currency = settings.currency || 'USD';

  function addPlan() {
    if (!planDraft.name) return;
    dispatch({ type: 'ADD_MEMBERSHIP_PLAN', payload: {
      id: uuid(), name: planDraft.name, description: planDraft.description,
      price: parseFloat(planDraft.price) || 0, frequency: planDraft.frequency,
      includedServices: planDraft.includedServices.split(',').map(s => s.trim()).filter(Boolean),
      status: 'active', createdAt: new Date().toISOString(),
    }});
    setPlanDraft({ name: '', description: '', price: '', frequency: 'monthly', includedServices: '' });
    setShowPlanForm(false);
  }

  function addEnrollment() {
    if (!enrollDraft.customerId || !enrollDraft.planId) return;
    const plan = membershipPlans.find(p => p.id === enrollDraft.planId);
    const cust = customers.find(c => c.id === enrollDraft.customerId);
    if (!plan || !cust) return;
    const now = new Date();
    const next = new Date(now);
    if (plan.frequency === 'monthly') next.setMonth(next.getMonth() + 1);
    else if (plan.frequency === 'quarterly') next.setMonth(next.getMonth() + 3);
    else next.setFullYear(next.getFullYear() + 1);
    dispatch({ type: 'ADD_CUSTOMER_MEMBERSHIP', payload: {
      id: uuid(), customerId: cust.id, customerName: cust.name,
      planId: plan.id, planName: plan.name, price: plan.price, frequency: plan.frequency,
      startDate: now.toISOString().split('T')[0], nextBillingDate: next.toISOString().split('T')[0],
      status: 'active', autoRenew: true, notes: enrollDraft.notes, createdAt: now.toISOString(),
    }});
    setEnrollDraft({ customerId: '', planId: '', notes: '' });
    setShowEnrollForm(false);
  }

  function addWarranty() {
    if (!warrantyDraft.jobId || !warrantyDraft.description || !warrantyDraft.endDate) return;
    const job = jobs.find(j => j.id === warrantyDraft.jobId);
    if (!job) return;
    dispatch({ type: 'ADD_WARRANTY', payload: {
      id: uuid(), jobId: job.id, jobTitle: job.title,
      customerId: job.customerId, customerName: job.customerName,
      type: warrantyDraft.type, description: warrantyDraft.description,
      startDate: new Date().toISOString().split('T')[0],
      endDate: warrantyDraft.endDate, status: 'active',
      notes: warrantyDraft.notes, createdAt: new Date().toISOString(),
    }});
    setWarrantyDraft({ jobId: '', type: 'both', description: '', endDate: '', notes: '' });
    setShowWarrantyForm(false);
  }

  const activePlans = membershipPlans.filter(p => p.status === 'active');
  const activeEnrollments = customerMemberships.filter(m => m.status === 'active');
  const mrr = activeEnrollments.reduce((sum, m) => {
    if (m.frequency === 'monthly') return sum + m.price;
    if (m.frequency === 'quarterly') return sum + m.price / 3;
    return sum + m.price / 12;
  }, 0);
  const activeWarranties = warranties.filter(w => w.status === 'active');
  const expiringSoon = warranties.filter(w => {
    if (w.status !== 'active') return false;
    const days = (new Date(w.endDate).getTime() - Date.now()) / 86400000;
    return days > 0 && days <= 30;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Memberships & Warranties</h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-xs text-slate-500">MRR</p>
          <p className="text-lg font-bold text-emerald-400">{currency} {mrr.toFixed(0)}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-xs text-slate-500">Active Members</p>
          <p className="text-lg font-bold text-blue-400">{activeEnrollments.length}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-xs text-slate-500">Active Warranties</p>
          <p className="text-lg font-bold text-amber-400">{activeWarranties.length}</p>
        </div>
      </div>

      {expiringSoon.length > 0 && (
        <div className="bg-amber-950 rounded-xl p-3 border border-amber-800">
          <p className="text-amber-300 text-sm font-medium">⚠ {expiringSoon.length} warrant{expiringSoon.length > 1 ? 'ies' : 'y'} expiring within 30 days</p>
        </div>
      )}

      <div className="flex gap-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
        {([['plans', '📋 Plans'], ['enrollments', '👥 Members'], ['warranties', '🛡 Warranties']] as [Tab, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`flex-1 text-sm py-2 rounded-md font-medium transition-colors ${tab === key ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}>{label}</button>
        ))}
      </div>

      {tab === 'plans' && (
        <div className="space-y-3">
          <button onClick={() => setShowPlanForm(!showPlanForm)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ New Plan</button>
          {showPlanForm && (
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
              <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Plan name (e.g., Quarterly HVAC Maintenance)" value={planDraft.name} onChange={e => setPlanDraft({ ...planDraft, name: e.target.value })} />
              <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Description" value={planDraft.description} onChange={e => setPlanDraft({ ...planDraft, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">Price</label>
                  <input type="number" className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={planDraft.price} onChange={e => setPlanDraft({ ...planDraft, price: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Frequency</label>
                  <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={planDraft.frequency} onChange={e => setPlanDraft({ ...planDraft, frequency: e.target.value as any })}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Included services (comma separated)" value={planDraft.includedServices} onChange={e => setPlanDraft({ ...planDraft, includedServices: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={addPlan} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Create Plan</button>
                <button onClick={() => setShowPlanForm(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}
          {membershipPlans.length === 0 && !showPlanForm && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-slate-400 text-sm">No membership plans yet.</p>
              <p className="text-slate-600 text-xs mt-1">Create a plan to start generating recurring revenue.</p>
            </div>
          )}
          {membershipPlans.map(plan => (
            <div key={plan.id} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-slate-500 text-xs mt-1">{plan.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${plan.status === 'active' ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>{plan.status}</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-brand-400 font-bold">{currency} {plan.price.toFixed(2)}<span className="text-xs text-slate-500">/{plan.frequency === 'monthly' ? 'mo' : plan.frequency === 'quarterly' ? 'qtr' : 'yr'}</span></span>
                <span className="text-slate-600 text-xs">{plan.includedServices.length} services</span>
              </div>
              {plan.includedServices.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {plan.includedServices.map((s, i) => <span key={i} className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={() => dispatch({ type: 'UPDATE_MEMBERSHIP_PLAN', payload: { ...plan, status: plan.status === 'active' ? 'archived' : 'active' } })} className="text-xs text-slate-400 hover:text-white">{plan.status === 'active' ? 'Archive' : 'Activate'}</button>
                <button onClick={() => dispatch({ type: 'DELETE_MEMBERSHIP_PLAN', payload: plan.id })} className="text-xs text-red-400 hover:text-red-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'enrollments' && (
        <div className="space-y-3">
          <button onClick={() => setShowEnrollForm(!showEnrollForm)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Enroll Customer</button>
          {showEnrollForm && (
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
              <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={enrollDraft.customerId} onChange={e => setEnrollDraft({ ...enrollDraft, customerId: e.target.value })}>
                <option value="">Select customer...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={enrollDraft.planId} onChange={e => setEnrollDraft({ ...enrollDraft, planId: e.target.value })}>
                <option value="">Select plan...</option>
                {activePlans.map(p => <option key={p.id} value={p.id}>{p.name} — {currency} {p.price}/{p.frequency === 'monthly' ? 'mo' : p.frequency === 'quarterly' ? 'qtr' : 'yr'}</option>)}
              </select>
              <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes" value={enrollDraft.notes} onChange={e => setEnrollDraft({ ...enrollDraft, notes: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={addEnrollment} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Enroll</button>
                <button onClick={() => setShowEnrollForm(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}
          {customerMemberships.length === 0 && !showEnrollForm && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">👥</p>
              <p className="text-slate-400 text-sm">No members enrolled yet.</p>
            </div>
          )}
          {customerMemberships.map(m => {
            const daysUntilRenewal = Math.ceil((new Date(m.nextBillingDate).getTime() - Date.now()) / 86400000);
            return (
              <div key={m.id} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{m.customerName}</p>
                    <p className="text-slate-500 text-xs">{m.planName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${m.status === 'active' ? 'bg-emerald-950 text-emerald-400' : m.status === 'paused' ? 'bg-amber-950 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>{m.status}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-brand-400 font-bold">{currency} {m.price.toFixed(2)}<span className="text-xs text-slate-500">/{m.frequency === 'monthly' ? 'mo' : m.frequency === 'quarterly' ? 'qtr' : 'yr'}</span></span>
                  <span className={`text-xs ${daysUntilRenewal <= 7 ? 'text-amber-400' : 'text-slate-500'}`}>Renews in {daysUntilRenewal}d</span>
                </div>
                <div className="flex gap-2 mt-3">
                  {m.status === 'active' && <button onClick={() => dispatch({ type: 'UPDATE_CUSTOMER_MEMBERSHIP', payload: { ...m, status: 'paused' } })} className="text-xs text-amber-400 hover:text-amber-300">Pause</button>}
                  {m.status === 'paused' && <button onClick={() => dispatch({ type: 'UPDATE_CUSTOMER_MEMBERSHIP', payload: { ...m, status: 'active' } })} className="text-xs text-emerald-400 hover:text-emerald-300">Resume</button>}
                  <button onClick={() => dispatch({ type: 'UPDATE_CUSTOMER_MEMBERSHIP', payload: { ...m, status: 'cancelled', endDate: new Date().toISOString().split('T')[0] } })} className="text-xs text-red-400 hover:text-red-300">Cancel</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'warranties' && (
        <div className="space-y-3">
          <button onClick={() => setShowWarrantyForm(!showWarrantyForm)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Add Warranty</button>
          {showWarrantyForm && (
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
              <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={warrantyDraft.jobId} onChange={e => setWarrantyDraft({ ...warrantyDraft, jobId: e.target.value })}>
                <option value="">Select completed job...</option>
                {jobs.filter(j => j.status === 'completed').map(j => <option key={j.id} value={j.id}>{j.title} — {j.customerName}</option>)}
              </select>
              <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={warrantyDraft.type} onChange={e => setWarrantyDraft({ ...warrantyDraft, type: e.target.value as any })}>
                <option value="both">Parts & Labor</option>
                <option value="parts">Parts Only</option>
                <option value="labor">Labor Only</option>
              </select>
              <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="What's covered (e.g., Water heater + installation)" value={warrantyDraft.description} onChange={e => setWarrantyDraft({ ...warrantyDraft, description: e.target.value })} />
              <div>
                <label className="text-xs text-slate-500">Warranty expires</label>
                <input type="date" className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={warrantyDraft.endDate} onChange={e => setWarrantyDraft({ ...warrantyDraft, endDate: e.target.value })} />
              </div>
              <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes" value={warrantyDraft.notes} onChange={e => setWarrantyDraft({ ...warrantyDraft, notes: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={addWarranty} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Add Warranty</button>
                <button onClick={() => setShowWarrantyForm(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          )}
          {warranties.length === 0 && !showWarrantyForm && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🛡</p>
              <p className="text-slate-400 text-sm">No warranties tracked yet.</p>
            </div>
          )}
          {warranties.map(w => {
            const daysLeft = Math.ceil((new Date(w.endDate).getTime() - Date.now()) / 86400000);
            const isExpired = daysLeft <= 0;
            const isExpiring = daysLeft > 0 && daysLeft <= 30;
            return (
              <div key={w.id} className={`bg-slate-900 rounded-xl p-4 border ${isExpired ? 'border-red-800' : isExpiring ? 'border-amber-800' : 'border-slate-800'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{w.description}</p>
                    <p className="text-slate-500 text-xs">{w.jobTitle} — {w.customerName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${w.status === 'active' && !isExpired ? (isExpiring ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400') : 'bg-red-950 text-red-400'}`}>
                    {isExpired ? 'Expired' : isExpiring ? `${daysLeft}d left` : w.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-slate-500">{w.type === 'both' ? 'Parts & Labor' : w.type === 'parts' ? 'Parts Only' : 'Labor Only'}</span>
                  <span className="text-xs text-slate-500">Until {new Date(w.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  {w.status === 'active' && <button onClick={() => dispatch({ type: 'UPDATE_WARRANTY', payload: { ...w, status: 'claimed' } })} className="text-xs text-blue-400 hover:text-blue-300">Mark Claimed</button>}
                  <button onClick={() => dispatch({ type: 'DELETE_WARRANTY', payload: w.id })} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
