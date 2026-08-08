import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { validateStripeKey, getStripeDashboardUrl } from '../utils/stripe';

export default function Integrations() {
  const { settings, dispatch } = useApp();
  const [stripeKey, setStripeKey] = useState(settings.stripePublicKey || '');
  const [stripeBackendUrl, setStripeBackendUrl] = useState(settings.stripeBackendUrl || '');
  const [stripeMode, setStripeMode] = useState<'test' | 'live'>(settings.stripeMode || 'test');
  const [stripeSaved, setStripeSaved] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [qbStep, setQbStep] = useState(settings.quickbooksConnected ? 'connected' : 'idle');

  const keyValidation = validateStripeKey(stripeKey);

  function saveStripe() {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        ...settings,
        stripePublicKey: stripeKey,
        stripeBackendUrl: stripeBackendUrl || undefined,
        stripeMode,
      },
    });
    setStripeSaved(true);
    setTimeout(() => setStripeSaved(false), 2000);
  }

  function disconnectStripe() {
    if (confirm('Remove Stripe integration? Existing payment records will remain.')) {
      dispatch({
        type: 'UPDATE_SETTINGS',
        payload: {
          ...settings,
          stripePublicKey: '',
          stripeBackendUrl: '',
          stripeMode: 'test',
        },
      });
      setStripeKey('');
      setStripeBackendUrl('');
    }
  }

  function connectQuickBooks() {
    if (confirm('This will open QuickBooks authorization. In production, you\'d be redirected to Intuit\'s login page. Simulate connection?')) {
      dispatch({ type: 'UPDATE_SETTINGS', payload: { ...settings, quickbooksConnected: true } });
      setQbStep('connected');
    }
  }

  function disconnectQuickBooks() {
    if (confirm('Disconnect QuickBooks? Existing data will remain but new syncs will stop.')) {
      dispatch({ type: 'UPDATE_SETTINGS', payload: { ...settings, quickbooksConnected: false } });
      setQbStep('idle');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} className="text-slate-400 hover:text-white text-sm">← Back</button>
          <h2 className="text-xl font-bold">Integrations</h2>
        </div>
      </div>

      {/* ─── Stripe ───────────────────────────────────────────────────── */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">S</div>
          <div className="flex-1">
            <h3 className="font-medium">Stripe Payments</h3>
            <p className="text-slate-500 text-xs">Accept credit cards, Apple Pay, Google Pay on invoices</p>
          </div>
          {settings.stripePublicKey && (
            <span className={`badge ${keyValidation.type === 'live' ? 'badge-accepted' : 'badge-scheduled'}`}>
              {keyValidation.type === 'live' ? 'Live' : 'Test'}
            </span>
          )}
        </div>

        {/* Mode selector */}
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setStripeMode('test')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              stripeMode === 'test' ? 'bg-amber-600 text-white' : 'text-slate-400'
            }`}
          >
            🧪 Test Mode
          </button>
          <button
            onClick={() => setStripeMode('live')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              stripeMode === 'live' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            🔴 Live Mode
          </button>
        </div>

        {/* Publishable Key */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400">Publishable Key</label>
          <input
            className={`w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border font-mono focus:outline-none ${
              stripeKey && !keyValidation.valid
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-700 focus:border-brand-500'
            }`}
            placeholder={stripeMode === 'test' ? 'pk_test_...' : 'pk_live_...'}
            value={stripeKey}
            onChange={e => setStripeKey(e.target.value)}
          />
          {stripeKey && (
            <p className={`text-xs ${keyValidation.valid ? 'text-emerald-400' : 'text-red-400'}`}>
              {keyValidation.message}
            </p>
          )}
          <p className="text-xs text-slate-600">
            Get your key from <span className="text-brand-400 cursor-pointer" onClick={() => window.open('https://dashboard.stripe.com/apikeys', '_blank')}>dashboard.stripe.com/apikeys</span>
          </p>
        </div>

        {/* Advanced: Backend URL */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1"
          >
            {showAdvanced ? '▼' : '▶'} Advanced Settings
          </button>

          {showAdvanced && (
            <div className="mt-2 space-y-3">
              <div>
                <label className="text-xs text-slate-400">Backend URL (optional)</label>
                <input
                  className="w-full bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none font-mono"
                  placeholder="https://your-api.com/stripe"
                  value={stripeBackendUrl}
                  onChange={e => setStripeBackendUrl(e.target.value)}
                />
                <p className="text-xs text-slate-600 mt-1">
                  Required for real Stripe Checkout Sessions. Without this, payments are simulated.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400 space-y-2">
                <p className="font-medium text-slate-300">Required Backend Endpoints:</p>
                <div className="space-y-1 font-mono">
                  <p>POST /create-checkout-session</p>
                  <p>POST /create-payment-link</p>
                  <p>GET /verify-payment/:id</p>
                  <p>POST /webhooks/stripe</p>
                </div>
                <p className="text-slate-500 mt-2">
                  See <span className="text-brand-400">src/utils/stripe.ts</span> for API documentation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Save / Disconnect */}
        <div className="flex gap-2">
          <button
            onClick={saveStripe}
            disabled={!stripeKey}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium"
          >
            {stripeSaved ? '✓ Saved' : 'Save Stripe Settings'}
          </button>
          {settings.stripePublicKey && (
            <button
              onClick={disconnectStripe}
              className="bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg px-4 py-2 text-sm"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Status info */}
        {settings.stripePublicKey && (
          <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400 space-y-2">
            <p className="font-medium text-slate-300">What's enabled:</p>
            <div className="space-y-1">
              <p>✅ "Pay Now" button on invoices</p>
              <p>✅ Payment links you can share via email/SMS</p>
              <p>✅ Secure Stripe Checkout page</p>
              <p>✅ Cards, Apple Pay, Google Pay accepted</p>
              {stripeBackendUrl && <p>✅ Real Stripe Checkout Sessions</p>}
              {!stripeBackendUrl && <p className="text-amber-400">⚠️ Demo mode (simulated payments)</p>}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => window.open(getStripeDashboardUrl(), '_blank')}
                className="text-brand-400 hover:underline"
              >
                Open Stripe Dashboard →
              </button>
            </div>
            <p className="text-slate-500 mt-1">Processing fees: 2.9% + $0.30 per transaction (Stripe standard)</p>
          </div>
        )}

        {/* Getting started guide */}
        {!settings.stripePublicKey && (
          <div className="bg-indigo-950/30 rounded-lg p-3 border border-indigo-800">
            <p className="text-indigo-300 text-sm font-medium mb-2">🚀 Quick Start</p>
            <ol className="text-xs text-indigo-200/70 space-y-1 list-decimal list-inside">
              <li>Create a <span className="text-indigo-300 cursor-pointer underline" onClick={() => window.open('https://dashboard.stripe.com/register', '_blank')}>Stripe account</span> (free)</li>
              <li>Go to Developers → API Keys</li>
              <li>Copy your <strong>Publishable key</strong> (pk_test_...)</li>
              <li>Paste it above and save</li>
              <li>Start accepting payments! 🎉</li>
            </ol>
          </div>
        )}
      </div>

      {/* ─── QuickBooks ───────────────────────────────────────────────── */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white text-lg font-bold">Q</div>
          <div>
            <h3 className="font-medium">QuickBooks Online</h3>
            <p className="text-slate-500 text-xs">2-way sync of customers, invoices, payments, and expenses</p>
          </div>
          {settings.quickbooksConnected && <span className="badge badge-accepted ml-auto">Connected</span>}
        </div>

        {settings.quickbooksConnected ? (
          <div className="space-y-2">
            <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400 space-y-1">
              <p>✅ Customers synced bidirectionally</p>
              <p>✅ Invoices flow to QuickBooks automatically</p>
              <p>✅ Payments recorded in both systems</p>
              <p>✅ Expenses synced with category mapping</p>
            </div>
            <p className="text-xs text-slate-500">Last synced: Just now (in production, this would show the actual timestamp)</p>
            <button onClick={disconnectQuickBooks} className="w-full bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg py-2 text-sm">Disconnect</button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-slate-400">Connect your QuickBooks account to automatically sync customers, invoices, and payments. Unlike Jobber's one-way sync, FieldBase syncs both directions — no duplicates, no broken connections.</p>
            <button onClick={connectQuickBooks} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm font-medium">
              Connect QuickBooks
            </button>
          </div>
        )}
      </div>

      {/* ─── Coming Soon ──────────────────────────────────────────────── */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 border-dashed text-center">
        <p className="text-slate-500 text-sm mb-2">More integrations coming soon</p>
        <div className="flex justify-center gap-3 text-xs text-slate-600">
          <span>Xero</span>
          <span>•</span>
          <span>Google Calendar</span>
          <span>•</span>
          <span>Zapier</span>
          <span>•</span>
          <span>Mailchimp</span>
          <span>•</span>
          <span>Twilio SMS</span>
        </div>
      </div>
    </div>
  );
}
