import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { InventoryItem, InventoryTransaction } from '../types';
import { v4 as uuid } from 'uuid';

export default function Inventory() {
  const { inventory, inventoryTransactions, dispatch } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [showAdjust, setShowAdjust] = useState<string | null>(null);
  const [adjustQty, setAdjustQty] = useState('');
  const [adjustType, setAdjustType] = useState<InventoryTransaction['type']>('purchase');
  const [newItem, setNewItem] = useState({ name: '', sku: '', category: '', unit: 'ea', costPerUnit: '', pricePerUnit: '', quantity: '', lowStockThreshold: '5', supplier: '' });
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(inventory.map(i => i.category).filter(Boolean))];
  const filtered = filter === 'all' ? inventory : inventory.filter(i => i.category === filter);
  const lowStock = inventory.filter(i => i.quantity <= i.lowStockThreshold);
  const totalValue = inventory.reduce((s, i) => s + i.quantity * i.costPerUnit, 0);

  function addItem() {
    const item: InventoryItem = {
      id: uuid(),
      name: newItem.name,
      sku: newItem.sku,
      category: newItem.category,
      unit: newItem.unit,
      quantity: parseFloat(newItem.quantity) || 0,
      costPerUnit: parseFloat(newItem.costPerUnit) || 0,
      pricePerUnit: parseFloat(newItem.pricePerUnit) || 0,
      lowStockThreshold: parseFloat(newItem.lowStockThreshold) || 5,
      supplier: newItem.supplier,
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: item });
    setShowNew(false);
    setNewItem({ name: '', sku: '', category: '', unit: 'ea', costPerUnit: '', pricePerUnit: '', quantity: '', lowStockThreshold: '5', supplier: '' });
  }

  function adjustStock(item: InventoryItem) {
    const qty = parseFloat(adjustQty) || 0;
    const newQty = adjustType === 'purchase' || adjustType === 'return' ? item.quantity + qty : item.quantity - qty;
    dispatch({ type: 'UPDATE_INVENTORY_ITEM', payload: { ...item, quantity: Math.max(0, newQty), updatedAt: new Date().toISOString() } });
    dispatch({ type: 'ADD_INVENTORY_TRANSACTION', payload: {
      id: uuid(), itemId: item.id, itemName: item.name, type: adjustType,
      quantity: qty, notes: '', date: new Date().toISOString().split('T')[0],
    }});
    setShowAdjust(null);
    setAdjustQty('');
  }

  function deleteItem(id: string) {
    if (confirm('Delete this item?')) dispatch({ type: 'DELETE_INVENTORY_ITEM', payload: id });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Inventory</h2>
        <button onClick={() => setShowNew(!showNew)} className="bg-brand-600 hover:bg-brand-700 text-white text-sm px-4 py-2 rounded-lg font-medium">+ New</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-slate-400 text-xs">Total Items</p>
          <p className="text-xl font-bold">{inventory.length}</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <p className="text-slate-400 text-xs">Stock Value</p>
          <p className="text-xl font-bold text-emerald-400">${totalValue.toFixed(2)}</p>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-amber-950/50 rounded-lg p-3 border border-amber-800">
          <p className="text-amber-300 text-sm font-medium mb-1">⚠️ Low Stock ({lowStock.length})</p>
          <p className="text-amber-400/70 text-xs">{lowStock.map(i => i.name).join(', ')}</p>
        </div>
      )}

      {showNew && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-3">
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Item name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="SKU" value={newItem.sku} onChange={e => setNewItem({ ...newItem, sku: e.target.value })} />
            <input className="bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-slate-500">Qty</label>
              <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] text-slate-500">Cost/unit</label>
              <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newItem.costPerUnit} onChange={e => setNewItem({ ...newItem, costPerUnit: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] text-slate-500">Price/unit</label>
              <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newItem.pricePerUnit} onChange={e => setNewItem({ ...newItem, pricePerUnit: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500">Unit</label>
              <input className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="ea, ft, gal..." value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] text-slate-500">Low stock alert</label>
              <input type="number" className="w-full bg-slate-800 rounded px-2 py-1.5 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" value={newItem.lowStockThreshold} onChange={e => setNewItem({ ...newItem, lowStockThreshold: e.target.value })} />
            </div>
          </div>
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none" placeholder="Supplier" value={newItem.supplier} onChange={e => setNewItem({ ...newItem, supplier: e.target.value })} />
          <button onClick={addItem} disabled={!newItem.name} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg py-2 font-medium">Add Item</button>
        </div>
      )}

      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${filter === c ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Items */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-3xl mb-3">📦</p>
          <p>No inventory items yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => {
            const isLow = item.quantity <= item.lowStockThreshold;
            return (
              <div key={item.id} className={`bg-slate-900 rounded-lg p-4 border ${isLow ? 'border-amber-700' : 'border-slate-800'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-slate-500 text-xs">{item.sku && `${item.sku} • `}{item.category || 'Uncategorized'}</p>
                    <p className="text-slate-500 text-xs">Cost: ${item.costPerUnit.toFixed(2)}/{item.unit} • Price: ${item.pricePerUnit.toFixed(2)}/{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${isLow ? 'text-amber-400' : 'text-white'}`}>{item.quantity} <span className="text-xs text-slate-500">{item.unit}</span></p>
                    <p className="text-xs text-slate-500">${(item.quantity * item.costPerUnit).toFixed(2)}</p>
                  </div>
                </div>
                {showAdjust === item.id ? (
                  <div className="mt-3 flex gap-2">
                    <select className="bg-slate-800 rounded px-2 py-1 text-xs border border-slate-700" value={adjustType} onChange={e => setAdjustType(e.target.value as any)}>
                      {['purchase', 'usage', 'return', 'adjustment'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input type="number" className="flex-1 bg-slate-800 rounded px-2 py-1 text-xs border border-slate-700" placeholder="Qty" value={adjustQty} onChange={e => setAdjustQty(e.target.value)} />
                    <button onClick={() => adjustStock(item)} className="bg-brand-600 text-white px-3 py-1 rounded text-xs">✓</button>
                    <button onClick={() => setShowAdjust(null)} className="bg-slate-700 text-white px-2 py-1 rounded text-xs">✕</button>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => setShowAdjust(item.id)} className="text-xs text-brand-400 hover:text-brand-300">Adjust stock</button>
                    <button onClick={() => deleteItem(item.id)} className="text-xs text-red-400 hover:text-red-300">Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
