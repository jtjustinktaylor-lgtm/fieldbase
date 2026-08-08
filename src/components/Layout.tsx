import { ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';
import OfflineIndicator from './OfflineIndicator';
import MoreMenu from './MoreMenu';
import GlobalSearch from './GlobalSearch';
import { useApp } from '../store/AppContext';

const nav = [
  { to: '/', icon: '📊', labelKey: 'nav.home' },
  { to: '/calendar', icon: '📅', labelKey: 'nav.calendar' },
  { to: '/jobs', icon: '🔧', labelKey: 'nav.jobs' },
  { to: '/quotes', icon: '📋', labelKey: 'nav.quotes' },
  { to: '/invoices', icon: '💳', labelKey: 'nav.invoices' },
  { to: '/more', icon: '☰', labelKey: 'nav.more' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { settings, invoices, appointments } = useApp();
  const { t } = useTranslation();
  const [moreOpen, setMoreOpen] = useState(false);
  const currentNav = nav.find(n => n.to === location.pathname);
  const pageTitle = currentNav ? t(currentNav.labelKey) : 'FieldFlow';
  const brandColor = settings.brandColor || '#1e40af';

  // Badge counts
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;
  const today = new Date().toISOString().split('T')[0];
  const todayApptCount = appointments.filter(a => a.date === today && a.status !== 'cancelled').length;

  const getBadge = (to: string): number => {
    if (to === '/invoices' && overdueCount > 0) return overdueCount;
    if (to === '/calendar' && todayApptCount > 0) return todayApptCount;
    return 0;
  };

  // Check if a "more" sub-page is active
  const moreSubPages = ['/customers', '/subscriptions', '/inventory', '/team', '/profit', '/portal', '/settings', '/smart-quote', '/integrations', '/template-editor', '/memberships'];
  const isMoreActive = moreSubPages.some(p => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <OfflineIndicator />

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {settings.logoDataUrl ? (
            <img src={settings.logoDataUrl} alt="" className="w-6 h-6 rounded object-cover" />
          ) : (
            <span style={{ color: brandColor }}>⚡</span>
          )}
          <h1 className="text-lg font-bold tracking-tight">
            {location.pathname === '/' ? (settings.name || 'FieldFlow') : pageTitle}
          </h1>
        </div>
        {location.pathname !== '/' && (
          <button onClick={() => window.history.back()} className="text-slate-400 hover:text-white text-sm">
            ← Back
          </button>
        )}
      </header>

      {/* Search bar */}
      <div className="px-4 py-2 border-b border-slate-800/50">
        <GlobalSearch />
      </div>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 py-4">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 pb-safe z-30">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {nav.map(item => {
            if (item.to === '/more') {
              return (
                <button
                  key={item.to}
                  onClick={() => setMoreOpen(true)}
                  className={`relative flex flex-col items-center py-2 px-3 text-[10px] transition-colors ${
                    isMoreActive ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className="text-xl mb-0.5">☰</span>
                  <span>{t(item.labelKey)}</span>
                </button>
              );
            }

            const badge = getBadge(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex flex-col items-center py-2 px-3 text-[10px] transition-colors ${
                    isActive ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
                  }`
                }
              >
                <span className="text-xl mb-0.5">{item.icon}</span>
                <span>{t(item.labelKey)}</span>
                {badge > 0 && (
                  <span className="absolute -top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* More menu overlay */}
      <MoreMenu open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
}
