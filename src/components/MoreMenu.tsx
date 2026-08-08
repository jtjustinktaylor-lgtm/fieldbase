import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

interface MoreMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { to: '/customers', icon: '👥', label: 'Customers' },
  { to: '/subscriptions', icon: '🔄', label: 'Subscriptions' },
  { to: '/inventory', icon: '📦', label: 'Inventory' },
  { to: '/team', icon: '👷', label: 'Team' },
  { to: '/profit', icon: '📈', label: 'Profit Tracker' },
  { to: '/portal', icon: '🌐', label: 'Client Portal' },
  { to: '/smart-quote', icon: '🧠', label: 'Smart Quote' },
  { to: '/memberships', icon: '⭐', label: 'Memberships' },
  { to: '/integrations', icon: '🔗', label: 'Integrations' },
  { to: '/template-editor', icon: '📝', label: 'Templates' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function MoreMenu({ open, onClose }: MoreMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoices, appointments } = useApp();

  if (!open) return null;

  const overdueCount = invoices.filter(i => i.status === 'overdue').length;
  const today = new Date().toISOString().split('T')[0];
  const todayApptCount = appointments.filter(a => a.date === today && a.status !== 'cancelled').length;

  const getBadge = (to: string) => {
    if (to === '/invoices' && overdueCount > 0) return { count: overdueCount, color: 'bg-red-500' };
    if (to === '/calendar' && todayApptCount > 0) return { count: todayApptCount, color: 'bg-blue-500' };
    return null;
  };

  const handleNavigate = (to: string) => {
    navigate(to);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-900 border-t border-slate-700 rounded-t-2xl animate-slide-up max-h-[80vh] overflow-y-auto pb-safe">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-slate-600 rounded-full" />
        </div>

        <div className="px-4 pb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
            Navigation
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {menuItems.map(item => {
              const isActive = location.pathname === item.to ||
                (item.to !== '/' && location.pathname.startsWith(item.to));
              const badge = getBadge(item.to);

              return (
                <button
                  key={item.to}
                  onClick={() => handleNavigate(item.to)}
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>

                  {badge && (
                    <span className={`absolute -top-1 -right-1 ${badge.color} text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                      {badge.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </>
  );
}
