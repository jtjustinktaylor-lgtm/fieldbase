import { useState } from 'react';
import { useApp } from '../store/AppContext';

export default function ClientPortal() {
  const { customers, quotes, invoices, jobs, settings } = useApp();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<'quotes' | 'invoices' | 'jobs'>('quotes');

  const customer = customers.find(c => c.id === selectedCustomer);
  const custQuotes = quotes.filter(q => q.customerId === selectedCustomer);
  const custInvoices = invoices.filter(i => i.customerId === selectedCustomer);
  const custJobs = jobs.filter(j => j.customerId === selectedCustomer);

  function login() {
    if (!selectedCustomer) return;
    // Simple demo auth - in production this would be a real auth flow
    setAuthenticated(true);
  }

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            {settings.logoDataUrl && <img src={settings.logoDataUrl} alt="" className="w-12 h-12 rounded-lg mx-auto mb-2 object-cover" />}
            <h2 className="text-2xl font-bold mb-1" style={{ color: settings.brandColor || '#1e40af' }}>{settings.name || 'FieldFlow'}</h2>
            {settings.tagline && <p className="text-slate-400 text-sm mb-1">{settings.tagline}</p>}
            <p className="text-slate-500 text-xs">Client Portal</p>
          </div>
          <div className="space-y-3">
            <select className="w-full bg-slate-900 rounded-lg px-3 py-3 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
              <option value="">Select your account</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input className="w-full bg-slate-900 rounded-lg px-3 py-3 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" type="password" placeholder="PIN (optional)" value={pin} onChange={e => setPin(e.target.value)} />
            <button onClick={login} disabled={!selectedCustomer} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg py-3 font-medium">
              View My Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <p className="text-slate-400 text-xs">Welcome back</p>
        <p className="text-xl font-bold">{customer?.name}</p>
        <p className="text-slate-500 text-sm">{settings.name}</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center">
          <p className="text-lg font-bold">{custQuotes.length}</p>
          <p className="text-slate-400 text-xs">Quotes</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center">
          <p className="text-lg font-bold">{custInvoices.filter(i => i.status !== 'paid').length}</p>
          <p className="text-slate-400 text-xs">Open Invoices</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center">
          <p className="text-lg font-bold">{custJobs.filter(j => j.status === 'in_progress').length}</p>
          <p className="text-slate-400 text-xs">Active Jobs</p>
        </div>
      </div>

      {/* Due amount */}
      {custInvoices.filter(i => i.status !== 'paid').length > 0 && (
        <div className="bg-amber-950/50 rounded-lg p-3 border border-amber-800">
          <p className="text-amber-300 text-sm font-medium">
            Amount Due: ${custInvoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amountDue, 0).toFixed(2)}
          </p>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
        {(['quotes', 'invoices', 'jobs'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${tab === t ? 'bg-brand-600 text-white' : 'text-slate-400'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'quotes' && (
        <div className="space-y-2">
          {custQuotes.length === 0 ? <p className="text-center text-slate-500 py-8">No quotes</p> : custQuotes.map(q => {
            const total = q.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0) * (1 + q.taxRate / 100);
            return (
              <div key={q.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{q.title || 'Untitled'}</p>
                    <p className="text-slate-500 text-xs">{new Date(q.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge badge-${q.status}`}>{q.status}</span>
                    <p className="text-sm font-medium mt-1">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'invoices' && (
        <div className="space-y-2">
          {custInvoices.length === 0 ? <p className="text-center text-slate-500 py-8">No invoices</p> : custInvoices.map(inv => (
            <div key={inv.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{inv.title || 'Untitled'}</p>
                  <p className="text-slate-500 text-xs">Due: {inv.dueDate}</p>
                </div>
                <div className="text-right">
                  <span className={`badge badge-${inv.status === 'partial' ? 'in_progress' : inv.status}`}>{inv.status}</span>
                  <p className="text-sm font-medium mt-1">${inv.amountDue.toFixed(2)} due</p>
                </div>
              </div>
              {inv.amountDue > 0 && (
                <a
                  href={`/pay/${inv.id}`}
                  className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2"
                >
                  💳 Pay Now
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'jobs' && (
        <div className="space-y-2">
          {custJobs.length === 0 ? <p className="text-center text-slate-500 py-8">No jobs</p> : custJobs.map(job => (
            <div key={job.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{job.title}</p>
                  {job.startDate && <p className="text-slate-500 text-xs">Started: {job.startDate}</p>}
                </div>
                <span className={`badge badge-${job.status}`}>{job.status.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => { setAuthenticated(false); setSelectedCustomer(''); setPin(''); }} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg py-2 text-sm mt-4">
        Sign Out
      </button>
    </div>
  );
}
