import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { industryTemplates } from '../data/templates';

export default function Onboarding() {
  const { settings, dispatch } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(settings.name || '');
  const [industry, setIndustry] = useState('');

  function finish() {
    const template = industryTemplates.find(t => t.id === industry);
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        ...settings,
        name,
        industry,
        taxRate: 0,
        onboardingComplete: true,
      },
    });
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-6xl mb-6">⚡</p>
          <h1 className="text-3xl font-bold mb-2">Welcome to FieldFlow</h1>
          <p className="text-slate-400 mb-8">The business OS for service businesses. Quotes, jobs, invoices, scheduling, profit tracking — all in one app.</p>
          <button onClick={() => setStep(1)} className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl py-3.5 font-medium text-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <p className="text-4xl mb-4">🏗️</p>
            <h2 className="text-2xl font-bold mb-2">What's your business name?</h2>
            <p className="text-slate-400 text-sm">This will appear on your quotes and invoices.</p>
          </div>
          <input
            className="w-full bg-slate-900 rounded-xl px-4 py-3.5 text-lg border border-slate-700 focus:border-brand-500 focus:outline-none text-center"
            placeholder="My Business"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <button onClick={() => setStep(2)} disabled={!name.trim()} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl py-3.5 font-medium text-lg transition-colors">
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <p className="text-4xl mb-4">📋</p>
          <h2 className="text-2xl font-bold mb-2">What industry?</h2>
          <p className="text-slate-400 text-sm">We'll set up templates and terminology for your business type.</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {industryTemplates.map(t => (
            <button
              key={t.id}
              onClick={() => setIndustry(t.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-colors ${
                industry === t.id ? 'bg-brand-600 border-brand-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="leading-tight text-center">{t.name}</span>
            </button>
          ))}
        </div>
        <button onClick={finish} disabled={!industry} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl py-3.5 font-medium text-lg transition-colors">
          Start Building ⚡
        </button>
      </div>
    </div>
  );
}
