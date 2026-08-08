import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Customer } from '../types';
import { v4 as uuid } from 'uuid';
import { validate, required, emailFormat, phoneFormat, fieldError, hasErrors, type FieldError } from '../utils/validation';

export default function Customers() {
  const { customers, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState<FieldError[]>([]);

  function validateForm(): boolean {
    const result = validate(
      required(newCustomer.name, 'Name'),
      emailFormat(newCustomer.email, 'Email'),
      phoneFormat(newCustomer.phone, 'Phone'),
    );
    setErrors(result);
    return !hasErrors(result);
  }

  function addCustomer() {
    if (!validateForm()) return;
    const customer: Customer = {
      id: uuid(),
      name: newCustomer.name.trim(),
      email: newCustomer.email.trim(),
      phone: newCustomer.phone.trim(),
      address: newCustomer.address.trim(),
      notes: '',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_CUSTOMER', payload: customer });
    setShowNew(false);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
    setErrors([]);
  }

  function closeForm() {
    setShowNew(false);
    setErrors([]);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
  }

  const err = (field: string) => fieldError(errors, field);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Customers</h2>
        <button onClick={() => { showNew ? closeForm() : setShowNew(true); }} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
          {showNew ? 'Cancel' : '+ New'}
        </button>
      </div>

      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <div>
            <input className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Name') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`} placeholder="Name *" value={newCustomer.name} onChange={e => { setNewCustomer({ ...newCustomer, name: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Name')); }} />
            {err('Name') && <p className="text-red-400 text-xs mt-1">{err('Name')}</p>}
          </div>
          <div>
            <input className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Phone') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`} placeholder="Phone" type="tel" value={newCustomer.phone} onChange={e => { setNewCustomer({ ...newCustomer, phone: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Phone')); }} />
            {err('Phone') && <p className="text-red-400 text-xs mt-1">{err('Phone')}</p>}
          </div>
          <div>
            <input className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border ${err('Email') ? 'border-red-500' : 'border-slate-700'} focus:border-brand-500 focus:outline-none`} placeholder="Email" type="email" value={newCustomer.email} onChange={e => { setNewCustomer({ ...newCustomer, email: e.target.value }); setErrors(errors.filter(e2 => e2.field !== 'Email')); }} />
            {err('Email') && <p className="text-red-400 text-xs mt-1">{err('Email')}</p>}
          </div>
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Address" value={newCustomer.address} onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })} />
          <button onClick={addCustomer} className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 font-medium">
            Add Customer
          </button>
        </div>
      )}

      {customers.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">👥</p>
          <p>No customers yet. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {customers.map(c => (
            <Link
              key={c.id}
              to={`/customers/${c.id}`}
              className="block bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
            >
              <p className="font-medium">{c.name}</p>
              <div className="flex gap-4 mt-1 text-slate-500 text-sm">
                {c.phone && <span>📞 {c.phone}</span>}
                {c.email && <span>📧 {c.email}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
