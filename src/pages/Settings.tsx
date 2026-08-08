import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { industryTemplates } from '../data/templates';
import { languageNames, Lang } from '../i18n/translations';

export default function Settings() {
  const { settings, customers, quotes, jobs, invoices, subscriptions, teamMembers, inventory, dispatch } = useApp();
  const [draft, setDraft] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [section, setSection] = useState<'menu' | 'settings'>('menu');

  function save() {
    dispatch({ type: 'UPDATE_SETTINGS', payload: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function exportData() {
    try {
      const raw = localStorage.getItem('fieldflow');
      if (!raw) return alert('No data to export');
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fieldflow-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { alert('Export failed'); }
  }

  function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (confirm('This will replace all current data. Continue?')) {
          localStorage.setItem('fieldflow', JSON.stringify(data));
          window.location.reload();
        }
      } catch { alert('Invalid file'); }
    };
    input.click();
  }

  function clearAll() {
    if (confirm('Delete ALL data? This cannot be undone.')) {
      localStorage.removeItem('fieldflow');
      window.location.reload();
    }
  }

  function reOnboard() {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { ...settings, onboardingComplete: false } });
  }

  const template = industryTemplates.find(t => t.id === settings.industry);

  const moreLinks = [
    { to: '/smart-quote', icon: '🧠', label: 'Smart Quote', highlight: true },
    { to: '/customers', icon: '👥', label: 'Customers', count: customers.length },
    { to: '/subscriptions', icon: '🔄', label: 'Recurring Revenue', count: subscriptions.filter(s => s.status === 'active').length },
    { to: '/memberships', icon: '⭐', label: 'Memberships & Warranties' },
    { to: '/inventory', icon: '📦', label: 'Inventory', count: inventory.length },
    { to: '/team', icon: '👷', label: 'Team', count: teamMembers.filter(m => m.status === 'active').length },
    { to: '/profit', icon: '💰', label: 'Profit Tracker' },
    { to: '/portal', icon: '🌐', label: 'Client Portal' },
    { to: '/integrations', icon: '🔌', label: 'Integrations' },
    { to: '/template-editor', icon: '✏️', label: 'Customize Template' },
  ];

  if (section === 'menu') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">More</h2>

        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="font-medium">{settings.name || 'Your Business'}</p>
          {template && <p className="text-slate-500 text-sm">{template.icon} {template.name}</p>}
          <div className="flex gap-4 mt-2 text-xs text-slate-400">
            <span>{customers.length} customers</span>
            <span>{jobs.length} jobs</span>
            <span>{invoices.length} invoices</span>
          </div>
        </div>

        <div className="space-y-1">
          {moreLinks.map(link => (
            <Link key={link.to} to={link.to} className="flex items-center justify-between bg-slate-900 rounded-lg px-4 py-3 border border-slate-800 hover:border-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-xl">{link.icon}</span>
                <span className={`font-medium text-sm ${link.highlight ? 'text-brand-400' : ''}`}>{link.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {link.count !== undefined && <span className="text-slate-500 text-sm">{link.count}</span>}
                <span className="text-slate-600">→</span>
              </div>
            </Link>
          ))}
        </div>

        <button onClick={() => setSection('settings')} className="w-full flex items-center justify-between bg-slate-900 rounded-lg px-4 py-3 border border-slate-800 hover:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <span className="font-medium text-sm">Settings</span>
          </div>
          <span className="text-slate-600">→</span>
        </button>

        <div className="text-center pt-4 pb-8">
          <p className="text-slate-600 text-xs">FieldFlow v4.0</p>
          <p className="text-slate-700 text-xs mt-1">Business OS for service businesses ⚡</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setSection('menu')} className="text-slate-400 hover:text-white text-sm">← Back</button>
          <h2 className="text-xl font-bold">Settings</h2>
        </div>
        <button onClick={save} className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${saved ? 'bg-emerald-600 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'}`}>
          {saved ? '✓ Saved' : 'Save'}
        </button>
      </div>

      {/* Language */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">🌐 Language</h3>
        <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.language || 'en'} onChange={e => setDraft({ ...draft, language: e.target.value })}>
          {Object.entries(languageNames).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        <p className="text-xs text-slate-600">Changes the language of the navigation, buttons, and common terms throughout the app.</p>
      </div>

      {/* Business info */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Business Info</h3>
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Business name" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Email" type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Phone" type="tel" value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} />
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Address" value={draft.address} onChange={e => setDraft({ ...draft, address: e.target.value })} />
      </div>

      {/* Branding */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">🎨 Branding</h3>
        <input className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Tagline" value={draft.tagline || ''} onChange={e => setDraft({ ...draft, tagline: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Brand color</label>
            <div className="flex gap-2 items-center">
              <input type="color" className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" value={draft.brandColor || '#1e40af'} onChange={e => setDraft({ ...draft, brandColor: e.target.value })} />
              <input className="flex-1 bg-slate-900 rounded px-2 py-1.5 text-sm font-mono border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.brandColor || '#1e40af'} onChange={e => setDraft({ ...draft, brandColor: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500">Secondary color</label>
            <div className="flex gap-2 items-center">
              <input type="color" className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" value={draft.brandSecondaryColor || '#10b981'} onChange={e => setDraft({ ...draft, brandSecondaryColor: e.target.value })} />
              <input className="flex-1 bg-slate-900 rounded px-2 py-1.5 text-sm font-mono border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.brandSecondaryColor || '#10b981'} onChange={e => setDraft({ ...draft, brandSecondaryColor: e.target.value })} />
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500">Logo</label>
          <input type="file" accept="image/*" className="w-full text-sm text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-slate-800 file:text-slate-300" onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => setDraft({ ...draft, logoDataUrl: reader.result as string });
            reader.readAsDataURL(file);
          }} />
          {draft.logoDataUrl && (
            <div className="mt-2 flex items-center gap-2">
              <img src={draft.logoDataUrl} alt="Logo" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
              <button onClick={() => setDraft({ ...draft, logoDataUrl: '' })} className="text-red-400 text-xs">Remove</button>
            </div>
          )}
        </div>
      </div>

      {/* Defaults */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Defaults</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Tax rate %</label>
            <input type="number" className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.taxRate} onChange={e => setDraft({ ...draft, taxRate: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Currency</label>
            <select className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={draft.currency} onChange={e => setDraft({ ...draft, currency: e.target.value })}>
              {['USD', 'CAD', 'GBP', 'EUR', 'AUD', 'MXN', 'BRL', 'INR', 'JPY', 'CNY', 'KRW', 'SEK', 'DKK', 'NOK', 'PLN', 'TRY', 'THB', 'VND'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Data management */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Data</h3>
        <button onClick={exportData} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2.5 text-sm font-medium">📤 Export Data (JSON)</button>
        <button onClick={importData} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2.5 text-sm font-medium">📥 Import Data</button>
        <button onClick={reOnboard} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2.5 text-sm font-medium">🔄 Change Industry</button>
        <button onClick={clearAll} className="w-full bg-red-950 hover:bg-red-900 text-red-300 rounded-lg py-2.5 text-sm font-medium">🗑 Clear All Data</button>
      </div>
    </div>
  );
}
