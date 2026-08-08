import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { initializeStripe, redirectToCheckout, simulatePayment, validateStripeKey } from '../utils/stripe';
import { v4 as uuid } from 'uuid';

export default function StripeCheckout() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { invoices, customers, settings, dispatch } = useApp();

  const [status, setStatus] = useState<'loading' | 'ready' | 'processing' | 'success' | 'error' | 'demo'>('loading');
  const [processingDemo, setProcessingDemo] = useState(false);
  const [error, setError] = useState('');
  const [stripeReady, setStripeReady] = useState(false);

  const invoice = invoices.find(i => i.id === id);
  const customer = customers.find(c => c.id === invoice?.customerId);

  // Check for payment result in URL params
  const paymentStatus = searchParams.get('payment');

  useEffect(() => {
    if (paymentStatus === 'success' && invoice) {
      // Payment succeeded — update invoice
      handlePaymentSuccess();
      return;
    }

    if (paymentStatus === 'cancelled') {
      setStatus('ready');
      setError('Payment was cancelled. You can try again.');
      return;
    }

    if (!invoice) {
      setStatus('error');
      setError('Invoice not found');
      return;
    }

    if (invoice.amountDue <= 0) {
      setStatus('error');
      setError('This invoice is already paid');
      return;
    }

    // Initialize Stripe
    initStripe();
  }, [invoice, paymentStatus]);

  async function initStripe() {
    if (!settings.stripePublicKey) {
      setStatus('demo');
      return;
    }

    const validation = validateStripeKey(settings.stripePublicKey);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.message);
      return;
    }

    const ready = await initializeStripe(settings.stripePublicKey);
    setStripeReady(ready);
    setStatus(ready ? 'ready' : 'demo');
  }

  async function handlePaymentSuccess() {
    if (!invoice) return;

    // Record the payment
    const payment = {
      id: uuid(),
      amount: invoice.amountDue,
      method: 'stripe' as const,
      date: new Date().toISOString().split('T')[0],
      notes: 'Online payment via Stripe',
      stripePaymentId: searchParams.get('payment_intent') || undefined,
    };

    const updatedInvoice = {
      ...invoice,
      payments: [...invoice.payments, payment],
      amountPaid: invoice.amountPaid + payment.amount,
      amountDue: 0,
      status: 'paid' as const,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'UPDATE_INVOICE', payload: updatedInvoice });
    setStatus('success');
  }

  async function handlePayNow() {
    if (!invoice || !customer) return;

    setStatus('processing');
    setError('');

    if (stripeReady) {
      const result = await redirectToCheckout(invoice, customer, settings);
      if (result.success) {
        // Stripe will redirect — nothing to do here
        return;
      }

      if (result.error === 'BACKEND_REQUIRED') {
        // No backend configured — use demo mode
        handleDemoPayment();
        return;
      }

      setStatus('error');
      setError(result.error || 'Payment failed');
    } else {
      handleDemoPayment();
    }
  }

  function handleDemoPayment() {
    if (!invoice) return;

    setProcessingDemo(true);

    // Simulate payment processing
    setTimeout(() => {
      const result = simulatePayment(invoice, settings);

      if (result.success) {
        const payment = {
          id: uuid(),
          amount: invoice.amountDue,
          method: 'stripe' as const,
          date: new Date().toISOString().split('T')[0],
          notes: 'Demo payment (simulated)',
          stripePaymentId: result.paymentIntentId,
        };

        const updatedInvoice = {
          ...invoice,
          payments: [...invoice.payments, payment],
          amountPaid: invoice.amountPaid + payment.amount,
          amountDue: 0,
          status: 'paid' as const,
          updatedAt: new Date().toISOString(),
        };

        dispatch({ type: 'UPDATE_INVOICE', payload: updatedInvoice });
        setStatus('success');
      } else {
        setStatus('error');
        setError(result.error || 'Payment failed');
      }
      setProcessingDemo(false);
    }, 2000);
  }

  function goBack() {
    navigate(`/invoices/${id}`);
  }

  // ─── Loading State ──────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-slate-400">Loading payment...</p>
      </div>
    );
  }

  // ─── Success State ──────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-emerald-400">Payment Successful!</h2>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-2">
            <p className="text-slate-400 text-sm">Invoice</p>
            <p className="font-medium">{invoice?.title || 'Untitled'}</p>
            <p className="text-2xl font-bold text-emerald-400">${invoice?.amountDue.toFixed(2)}</p>
            <p className="text-slate-500 text-xs">{customer?.name}</p>
          </div>

          <div className="bg-emerald-950/30 rounded-lg p-3 border border-emerald-800">
            <p className="text-emerald-300 text-sm">
              A receipt has been sent to {customer?.email || 'the customer'}.
            </p>
          </div>

          <button
            onClick={goBack}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-3 font-medium"
          >
            Back to Invoice
          </button>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-400">Payment Failed</h2>

          <div className="bg-red-950/30 rounded-lg p-4 border border-red-800">
            <p className="text-red-300 text-sm">{error}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={goBack}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-3 font-medium"
            >
              Back
            </button>
            <button
              onClick={() => { setStatus('ready'); setError(''); }}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-3 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Demo Mode (No Stripe Key) ─────────────────────────────────────
  if (status === 'demo') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-4">💳</div>
            <h2 className="text-2xl font-bold">Demo Payment Mode</h2>
            <p className="text-slate-400 text-sm mt-2">
              No Stripe key configured. Simulating a payment for testing.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Invoice</span>
              <span className="font-medium">{invoice?.title || 'Untitled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Customer</span>
              <span>{customer?.name}</span>
            </div>
            <div className="border-t border-slate-700 pt-3 flex justify-between">
              <span className="text-slate-400">Amount</span>
              <span className="text-2xl font-bold text-brand-400">${invoice?.amountDue.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-amber-950/30 rounded-lg p-3 border border-amber-800">
            <p className="text-amber-300 text-xs">
              ⚠️ This is a demo payment. To accept real payments, add your Stripe publishable key in Settings → Integrations.
            </p>
          </div>

          {processingDemo ? (
            <div className="text-center py-4">
              <div className="animate-spin text-3xl mb-2">⏳</div>
              <p className="text-slate-400">Processing demo payment...</p>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-3 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDemoPayment}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-3 font-medium"
              >
                Simulate Payment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Ready State (Real Stripe) ──────────────────────────────────────
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-4">💳</div>
          <h2 className="text-2xl font-bold">Pay Invoice</h2>
          <p className="text-slate-400 text-sm mt-2">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Invoice</span>
            <span className="font-medium">{invoice?.title || 'Untitled'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Customer</span>
            <span>{customer?.name}</span>
          </div>

          {/* Line items summary */}
          {invoice && invoice.lineItems.length > 0 && (
            <div className="border-t border-slate-700 pt-3 space-y-1">
              {invoice.lineItems.filter(li => li.description).map(li => (
                <div key={li.id} className="flex justify-between text-sm">
                  <span className="text-slate-400">{li.description}</span>
                  <span>${(li.quantity * li.unitPrice).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-slate-700 pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span>${invoice?.subtotal.toFixed(2)}</span>
            </div>
            {invoice && invoice.tax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tax ({invoice.taxRate}%)</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-bold pt-2">
              <span>Total Due</span>
              <span className="text-brand-400">${invoice?.amountDue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <p className="text-slate-400 text-xs text-center mb-2">Accepted payment methods</p>
          <div className="flex justify-center gap-4 text-2xl">
            <span title="Visa">💳</span>
            <span title="Mastercard">💳</span>
            <span title="Apple Pay">🍎</span>
            <span title="Google Pay">🅶</span>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex justify-center gap-4 text-xs text-slate-500">
          <span>🔒 SSL Encrypted</span>
          <span>•</span>
          <span>PCI Compliant</span>
          <span>•</span>
          <span>Powered by Stripe</span>
        </div>

        {error && (
          <div className="bg-red-950/30 rounded-lg p-3 border border-red-800">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {status === 'processing' ? (
          <div className="text-center py-4">
            <div className="animate-spin text-3xl mb-2">⏳</div>
            <p className="text-slate-400">Redirecting to Stripe...</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={goBack}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-3 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePayNow}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2"
            >
              💳 Pay ${invoice?.amountDue.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
