import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';

export default function Dashboard() {
  const { quotes, jobs, customers, invoices, subscriptions, appointments, teamMembers, inventory, settings } = useApp();

  const openQuotes = quotes.filter(q => q.status === 'draft' || q.status === 'sent');
  const activeJobs = jobs.filter(j => j.status === 'in_progress' || j.status === 'scheduled');
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const unpaidInvoices = invoices.filter(i => i.status !== 'paid');
  const overdueInvoices = invoices.filter(i => i.status === 'overdue');
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const lowStock = inventory.filter(i => i.quantity <= i.lowStockThreshold);

  const totalRevenue = completedJobs.reduce((sum, j) => sum + j.actualRevenue, 0);
  const totalCosts = completedJobs.reduce((sum, j) => sum + j.actualCost, 0);
  const totalProfit = totalRevenue - totalCosts;
  const margin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100) : 0;
  const outstandingAR = unpaidInvoices.reduce((sum, i) => sum + i.amountDue, 0);
  const monthlySub = activeSubs.reduce((sum, s) => {
    const mult = s.frequency === 'weekly' ? 4.33 : s.frequency === 'biweekly' ? 2.17 : s.frequency === 'monthly' ? 1 : s.frequency === 'quarterly' ? 0.333 : 0.083;
    return sum + s.amount * mult;
  }, 0);

  // Today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todaysAppts = appointments.filter(a => a.date === today && a.status !== 'cancelled');

  const cards = [
    { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'text-emerald-400', link: '/profit' },
    { label: 'Profit', value: `$${totalProfit.toLocaleString()}`, color: 'text-brand-400', link: '/profit' },
    { label: 'A/R Outstanding', value: `$${outstandingAR.toLocaleString()}`, color: 'text-amber-400', link: '/invoices' },
    { label: 'Active Jobs', value: String(activeJobs.length), color: 'text-white', link: '/jobs' },
    { label: 'Open Quotes', value: String(openQuotes.length), color: 'text-white', link: '/quotes' },
    { label: 'MRR', value: `$${monthlySub.toFixed(0)}`, color: 'text-emerald-400', link: '/subscriptions' },
    { label: 'Customers', value: String(customers.length), color: 'text-white', link: '/customers' },
    { label: 'Margin', value: `${margin.toFixed(1)}%`, color: 'text-amber-400', link: '/profit' },
  ];

  return (
    <div className="space-y-4">
      {/* Alerts */}
      {overdueInvoices.length > 0 && (
        <div className="bg-red-950/50 rounded-lg p-3 border border-red-800">
          <p className="text-red-300 text-sm font-medium">⚠️ {overdueInvoices.length} overdue invoice{overdueInvoices.length > 1 ? 's' : ''} (${overdueInvoices.reduce((s, i) => s + i.amountDue, 0).toFixed(2)})</p>
          <Link to="/invoices" className="text-red-400 text-xs underline">View invoices →</Link>
        </div>
      )}
      {lowStock.length > 0 && (
        <div className="bg-amber-950/50 rounded-lg p-3 border border-amber-800">
          <p className="text-amber-300 text-sm font-medium">📦 {lowStock.length} item{lowStock.length > 1 ? 's' : ''} low on stock</p>
          <Link to="/inventory" className="text-amber-400 text-xs underline">View inventory →</Link>
        </div>
      )}

      {settings.name && (
        <p className="text-slate-400 text-sm">{settings.name}</p>
      )}

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <Link key={card.label} to={card.link} className="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors">
            <p className="text-slate-400 text-xs mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Today's schedule */}
      {todaysAppts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Today's Schedule</h2>
            <Link to="/calendar" className="text-brand-400 text-xs">View all →</Link>
          </div>
          {todaysAppts.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(appt => {
            const member = teamMembers.find(m => m.id === appt.assignedTo);
            return (
              <div key={appt.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: member?.color || '#3b82f6' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{appt.title}</p>
                  <p className="text-slate-500 text-xs">{appt.startTime}–{appt.endTime} • {appt.customerName}</p>
                </div>
                <span className={`badge badge-${appt.status}`}>{appt.status}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick actions */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/smart-quote" className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl p-4 text-center font-medium transition-colors">🧠 Smart Quote</Link>
          <Link to="/quotes" className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl p-4 text-center font-medium transition-colors">+ New Quote</Link>
          <Link to="/jobs" className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl p-4 text-center font-medium transition-colors">+ New Job</Link>
          <Link to="/invoices" className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl p-4 text-center font-medium transition-colors">+ New Invoice</Link>
        </div>
      </div>

      {/* Recent jobs */}
      {jobs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recent Jobs</h2>
            <Link to="/jobs" className="text-brand-400 text-xs">View all →</Link>
          </div>
          {jobs.slice(-5).reverse().map(job => {
            const member = teamMembers.find(m => m.id === job.assignedTo);
            return (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block bg-slate-900 rounded-lg p-3 border border-slate-800 hover:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member && <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white font-bold" style={{ backgroundColor: member.color }}>{member.name.charAt(0)}</div>}
                    <span className="font-medium text-sm">{job.title}</span>
                  </div>
                  <span className={`badge badge-${job.status}`}>{job.status.replace('_', ' ')}</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">{job.customerName}</p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {jobs.length === 0 && quotes.length === 0 && customers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-4">⚡</p>
          <h2 className="text-xl font-bold mb-2">Welcome to FieldFlow</h2>
          <p className="text-slate-400 text-sm mb-6">Start by adding a customer, then create quotes and jobs.</p>
          <Link to="/customers" className="inline-block bg-brand-600 hover:bg-brand-700 text-white rounded-lg px-6 py-3 font-medium transition-colors">
            Add Your First Customer
          </Link>
        </div>
      )}
    </div>
  );
}
