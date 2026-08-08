import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { TeamMember } from '../types';
import { v4 as uuid } from 'uuid';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function Team() {
  const { teamMembers, jobs, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', phone: '', email: '', hourlyRate: '', employeeType: 'employee' as 'employee' | 'contractor' });

  function addMember() {
    const member: TeamMember = {
      id: uuid(), name: newMember.name, role: newMember.role,
      phone: newMember.phone, email: newMember.email,
      hourlyRate: parseFloat(newMember.hourlyRate) || 0,
      status: 'active', color: COLORS[teamMembers.length % COLORS.length],
      employeeType: newMember.employeeType,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TEAM_MEMBER', payload: member });
    setShowNew(false);
    setNewMember({ name: '', role: '', phone: '', email: '', hourlyRate: '', employeeType: 'employee' });
  }

  function toggleStatus(member: TeamMember) {
    dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: { ...member, status: member.status === 'active' ? 'inactive' : 'active' } });
  }

  function deleteMember(id: string) {
    if (confirm('Remove this team member?')) dispatch({ type: 'DELETE_TEAM_MEMBER', payload: id });
  }

  const activeMembers = teamMembers.filter(m => m.status === 'active');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Team</h2>
        <button onClick={() => setShowNew(!showNew)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ New</button>
      </div>

      <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
        <p className="text-slate-400 text-xs">Active Members</p>
        <p className="text-xl font-bold">{activeMembers.length}</p>
      </div>

      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Role" value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Phone" value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} />
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="$/hr" value={newMember.hourlyRate} onChange={e => setNewMember({ ...newMember, hourlyRate: e.target.value })} />
          </div>
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Email" type="email" value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500">Type</label>
              <select className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newMember.employeeType} onChange={e => setNewMember({ ...newMember, employeeType: e.target.value as any })}>
                <option value="employee">W-2 Employee</option>
                <option value="contractor">1099 Contractor</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500">Start date</label>
              <input type="date" className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={(newMember as any).startDate || ''} onChange={e => setNewMember({ ...newMember, startDate: e.target.value } as any)} />
            </div>
          </div>
          <button onClick={addMember} disabled={!newMember.name} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg py-2 font-medium">Add Member</button>
        </div>
      )}

      {teamMembers.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">👥</p>
          <p>No team members yet.</p>
          <p className="text-sm mt-1">Add crew, techs, or staff to assign jobs.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {teamMembers.map(member => {
            const assignedJobs = jobs.filter(j => j.assignedTo === member.id && j.status !== 'completed' && j.status !== 'cancelled');
            return (
              <div key={member.id} className={`bg-slate-900 rounded-lg p-4 border ${member.status === 'active' ? 'border-slate-800' : 'border-slate-800 opacity-50'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: member.color }}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-slate-500 text-sm">{member.role || 'No role'}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {member.employeeType && (
                          <span className={`badge ${member.employeeType === 'employee' ? 'badge-accepted' : 'badge-sent'}`}>
                            {member.employeeType === 'employee' ? 'W-2' : '1099'}
                          </span>
                        )}
                        {member.hourlyRate > 0 && <span className="text-slate-600 text-xs">${member.hourlyRate}/hr</span>}
                      </div>
                      {assignedJobs.length > 0 && <p className="text-brand-400 text-xs mt-1">{assignedJobs.length} active job{assignedJobs.length > 1 ? 's' : ''}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleStatus(member)} className={`badge ${member.status === 'active' ? 'badge-accepted' : 'badge-declined'}`}>
                      {member.status}
                    </button>
                    <button onClick={() => deleteMember(member.id)} className="text-red-400 text-xs">✕</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
