import { useState, useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { Appointment } from '../types';
import { v4 as uuid } from 'uuid';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7am-6pm
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getWeekDays(date: Date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

export default function Calendar() {
  const { appointments, customers, teamMembers, dispatch } = useApp();
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay());
    return d;
  });
  const [showNew, setShowNew] = useState(false);
  const [view, setView] = useState<'week' | 'list'>('week');
  const [newAppt, setNewAppt] = useState({ title: '', customerId: '', date: formatDate(new Date()), startTime: '09:00', endTime: '10:00', description: '', assignedTo: '' });

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const weekAppointments = useMemo(() => {
    const start = formatDate(weekDays[0]);
    const end = formatDate(weekDays[6]);
    return appointments.filter(a => a.date >= start && a.date <= end && a.status !== 'cancelled');
  }, [appointments, weekDays]);

  function prevWeek() {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  }

  function nextWeek() {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  }

  function today() {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay());
    setWeekStart(d);
  }

  function createAppointment() {
    const customer = customers.find(c => c.id === newAppt.customerId);
    const appt: Appointment = {
      id: uuid(),
      customerId: newAppt.customerId,
      customerName: customer?.name || '',
      title: newAppt.title,
      description: newAppt.description,
      date: newAppt.date,
      startTime: newAppt.startTime,
      endTime: newAppt.endTime,
      status: 'scheduled',
      assignedTo: newAppt.assignedTo || undefined,
      notes: '',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_APPOINTMENT', payload: appt });
    setShowNew(false);
    setNewAppt({ title: '', customerId: '', date: formatDate(new Date()), startTime: '09:00', endTime: '10:00', description: '', assignedTo: '' });
  }

  function updateStatus(appt: Appointment, status: Appointment['status']) {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { ...appt, status } });
  }

  const teamColors: Record<string, string> = {};
  teamMembers.forEach(m => { teamColors[m.id] = m.color; });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Calendar</h2>
          <p className="text-slate-500 text-sm">{weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ New</button>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-2">
        <button onClick={prevWeek} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm">←</button>
        <button onClick={today} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm">Today</button>
        <button onClick={nextWeek} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm">→</button>
        <div className="flex-1" />
        <button onClick={() => setView(view === 'week' ? 'list' : 'week')} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm">{view === 'week' ? '📋 List' : '📅 Week'}</button>
      </div>

      {/* New appointment form */}
      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Title" value={newAppt.title} onChange={e => setNewAppt({ ...newAppt, title: e.target.value })} />
          <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newAppt.customerId} onChange={e => setNewAppt({ ...newAppt, customerId: e.target.value })}>
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="date" className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newAppt.date} onChange={e => setNewAppt({ ...newAppt, date: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Start</label>
              <input type="time" className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newAppt.startTime} onChange={e => setNewAppt({ ...newAppt, startTime: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-slate-500">End</label>
              <input type="time" className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newAppt.endTime} onChange={e => setNewAppt({ ...newAppt, endTime: e.target.value })} />
            </div>
          </div>
          {teamMembers.length > 0 && (
            <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newAppt.assignedTo} onChange={e => setNewAppt({ ...newAppt, assignedTo: e.target.value })}>
              <option value="">Assign to...</option>
              {teamMembers.filter(m => m.status === 'active').map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          )}
          <button onClick={createAppointment} disabled={!newAppt.title} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg py-2 font-medium">Create Appointment</button>
        </div>
      )}

      {/* Week view */}
      {view === 'week' ? (
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="grid grid-cols-7 gap-1 min-w-[490px]">
            {/* Day headers */}
            {weekDays.map((d, i) => {
              const isToday = formatDate(d) === formatDate(new Date());
              return (
                <div key={i} className={`text-center py-2 rounded-t-lg text-xs font-medium ${isToday ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                  <p>{DAYS[d.getDay()]}</p>
                  <p className="text-lg">{d.getDate()}</p>
                </div>
              );
            })}
            {/* Day columns */}
            {weekDays.map((d, i) => {
              const dayStr = formatDate(d);
              const dayAppts = weekAppointments.filter(a => a.date === dayStr).sort((a, b) => a.startTime.localeCompare(b.startTime));
              return (
                <div key={i} className="bg-slate-900/50 rounded-b-lg min-h-[200px] p-1 space-y-1">
                  {dayAppts.map(appt => {
                    const member = teamMembers.find(m => m.id === appt.assignedTo);
                    return (
                      <div
                        key={appt.id}
                        className="rounded px-1.5 py-1 text-[10px] cursor-pointer border-l-2"
                        style={{ backgroundColor: (member?.color || '#1e40af') + '33', borderLeftColor: member?.color || '#3b82f6' }}
                        onClick={() => {
                          const next = appt.status === 'scheduled' ? 'completed' : appt.status === 'completed' ? 'cancelled' : 'scheduled';
                          updateStatus(appt, next as Appointment['status']);
                        }}
                      >
                        <p className="font-medium truncate">{appt.startTime} {appt.title}</p>
                        {appt.customerName && <p className="text-slate-500 truncate">{appt.customerName}</p>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List view */
        <div className="space-y-2">
          {weekAppointments.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-3xl mb-3">📅</p>
              <p>No appointments this week</p>
            </div>
          ) : (
            weekAppointments.sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)).map(appt => {
              const member = teamMembers.find(m => m.id === appt.assignedTo);
              return (
                <div key={appt.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: member?.color || '#3b82f6' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{appt.title}</p>
                    <p className="text-slate-500 text-xs">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {appt.startTime}–{appt.endTime}</p>
                    {appt.customerName && <p className="text-slate-500 text-xs">{appt.customerName}</p>}
                  </div>
                  <span className={`badge badge-${appt.status}`}>{appt.status}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
