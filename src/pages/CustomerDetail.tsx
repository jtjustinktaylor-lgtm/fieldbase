import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customers, quotes, jobs, dispatch } = useApp();
  const customer = customers.find(c => c.id === id);

  const defaultCustomer = customer || {
    id: '', name: '', email: '', phone: '', address: '', notes: '', createdAt: '',
  };

  const [draft, setDraft] = useState({ ...defaultCustomer });

  if (!customer) return <div className="text-center py-12 text-slate-500">Customer not found</div>;

  function save() {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: draft });
  }

  function deleteCustomer() {
    if (confirm('Delete this customer? Quotes and jobs will keep their name.')) {
      dispatch({ type: 'DELETE_CUSTOMER', payload: draft.id });
      navigate('/customers');
    }
  }

  const customerQuotes = quotes.filter(q => q.customerId === draft.id);
  const customerJobs = jobs.filter(j => j.customerId === draft.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Edit Customer</h2>
        <div className="flex gap-2">
          <button onClick={save} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Save</button>
          <button onClick={deleteCustomer} className="bg-red-900 hover:bg-red-800 text-red-200 text-sm px-3 py-2 rounded-lg">🗑</button>
        </div>
      </div>

      <div className="space-y-3">
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Name" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Phone" type="tel" value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} />
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Email" type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Address" value={draft.address} onChange={e => setDraft({ ...draft, address: e.target.value })} />
        <textarea className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Notes" rows={3} value={draft.notes} onChange={e => setDraft({ ...draft, notes: e.target.value })} />
      </div>

      {/* Related quotes */}
      {customerQuotes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Quotes</h3>
          <div className="space-y-1">
            {customerQuotes.map(q => {
              const total = q.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0) * (1 + q.taxRate / 100);
              return (
                <Link key={q.id} to={`/quotes/${q.id}`} className="flex items-center justify-between bg-slate-900 rounded px-3 py-2 border border-slate-800 hover:border-slate-700">
                  <span className="text-sm">{q.title || 'Untitled'}</span>
                  <div className="flex items-center gap-2">
                    <span className={`badge badge-${q.status}`}>{q.status}</span>
                    <span className="text-sm">${total.toFixed(2)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related jobs */}
      {customerJobs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Jobs</h3>
          <div className="space-y-1">
            {customerJobs.map(j => (
              <Link key={j.id} to={`/jobs/${j.id}`} className="flex items-center justify-between bg-slate-900 rounded px-3 py-2 border border-slate-800 hover:border-slate-700">
                <span className="text-sm">{j.title}</span>
                <span className={`badge badge-${j.status}`}>{j.status.replace('_', ' ')}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
