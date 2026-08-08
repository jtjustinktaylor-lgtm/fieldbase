/**
 * Stripe Integration Module for FieldBase
 *
 * Supports two modes:
 * 1. **Stripe Checkout (Recommended)** — Hosted payment page, no PCI compliance needed
 *    - Requires: publishable key + a backend to create Checkout Sessions
 *    - Best for: Production use, real payments
 *
 * 2. **Payment Links** — Pre-built Stripe Payment Links
 *    - Requires: Just a Stripe account
 *    - Best for: Quick setup without a backend
 *
 * For a pure frontend app, we use Payment Links or simulate Checkout.
 * When a backend is available, we create real Checkout Sessions.
 */

import { Invoice, BusinessSettings, Customer } from '../types';

// ─── Types ──────────────────────────────────────────────────────────────

export interface StripeConfig {
  publishableKey: string;
  backendUrl?: string;           // Optional backend URL for Checkout Sessions
  webhookSecret?: string;        // For verifying webhook events
  currency?: string;             // Default currency
  statementDescriptor?: string;  // Appears on customer's card statement
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
  amount?: number;
  currency?: string;
}

export interface PaymentLinkOptions {
  invoiceId: string;
  amount: number;               // Amount in cents
  currency: string;
  customerEmail?: string;
  customerName?: string;
  description: string;
  businessName: string;
  successUrl: string;
  cancelUrl: string;
}

// ─── Stripe Initialization ─────────────────────────────────────────────

let stripeInstance: any = null;

/**
 * Initialize Stripe with the publishable key.
 * Uses the Stripe.js library loaded via CDN.
 */
