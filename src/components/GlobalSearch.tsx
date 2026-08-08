import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

interface SearchResult {
  type: 'customer' | 'job' | 'quote' | 'invoice';
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  link: string;
}

export default function GlobalSearch() {
  const { customers, jobs, quotes, invoices } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    // Search customers
    customers.forEach(c => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      ) {
        found.push({
          type: 'customer',
          id: c.id,
          title: c.name,
          subtitle: c.email || c.phone || '',
          icon: '👤',
          link: `/customers/${c.id}`,
        });
      }
    });

    // Search jobs
    jobs.forEach(j => {
      if (
        j.title.toLowerCase().includes(q) ||
        j.customerName.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
      ) {
        found.push({
          type: 'job',
          id: j.id,
          title: j.title,
          subtitle: `${j.customerName} • ${j.status.replace('_', ' ')}`,
          icon: '🔧',
          link: `/jobs/${j.id}`,
        });
      }
    });

    // Search quotes
    quotes.forEach(qt => {
      if (
        qt.title.toLowerCase().includes(q) ||
        qt.customerName.toLowerCase().includes(q)
      ) {
        found.push({
          type: 'quote',
          id: qt.id,
          title: qt.title,
          subtitle: `${qt.customerName} • ${qt.status}`,
          icon: '📋',
          link: `/quotes/${qt.id}`,
        });
      }
    });

    // Search invoices
    invoices.forEach(inv => {
      if (
        inv.title.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q)
      ) {
        found.push({
          type: 'invoice',
          id: inv.id,
          title: inv.title,
          subtitle: `${inv.customerName} • $${inv.amountDue.toFixed(2)} due`,
          icon: '💳',
          link: `/invoices/${inv.id}`,
        });
      }
    });

    setResults(found.slice(0, 10));
  }, [query, customers, jobs, quotes, invoices]);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSelect = (result: SearchResult) => {
    navigate(result.link);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search trigger button */}
      <button
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="flex items-center gap-2 w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400 hover:border-slate-600 transition-colors"
      >
        <span>🔍</span>
        <span>Search everything...</span>
        <kbd className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      {/* Search overlay */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setOpen(false); setQuery(''); }} />
          <div className="fixed top-0 inset-x-0 z-50 bg-slate-900 border-b border-slate-700 p-4 animate-slide-down">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                <span>🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search customers, jobs, quotes, invoices..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
                  autoFocus
                />
                <button
                  onClick={() => { setOpen(false); setQuery(''); }}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                  {results.map(r => (
                    <button
                      key={`${r.type}-${r.id}`}
                      onClick={() => handleSelect(r)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left border-b border-slate-700/50 last:border-0"
                    >
                      <span className="text-lg">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{r.title}</p>
                        <p className="text-xs text-slate-400 truncate">{r.subtitle}</p>
                      </div>
                      <span className="text-[10px] uppercase text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded">
                        {r.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
                  <p className="text-slate-400 text-sm">No results found for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slide-down 0.2s ease-out; }
      `}</style>
    </div>
  );
}
