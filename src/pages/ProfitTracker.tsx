import { useApp } from '../store/AppContext';

export default function ProfitTracker() {
  const { jobs, quotes } = useApp();

  const completedJobs = jobs.filter(j => j.status === 'completed');
  const allJobs = jobs.filter(j => j.status !== 'cancelled');

  // Overall totals
  const totalRevenue = completedJobs.reduce((sum, j) => sum + j.actualRevenue, 0);
  const totalCosts = completedJobs.reduce((sum, j) => sum + j.actualCost, 0);
  const totalProfit = totalRevenue - totalCosts;
  const overallMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100) : 0;

  // Estimated totals (all non-cancelled jobs)
  const estRevenue = allJobs.reduce((sum, j) => sum + (j.actualRevenue || j.estimatedRevenue), 0);
  const estCosts = allJobs.reduce((sum, j) => sum + (j.actualCost || j.estimatedCost), 0);
  const estProfit = estRevenue - estCosts;

  // Accepted quote pipeline
  const acceptedQuotes = quotes.filter(q => q.status === 'accepted');
  const pipelineValue = acceptedQuotes.reduce((sum, q) => {
    const subtotal = q.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
    return sum + subtotal * (1 + q.taxRate / 100);
  }, 0);

  // Expense breakdown
  const expensesByCategory: Record<string, number> = {};
  completedJobs.forEach(j => {
    j.expenses.forEach(exp => {
      expensesByCategory[exp.category] = (expensesByCategory[exp.category] || 0) + exp.amount;
    });
  });

  // Per-job breakdown
  const jobBreakdown = completedJobs.map(j => ({
    id: j.id,
    title: j.title,
    revenue: j.actualRevenue,
    cost: j.actualCost,
    profit: j.actualRevenue - j.actualCost,
    margin: j.actualRevenue > 0 ? ((j.actualRevenue - j.actualCost) / j.actualRevenue * 100) : 0,
  })).sort((a, b) => b.profit - a.profit);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Profit Tracker</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs mb-1">Actual Revenue</p>
          <p className="text-2xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs mb-1">Actual Costs</p>
          <p className="text-2xl font-bold text-red-400">${totalCosts.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs mb-1">Net Profit</p>
          <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>${totalProfit.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <p className="text-slate-400 text-xs mb-1">Margin</p>
          <p className="text-2xl font-bold text-amber-400">{overallMargin.toFixed(1)}%</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Pipeline</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Accepted quotes (pending)</span>
            <span className="text-sm font-medium">${pipelineValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Estimated (all jobs)</span>
            <span className={`text-sm font-medium ${estProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>${estProfit.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Expense breakdown */}
      {Object.keys(expensesByCategory).length > 0 && (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Expense Breakdown</h3>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a).map(([cat, amount]) => {
              const pct = totalCosts > 0 ? (amount / totalCosts * 100) : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 capitalize">{cat}</span>
                    <span className="text-slate-400">${amount.toFixed(2)} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-brand-500 rounded-full h-2" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Per-job breakdown */}
      {jobBreakdown.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">By Job</h3>
          <div className="space-y-2">
            {jobBreakdown.map(j => (
              <div key={j.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{j.title}</span>
                  <span className={`text-sm font-bold ${j.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    ${j.profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>Revenue: ${j.revenue.toFixed(2)}</span>
                  <span>Cost: ${j.cost.toFixed(2)}</span>
                  <span>Margin: {j.margin.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {completedJobs.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-3xl mb-3">💰</p>
          <p>Complete some jobs to see profit data here.</p>
        </div>
      )}
    </div>
  );
}
