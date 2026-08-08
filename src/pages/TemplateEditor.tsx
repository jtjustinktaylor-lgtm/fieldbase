import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { getTemplate, industryTemplates } from '../data/templates';

export default function TemplateEditor() {
  const navigate = useNavigate();
  const { settings, dispatch } = useApp();
  const template = getTemplate(settings.industry || 'other');

  const [lineItems, setLineItems] = useState(
    settings.customLineItems?.length ? settings.customLineItems : [...template.quoteLineItemDefaults]
  );
  const [expenseCategories, setExpenseCategories] = useState(
    settings.customExpenseCategories?.length ? settings.customExpenseCategories : [...template.expenseCategories]
  );
  const [terminology, setTerminology] = useState(
    settings.customTerminology || { ...template.terminology }
  );
  const [newItem, setNewItem] = useState({ description: '', unitPrice: '', cost: '' });
  const [newCategory, setNewCategory] = useState('');

  function addLineItem() {
    if (!newItem.description) return;
    setLineItems([...lineItems, {
      description: newItem.description,
      unitPrice: parseFloat(newItem.unitPrice) || 0,
      cost: parseFloat(newItem.cost) || 0,
    }]);
    setNewItem({ description: '', unitPrice: '', cost: '' });
  }

  function removeLineItem(i: number) {
    setLineItems(lineItems.filter((_, idx) => idx !== i));
  }

  function updateLineItem(i: number, field: string, value: string | number) {
    setLineItems(lineItems.map((li, idx) => idx === i ? { ...li, [field]: value } : li));
  }

  function addCategory() {
    if (!newCategory || expenseCategories.includes(newCategory)) return;
    setExpenseCategories([...expenseCategories, newCategory]);
    setNewCategory('');
  }

  function removeCategory(i: number) {
    setExpenseCategories(expenseCategories.filter((_, idx) => idx !== i));
  }

  function save() {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        ...settings,
        customLineItems: lineItems,
        customExpenseCategories: expenseCategories,
        customTerminology: terminology,
      },
    });
    navigate('/settings');
  }

  function reset() {
    setLineItems([...template.quoteLineItemDefaults]);
    setExpenseCategories([...template.expenseCategories]);
    setTerminology({ ...template.terminology });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/settings')} className="text-slate-400 hover:text-white text-sm">← Back</button>
          <h2 className="text-lg font-bold">Customize Template</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-3 py-2 rounded-lg">Reset</button>
          <button onClick={save} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">Save</button>
        </div>
      </div>

      <p className="text-slate-500 text-sm">Customize your {template.icon} {template.name} template — edit pricing, add/remove line items, and rename categories to match how YOUR business works.</p>

      {/* Terminology */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Terminology</h3>
        <p className="text-slate-600 text-xs">Rename how things appear throughout the app.</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-slate-500">Jobs →</label>
            <input className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={terminology.jobs} onChange={e => setTerminology({ ...terminology, jobs: e.target.value })} />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Quotes →</label>
            <input className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={terminology.quotes} onChange={e => setTerminology({ ...terminology, quotes: e.target.value })} />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Customers →</label>
            <input className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={terminology.customers} onChange={e => setTerminology({ ...terminology, customers: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Line items */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Default Line Items</h3>
        <p className="text-slate-600 text-xs">These appear as defaults when creating new quotes. Edit pricing to match YOUR rates.</p>
        <div className="space-y-2">
          {lineItems.map((li, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-800 rounded-lg p-2 border border-slate-700">
              <input className="flex-1 bg-transparent text-sm focus:outline-none" value={li.description} onChange={e => updateLineItem(i, 'description', e.target.value)} />
              <div className="flex items-center gap-1">
                <span className="text-slate-500 text-xs">$</span>
                <input type="number" className="w-20 bg-slate-900 rounded px-2 py-1 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none text-right" value={li.unitPrice} onChange={e => updateLineItem(i, 'unitPrice', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-600 text-xs">cost</span>
                <input type="number" className="w-20 bg-slate-900 rounded px-2 py-1 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none text-right" value={li.cost} onChange={e => updateLineItem(i, 'cost', parseFloat(e.target.value) || 0)} />
              </div>
              <button onClick={() => removeLineItem(i)} className="text-red-400 text-xs px-1">✕</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="New line item description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
          <input type="number" className="w-20 bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Price" value={newItem.unitPrice} onChange={e => setNewItem({ ...newItem, unitPrice: e.target.value })} />
          <input type="number" className="w-20 bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Cost" value={newItem.cost} onChange={e => setNewItem({ ...newItem, cost: e.target.value })} />
          <button onClick={addLineItem} className="bg-brand-600 hover:bg-brand-700 text-white rounded px-3 py-1.5 text-sm">+</button>
        </div>
      </div>

      {/* Expense categories */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Expense Categories</h3>
        <div className="flex flex-wrap gap-2">
          {expenseCategories.map((cat, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-slate-800 rounded-full px-3 py-1 text-sm border border-slate-700">
              {cat}
              <button onClick={() => removeCategory(i)} className="text-red-400 text-xs">✕</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="New category" value={newCategory} onChange={e => setNewCategory(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCategory()} />
          <button onClick={addCategory} className="bg-brand-600 hover:bg-brand-700 text-white rounded px-3 py-1.5 text-sm">Add</button>
        </div>
      </div>
    </div>
  );
}