export async function initializeStripe(publishableKey: string): Promise<boolean> {
  if (!publishableKey || !publishableKey.startsWith('pk_')) {
    console.warn('Invalid Stripe publishable key. Must start with pk_');
    return false;
  }

  // Check if Stripe.js is already loaded
  if (typeof window !== 'undefined' && (window as any).Stripe) {
    try {
      stripeInstance = (window as any).Stripe(publishableKey);
      return true;
    } catch (err) {
      console.error('Failed to initialize Stripe:', err);
      return false;
    }
  }

  // Load Stripe.js dynamically
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => {
      try {
        stripeInstance = (window as any).Stripe(publishableKey);
        resolve(true);
      } catch (err) {
        console.error('Failed to initialize Stripe after loading:', err);
        resolve(false);
      }
    };
    script.onerror = () => {
      console.error('Failed to load Stripe.js');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Get the current Stripe instance.
 */
export function getStripe() {
  return stripeInstance;
}

// ─── Payment Link Generation ────────────────────────────────────────────

/**
 * Generate a Stripe Payment Link for an invoice.
 * This creates a shareable URL that opens Stripe's hosted payment page.
 *
 * In production, Payment Links are created via the Stripe API (requires backend).
 * For frontend-only, we construct a checkout redirect instead.
 */
export function generatePaymentLink(options: PaymentLinkOptions): string {
  const { amount, currency, description, successUrl, cancelUrl, customerEmail } = options;

  // For real Payment Links, you'd call your backend:
  // POST /api/create-payment-link
  //   { amount, currency, description, success_url, cancel_url }
  //
  // The backend would use the Stripe SDK:
  //   const link = await stripe.paymentLinks.create({...})
  //   return link.url

  // For now, return a Stripe Checkout redirect URL
  // This will be handled by the checkout redirect function
  return `checkout:${JSON.stringify({
    amount,
    currency: currency.toLowerCase(),
    description,
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
  })}`;
}

// ─── Checkout Session Creation ──────────────────────────────────────────

/**
 * Create a Stripe Checkout Session and redirect to it.
 *
 * Two approaches:
 * 1. Backend API (recommended for production)
 * 2. Client-side redirect (simpler, but limited)
 */
export async function redirectToCheckout(
  invoice: Invoice,
  customer: Customer | undefined,
  settings: BusinessSettings,
): Promise<{ success: boolean; error?: string }> {
  const stripe = getStripe();
  if (!stripe) {
    return { success: false, error: 'Stripe not initialized. Please add your Stripe key in Integrations.' };
  }

  const amountDue = Math.round(invoice.amountDue * 100); // Convert to cents
  const currency = (settings.currency || 'usd').toLowerCase();
  const businessName = settings.name || 'FieldBase Business';

  // Build description
  const lineItemDesc = invoice.lineItems
    .filter(li => li.description)
    .map(li => `${li.description} (x${li.quantity})`)
    .join(', ');
  const description = lineItemDesc || `Invoice #${invoice.id.slice(0, 8)}`;

  // If backend URL is configured, create a real Checkout Session
  if (settings.stripeBackendUrl) {
    try {
      const response = await fetch(`${settings.stripeBackendUrl}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_id: invoice.id,
          amount: amountDue,
          currency,
          description: `${businessName} — ${description}`,
          customer_email: customer?.email,
          customer_name: customer?.name,
          success_url: `${window.location.origin}/invoices/${invoice.id}?payment=success`,
          cancel_url: `${window.location.origin}/invoices/${invoice.id}?payment=cancelled`,
          metadata: {
            invoice_id: invoice.id,
            customer_id: invoice.customerId,
            business_name: businessName,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.error || 'Failed to create checkout session' };
      }

      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error creating checkout session' };
    }
  }

  // No backend: use Stripe Checkout with line items (requires Stripe Products)
  // For demo/testing, we'll show a payment simulation with clear instructions
  return { success: false, error: 'BACKEND_REQUIRED' };
}

// ─── Payment Simulation (Demo Mode) ─────────────────────────────────────

/**
 * Simulate a successful payment for demo purposes.
 * In production, this would be replaced by actual Stripe webhook handling.
 */
export function simulatePayment(
  invoice: Invoice,
  settings: BusinessSettings,
): PaymentResult {
  const amount = invoice.amountDue;
  const currency = settings.currency || 'USD';

  // Generate a fake payment intent ID
  const paymentIntentId = 'pi_demo_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  return {
    success: true,
    paymentIntentId,
    amount: amount * 100, // cents
    currency: currency.toLowerCase(),
  };
}

// ─── Payment Status Verification ────────────────────────────────────────

/**
 * Verify a payment status with Stripe.
 * In production, this would check the PaymentIntent status.
 */
export async function verifyPayment(paymentIntentId: string): Promise<{
  status: 'succeeded' | 'pending' | 'failed';
  amount: number;
  currency: string;
}> {
  // In production, call your backend:
  // GET /api/verify-payment/:paymentIntentId
  //
  // The backend would use:
  //   const intent = await stripe.paymentIntents.retrieve(paymentIntentId)
  //   return { status: intent.status, amount: intent.amount, currency: intent.currency }

  // For demo, return success
  return {
    status: 'succeeded',
    amount: 0,
    currency: 'usd',
  };
}

// ─── Stripe URL Helpers ─────────────────────────────────────────────────

/**
 * Open the Stripe Dashboard for a specific payment.
 */
export function openStripeDashboard(paymentIntentId: string): void {
  window.open(`https://dashboard.stripe.com/payments/${paymentIntentId}`, '_blank');
}

/**
 * Get the Stripe Dashboard URL for the business.
 */
export function getStripeDashboardUrl(): string {
  return 'https://dashboard.stripe.com';
}

// ─── Key Validation ─────────────────────────────────────────────────────

/**
 * Validate a Stripe publishable key format.
 */
export function validateStripeKey(key: string): {
  valid: boolean;
  type: 'live' | 'test' | 'invalid';
  message: string;
} {
  if (!key) {
    return { valid: false, type: 'invalid', message: 'No key provided' };
  }

  if (key.startsWith('pk_live_')) {
    return { valid: true, type: 'live', message: 'Live key (real charges)' };
  }

  if (key.startsWith('pk_test_')) {
    return { valid: true, type: 'test', message: 'Test key (no real charges)' };
  }

  return { valid: false, type: 'invalid', message: 'Invalid key format. Must start with pk_live_ or pk_test_' };
}

// ─── Payment Amount Formatting ──────────────────────────────────────────

/**
 * Format an amount for Stripe (convert dollars to cents).
 */
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Format an amount from Stripe (convert cents to dollars).
 */
export function formatAmountFromStripe(amountInCents: number): number {
  return amountInCents / 100;
}

// ─── Webhook Event Types ────────────────────────────────────────────────

export type StripeWebhookEvent =
  | 'checkout.session.completed'
  | 'checkout.session.expired'
  | 'payment_intent.succeeded'
  | 'payment_intent.payment_failed'
  | 'invoice.paid'
  | 'invoice.payment_failed';

/**
 * Parse a Stripe webhook event.
 * In production, verify the signature first.
 */
export function parseWebhookEvent(
  payload: string,
  signature?: string,
): { type: StripeWebhookEvent; data: any } | null {
  try {
    const event = JSON.parse(payload);
    return {
      type: event.type as StripeWebhookEvent,
      data: event.data,
    };
  } catch {
    return null;
  }
}

// ─── Backend API Endpoints (Documentation) ──────────────────────────────

/**
 * Required backend endpoints for full Stripe integration:
 *
 * POST /api/create-checkout-session
 *   Body: { invoice_id, amount, currency, description, success_url, cancel_url, customer_email, metadata }
 *   Returns: { sessionId, url }
 *
 * POST /api/create-payment-link
 *   Body: { amount, currency, description, success_url, cancel_url }
 *   Returns: { url, id }
 *
 * GET /api/verify-payment/:paymentIntentId
 *   Returns: { status, amount, currency }
 *
 * POST /api/webhooks/stripe
 *   Body: Stripe webhook event payload
 *   Headers: stripe-signature
 *   Returns: { received: true }
 *
 * POST /api/refund
 *   Body: { payment_intent_id, amount? }
 *   Returns: { refund_id, status }
 */
