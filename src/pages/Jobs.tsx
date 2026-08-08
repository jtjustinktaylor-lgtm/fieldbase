import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Job } from '../types';
import { v4 as uuid } from 'uuid';
import { validate, required, fieldError, hasErrors, type FieldError } from '../utils/validation';

export default function Jobs() {
  const { jobs, customers, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', customerId: '', description: '' });
  const [filter, setFilter] = useState<string>('all');
  const [errors, setErrors] = useState<FieldError[]>([]);

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  function validateForm(): boolean {
    const result = validate(
      required(newJob.title, 'Title'),
      required(newJob.customerId, 'Customer'),
    );
    setErrors(result);
    return !hasErrors(result);
  }

  function createJob() {
    if (!validateForm()) return;
    const customer = customers.find(c => c.id === newJob.customerId);
    const job: Job = {
      id: uuid(),
      customerId: newJob.customerId,
      customerName: customer?.name || '',
      title: newJob.title.trim(),
      description: newJob.description.trim(),
      status: 'scheduled',
      estimatedRevenue: 0,
      actualRevenue: 0,
      estimatedCost: 0,
      actualCost: 0,
      expenses: [],
      startDate: '',
      completedDate: '',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_JOB', payload: job });
    setShowNew(false);
    setNewJob({ title: '', customerId: '', description: '' });
    setErrors([]);
  }

  function closeForm() {
    setShowNew(false);
    setErrors([]);
    setNewJob({ title: '', customerId: '', description: '' });
  }

  const err = (field: string) => fieldError(errors, field);
  const statuses = ['all', 'scheduled', 'in_progress', 'completed', 'cancelled'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Jobs</h2>
        <button onClick={() => { showNew ? closeForm() : setShowNew(true); }} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
          {showNew ? 'Cancel' : '+ New'}
        </button>
      </div>

      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <div>
            <input
              className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Title') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`}
              placeholder="Job title *"
              value={newJob.title}
              onChange={e => { setNewJob({ ...newJob, title: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Title')); }}
            />
            {err('Title') && <p className="text-red-400 text-xs mt-1">{err('Title')}</p>}
          </div>
          <div>
            <select
              className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Customer') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`}
              value={newJob.customerId}
              onChange={e => { setNewJob({ ...newJob, customerId: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Customer')); }}
            >
              <option value="">Select customer *</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {err('Customer') && <p className="text-red-400 text-xs mt-1">{err('Customer')}</p>}
          </div>
          <textarea
            className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
            placeholder="Description (optional)"
            rows={2}
            value={newJob.description}
            onChange={e => setNewJob({ ...newJob, description: e.target.value })}
          />
          <button onClick={createJob} className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 font-medium">
            Create Job
          </button>
        </div>
      )}

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
            {s === 'in_progress' ? 'Active' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Job list */}
      {sorted.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">🔧</p>
          <p>No jobs yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map(job => {
            const profit = job.actualRevenue - job.actualCost;
            return (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="block bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-slate-500 text-sm">{job.customerName || 'No customer'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge badge-${job.status}`}>{job.status.replace('_', ' ')}</span>
                    {job.status === 'completed' && (
                      <p className={`text-sm font-medium mt-1 ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ${profit.toFixed(2)}
                      </p>
                    )}
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
