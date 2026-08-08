// === EXISTING ===
export interface Customer {
  id: string; name: string; email: string; phone: string; address: string; notes: string; createdAt: string; portalPin?: string;
}
export interface QuoteLineItem { id: string; description: string; quantity: number; unitPrice: number; cost: number; }
export interface Quote {
  id: string; customerId: string; customerName: string; title: string; description: string;
  lineItems: QuoteLineItem[]; taxRate: number;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
  validUntil: string; notes: string; createdAt: string; updatedAt: string; winProbability?: number;
}
export interface Expense { id: string; description: string; amount: number; category: 'materials' | 'labor' | 'equipment' | 'travel' | 'other'; date: string; }
export interface Job {
  id: string; quoteId?: string; customerId: string; customerName: string; title: string; description: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  estimatedRevenue: number; actualRevenue: number; estimatedCost: number; actualCost: number;
  expenses: Expense[]; startDate: string; completedDate: string; notes: string; assignedTo?: string;
  createdAt: string; updatedAt: string;
}
export interface BusinessSettings {
  name: string; email: string; phone: string; address: string; taxRate: number; currency: string;
  industry?: string; onboardingComplete?: boolean;
  // White-label branding
  brandColor?: string; brandSecondaryColor?: string; logoDataUrl?: string; tagline?: string;
  // Integrations
  stripePublicKey?: string; stripeBackendUrl?: string; stripeWebhookSecret?: string; stripeMode?: 'test' | 'live'; quickbooksConnected?: boolean;
  // Plan
  plan?: 'free' | 'pro';
  // Language
  language?: string;
  // Custom template overrides
  customLineItems?: { description: string; unitPrice: number; cost: number }[];
  customExpenseCategories?: string[];
  customTerminology?: { jobs: string; quotes: string; customers: string };
}

// === INVOICING ===
export interface InvoiceLineItem { id: string; description: string; quantity: number; unitPrice: number; }
export interface Payment { id: string; amount: number; method: 'cash' | 'check' | 'card' | 'transfer' | 'stripe' | 'other'; date: string; notes: string; stripePaymentId?: string; }
export interface Invoice {
  id: string; quoteId?: string; jobId?: string; customerId: string; customerName: string; title: string;
  lineItems: InvoiceLineItem[]; taxRate: number; subtotal: number; tax: number; total: number;
  payments: Payment[]; amountPaid: number; amountDue: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'partial';
  dueDate: string; issueDate: string; notes: string; createdAt: string; updatedAt: string;
}

// === APPOINTMENTS ===
export interface Appointment {
  id: string; customerId: string; customerName: string; jobId?: string; title: string; description: string;
  date: string; startTime: string; endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  assignedTo?: string; recurring?: 'none' | 'weekly' | 'biweekly' | 'monthly'; notes: string; createdAt: string;
}

// === SUBSCRIPTIONS ===
export interface Subscription {
  id: string; customerId: string; customerName: string; title: string; description: string;
  amount: number; frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'paused' | 'cancelled'; startDate: string; nextBillingDate: string;
  endDate?: string; notes: string; createdAt: string;
}

// === INVENTORY ===
export interface InventoryItem {
  id: string; name: string; sku: string; category: string; unit: string; quantity: number;
  costPerUnit: number; pricePerUnit: number; lowStockThreshold: number; supplier: string;
  notes: string; createdAt: string; updatedAt: string;
}
export interface InventoryTransaction {
  id: string; itemId: string; itemName: string; type: 'purchase' | 'usage' | 'adjustment' | 'return';
  quantity: number; jobId?: string; notes: string; date: string;
}

// === TEAM (updated with workforce type) ===
export interface TeamMember {
  id: string; name: string; role: string; phone: string; email: string; hourlyRate: number;
  status: 'active' | 'inactive'; color: string; createdAt: string;
  employeeType?: 'employee' | 'contractor'; taxId?: string; startDate?: string;
}

// === ATTACHMENTS & SIGNATURES ===
export interface Attachment {
  id: string; parentId: string; parentType: 'job' | 'quote' | 'invoice' | 'customer';
  name: string; type: 'photo' | 'document' | 'receipt' | 'signature' | 'other';
  dataUrl: string; notes: string; createdAt: string;
}

// === INDUSTRY TEMPLATES ===
export interface IndustryTemplate {
  id: string; name: string; icon: string;
  quoteLineItemDefaults: { description: string; unitPrice: number; cost: number }[];
  expenseCategories: string[];
  jobStatusLabels: { value: string; label: string }[];
  terminology: { jobs: string; quotes: string; customers: string };
}

// === MEMBERSHIP / SERVICE PLANS ===
export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  includedServices: string[];
  status: 'active' | 'archived';
  createdAt: string;
}
export interface CustomerMembership {
  id: string;
  customerId: string;
  customerName: string;
  planId: string;
  planName: string;
  price: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  nextBillingDate: string;
  endDate?: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  autoRenew: boolean;
  notes: string;
  createdAt: string;
}

// === WARRANTY TRACKING ===
export interface Warranty {
  id: string;
  jobId: string;
  jobTitle: string;
  customerId: string;
  customerName: string;
  type: 'parts' | 'labor' | 'both';
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'claimed';
  notes: string;
  createdAt: string;
}
