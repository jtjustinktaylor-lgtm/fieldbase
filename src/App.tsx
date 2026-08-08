import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Quotes from './pages/Quotes';
import QuoteDetail from './pages/QuoteDetail';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import ProfitTracker from './pages/ProfitTracker';
import Settings from './pages/Settings';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import Calendar from './pages/Calendar';
import Subscriptions from './pages/Subscriptions';
import Inventory from './pages/Inventory';
import Team from './pages/Team';
import ClientPortal from './pages/ClientPortal';
import Onboarding from './pages/Onboarding';
import SmartQuote from './pages/SmartQuote';
import Integrations from './pages/Integrations';
import TemplateEditor from './pages/TemplateEditor';
import Memberships from './pages/Memberships';
import StripeCheckout from './pages/StripeCheckout';
import PaymentLink from './pages/PaymentLink';
import { useApp } from './store/AppContext';

/** Wraps a page component with its own ErrorBoundary so one page crashing doesn't kill the whole app */
function P({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default function App() {
  const { settings, hydrated } = useApp();

  if (!hydrated) return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    </ErrorBoundary>
  );

  if (!settings.onboardingComplete) return (
    <ErrorBoundary>
      <Onboarding />
    </ErrorBoundary>
  );

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<P><Dashboard /></P>} />
          <Route path="/quotes" element={<P><Quotes /></P>} />
          <Route path="/quotes/:id" element={<P><QuoteDetail /></P>} />
          <Route path="/jobs" element={<P><Jobs /></P>} />
          <Route path="/jobs/:id" element={<P><JobDetail /></P>} />
          <Route path="/customers" element={<P><Customers /></P>} />
          <Route path="/customers/:id" element={<P><CustomerDetail /></P>} />
          <Route path="/invoices" element={<P><Invoices /></P>} />
          <Route path="/invoices/:id" element={<P><InvoiceDetail /></P>} />
          <Route path="/invoices/:id/pay" element={<P><StripeCheckout /></P>} />
          <Route path="/invoices/:id/payment-link" element={<P><PaymentLink /></P>} />
          <Route path="/pay/:id" element={<P><StripeCheckout /></P>} />
          <Route path="/calendar" element={<P><Calendar /></P>} />
          <Route path="/subscriptions" element={<P><Subscriptions /></P>} />
          <Route path="/inventory" element={<P><Inventory /></P>} />
          <Route path="/team" element={<P><Team /></P>} />
          <Route path="/portal" element={<P><ClientPortal /></P>} />
          <Route path="/profit" element={<P><ProfitTracker /></P>} />
          <Route path="/settings" element={<P><Settings /></P>} />
          <Route path="/smart-quote" element={<P><SmartQuote /></P>} />
          <Route path="/integrations" element={<P><Integrations /></P>} />
          <Route path="/template-editor" element={<P><TemplateEditor /></P>} />
          <Route path="/memberships" element={<P><Memberships /></P>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
