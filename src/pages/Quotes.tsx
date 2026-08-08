import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Quote } from '../types';
import { v4 as uuid } from 'uuid';

export default function Quotes() {
  const { quotes, customers, settings, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  function createQuote() {
    const quote: Quote = {
      id: uuid(),
      customerId: '',
      customerName: '',
      title: '',
      description: '',
      lineItems: [{ id: uuid(), description: '', quantity: 1, unitPrice: 0, cost: 0 }],
      taxRate: settings.taxRate,
      status: 'draft',
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_QUOTE', payload: quote });
    setShowNew(false);
    window.location.href = `/quotes/${quote.id}`;
  }

  const statuses = ['all', 'draft', 'sent', 'accepted', 'declined', 'expired'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Quotes</h2>
        <button onClick={() => setShowNew(!showNew)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
          + New
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              filter === s ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Quote list */}
      {sorted.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">📋</p>
          <p>No quotes yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map(q => {
            const subtotal = q.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
            const total = subtotal * (1 + q.taxRate / 100);
            return (
              <Link
                key={q.id}
                to={`/quotes/${q.id}`}
                className="block bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{q.title || 'Untitled Quote'}</p>
                    <p className="text-slate-500 text-sm">{q.customerName || 'No customer'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge badge-${q.status}`}>{q.status}</span>
                    <p className="text-sm font-medium mt-1">${total.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
