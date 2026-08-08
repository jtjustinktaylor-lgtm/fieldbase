import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { v4 as uuid } from 'uuid';

export default function PaymentLink() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices, customers, settings, dispatch } = useApp();

  const [copied, setCopied] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const invoice = invoices.find(i => i.id === id);
  const customer = customers.find(c => c.id === invoice?.customerId);

  if (!invoice) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-3xl mb-3">🔗</p>
        <p>Invoice not found</p>
        <button onClick={() => navigate('/invoices')} className="text-brand-400 text-sm mt-2">
          Back to Invoices
        </button>
      </div>
    );
  }

  if (invoice.amountDue <= 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-3xl mb-3">✅</p>
        <p>This invoice is already paid</p>
        <button onClick={() => navigate(`/invoices/${id}`)} className="text-brand-400 text-sm mt-2">
          View Invoice
        </button>
      </div>
    );
  }

  // Generate the payment link
  const paymentUrl = `${window.location.origin}/pay/${invoice.id}`;
  const businessName = settings.name || 'Your Service Provider';
  const amountStr = `$${invoice.amountDue.toFixed(2)}`;

  // Pre-built messages
  const defaultEmailSubject = `Payment Request: ${invoice.title || 'Invoice'} — ${amountStr}`;
  const defaultEmailBody = `Hi ${customer?.name || 'there'},

${businessName} has sent you an invoice for ${amountStr}.

Invoice: ${invoice.title || 'Service'}
Amount Due: ${amountStr}
Due Date: ${invoice.dueDate || 'Upon receipt'}

Pay securely online:
${paymentUrl}

If you have any questions, please reply to this email.

Thank you for your business!
${businessName}`;

  const defaultSMSBody = `Hi ${customer?.name || 'there'}! ${businessName} sent you an invoice for ${amountStr}. Pay securely here: ${paymentUrl}`;

  function copyLink() {
    navigator.clipboard.writeText(paymentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function openEmail() {
    const subject = encodeURIComponent(defaultEmailSubject);
    const body = encodeURIComponent(customMessage || defaultEmailBody);
    window.open(`mailto:${customer?.email || ''}?subject=${subject}&body=${body}`);
    setEmailSent(true);
  }

  function openSMS() {
    const body = encodeURIComponent(customMessage || defaultSMSBody);
    window.open(`sms:${customer?.phone || ''}?body=${body}`);
    setSmsSent(true);
  }

  function openWhatsApp() {
    const text = encodeURIComponent(customMessage || defaultSMSBody);
    window.open(`https://wa.me/${(customer?.phone || '').replace(/\D/g, '')}?text=${text}`);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/invoices/${id}`)} className="text-slate-400 hover:text-white text-sm">
            ← Back
          </button>
          <h2 className="text-lg font-bold">Payment Link</h2>
        </div>
      </div>

      {/* Invoice summary */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-slate-400 text-xs">Invoice</p>
            <p className="font-medium">{invoice.title || 'Untitled'}</p>
          </div>
          <span className="text-2xl font-bold text-brand-400">{amountStr}</span>
        </div>
        <div className="flex gap-4 text-sm text-slate-500">
          <span>Customer: {customer?.name || 'N/A'}</span>
          <span>Due: {invoice.dueDate || 'N/A'}</span>
        </div>
      </div>

      {/* The link */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
        <p className="text-sm font-medium text-slate-400">Payment Link</p>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-sm font-mono border border-slate-700 focus:border-brand-500 focus:outline-none truncate"
            value={paymentUrl}
            readOnly
          />
          <button
            onClick={copyLink}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              copied ? 'bg-emerald-600 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'
            }`}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-xs text-slate-600">
          Share this link with your customer. They can pay securely with any card.
        </p>
      </div>

      {/* Quick share options */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
        <p className="text-sm font-medium text-slate-400">Quick Share</p>

        {/* Email */}
        {customer?.email ? (
          <button
            onClick={() => setShowEmail(!showEmail)}
            className="w-full flex items-center justify-between bg-slate-800 rounded-lg px-4 py-3 border border-slate-700 hover:border-slate-600"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <div className="text-left">
                <p className="font-medium text-sm">Email</p>
                <p className="text-slate-500 text-xs">{customer.email}</p>
              </div>
            </div>
            {emailSent && <span className="text-emerald-400 text-sm">✓ Opened</span>}
          </button>
        ) : (
          <div className="bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-800 text-center">
            <p className="text-slate-500 text-sm">No email on file for this customer</p>
          </div>
        )}

        {showEmail && customer?.email && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
            <textarea
              className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
              rows={4}
              placeholder="Custom message (optional)"
              value={customMessage}
              onChange={e => setCustomMessage(e.target.value)}
            />
            <button
              onClick={openEmail}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 text-sm font-medium"
            >
              📧 Send Email
            </button>
          </div>
        )}

        {/* SMS */}
        {customer?.phone ? (
          <button
            onClick={() => setShowSMS(!showSMS)}
            className="w-full flex items-center justify-between bg-slate-800 rounded-lg px-4 py-3 border border-slate-700 hover:border-slate-600"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <div className="text-left">
                <p className="font-medium text-sm">SMS / Text</p>
                <p className="text-slate-500 text-xs">{customer.phone}</p>
              </div>
            </div>
            {smsSent && <span className="text-emerald-400 text-sm">✓ Opened</span>}
          </button>
        ) : (
          <div className="bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-800 text-center">
            <p className="text-slate-500 text-sm">No phone on file for this customer</p>
          </div>
        )}

        {showSMS && customer?.phone && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
            <textarea
              className="w-full bg-slate-900 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
              rows={3}
              placeholder="Custom message (optional)"
              value={customMessage}
              onChange={e => setCustomMessage(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={openSMS}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 text-sm font-medium"
              >
                💬 Send SMS
              </button>
              <button
                onClick={openWhatsApp}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 text-sm font-medium"
              >
                📱 WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Code (visual placeholder) */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-center">
        <p className="text-sm font-medium text-slate-400 mb-3">QR Code</p>
        <div className="inline-block bg-white rounded-lg p-4">
          {/* Simple QR placeholder — in production, use a QR library */}
          <div className="w-32 h-32 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
            QR Code
            <br />
            (requires QR library)
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Customers can scan to pay instantly
        </p>
      </div>

      {/* Preview */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <p className="text-sm font-medium text-slate-400 mb-3">Customer Preview</p>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-center mb-4">
            <p className="text-lg font-bold">{businessName}</p>
            <p className="text-slate-400 text-sm">Payment Request</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Invoice</span>
              <span>{invoice.title || 'Untitled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount Due</span>
              <span className="text-xl font-bold text-brand-400">{amountStr}</span>
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium mt-4 opacity-50 cursor-default">
            💳 Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
