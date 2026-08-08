import { Customer, Quote, Job, Invoice, Appointment, Subscription, InventoryItem, TeamMember, MembershipPlan, CustomerMembership, Warranty, InventoryTransaction } from '../types';

// Realistic demo data for a fictional HVAC/plumbing company
const now = new Date();
const d = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86400000).toISOString().split('T')[0];
const t = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86400000).toISOString();

export const seedCustomers: Customer[] = [
  { id: 'c1', name: 'Sarah Mitchell', email: 'sarah.mitchell@email.com', phone: '(555) 234-5678', address: '142 Oak Street, Springfield, IL 62701', notes: 'Prefers morning appointments. Has two HVAC units.', createdAt: t(90), portalPin: '1234' },
  { id: 'c2', name: 'James Rodriguez', email: 'james.r@company.com', phone: '(555) 345-6789', address: '88 Elm Avenue, Springfield, IL 62702', notes: 'Commercial property manager. Multiple units.', createdAt: t(75) },
  { id: 'c3', name: 'Linda Chen', email: 'linda.chen@gmail.com', phone: '(555) 456-7890', address: '305 Maple Drive, Springfield, IL 62704', notes: 'Referred by Sarah Mitchell. New homeowner.', createdAt: t(60) },
  { id: 'c4', name: 'Robert Williams', email: 'rwilliams@outlook.com', phone: '(555) 567-8901', address: '17 Pine Court, Springfield, IL 62703', notes: 'Senior citizen discount applied. Regular maintenance customer.', createdAt: t(120) },
  { id: 'c5', name: 'Amanda Foster', email: 'amanda.f@business.net', phone: '(555) 678-9012', address: '421 Cedar Lane, Springfield, IL 62701', notes: 'Restaurant owner. Needs after-hours service.', createdAt: t(45) },
  { id: 'c6', name: 'David Kim', email: 'dkim777@email.com', phone: '(555) 789-0123', address: '56 Birch Street, Springfield, IL 62702', notes: '', createdAt: t(30) },
  { id: 'c7', name: 'Patricia Moore', email: 'pat.moore@home.com', phone: '(555) 890-1234', address: '200 Walnut Ave, Springfield, IL 62704', notes: 'Has warranty on last HVAC install.', createdAt: t(20) },
];

export const seedTeamMembers: TeamMember[] = [
  { id: 't1', name: 'Mike Turner', role: 'Lead Technician', phone: '(555) 100-2001', email: 'mike@fieldflow-demo.com', hourlyRate: 45, status: 'active', color: '#3b82f6', createdAt: t(180), employeeType: 'employee', startDate: '2023-06-15' },
  { id: 't2', name: 'Jess Park', role: 'HVAC Technician', phone: '(555) 100-2002', email: 'jess@fieldflow-demo.com', hourlyRate: 38, status: 'active', color: '#10b981', createdAt: t(150), employeeType: 'employee', startDate: '2023-09-01' },
  { id: 't3', name: 'Carlos Ruiz', role: 'Plumber', phone: '(555) 100-2003', email: 'carlos@fieldflow-demo.com', hourlyRate: 42, status: 'active', color: '#f59e0b', createdAt: t(120), employeeType: 'contractor' },
];

export const seedQuotes: Quote[] = [
  {
    id: 'q1', customerId: 'c1', customerName: 'Sarah Mitchell', title: 'AC Unit Replacement',
    description: 'Replace aging 3-ton central AC unit with new high-efficiency model.',
    lineItems: [
      { id: 'li1', description: '3-Ton Carrier AC Unit', quantity: 1, unitPrice: 2800, cost: 1600 },
      { id: 'li2', description: 'Installation Labor (8hrs)', quantity: 8, unitPrice: 75, cost: 45 },
      { id: 'li3', description: 'Refrigerant & Supplies', quantity: 1, unitPrice: 350, cost: 180 },
      { id: 'li4', description: 'Old Unit Disposal', quantity: 1, unitPrice: 150, cost: 50 },
    ],
    taxRate: 8.5, status: 'accepted', validUntil: d(-5), notes: 'Customer approved. Schedule for next week.',
    createdAt: t(20), updatedAt: t(15), winProbability: 90,
  },
  {
    id: 'q2', customerId: 'c2', customerName: 'James Rodriguez', title: 'Commercial HVAC Maintenance Contract',
    description: 'Quarterly maintenance for 4 rooftop HVAC units at Rodriguez Commercial Complex.',
    lineItems: [
      { id: 'li5', description: 'Quarterly Maintenance Visit', quantity: 4, unitPrice: 450, cost: 200 },
      { id: 'li6', description: 'Filter Replacement (annual)', quantity: 1, unitPrice: 320, cost: 160 },
      { id: 'li7', description: 'Emergency Call-out Coverage', quantity: 1, unitPrice: 600, cost: 0 },
    ],
    taxRate: 8.5, status: 'sent', validUntil: d(14), notes: 'Waiting on approval from property management.',
    createdAt: t(10), updatedAt: t(10), winProbability: 65,
  },
  {
    id: 'q3', customerId: 'c3', customerName: 'Linda Chen', title: 'Bathroom Plumbing Remodel',
    description: 'Complete plumbing rough-in for master bathroom renovation.',
    lineItems: [
      { id: 'li8', description: 'Plumbing Rough-in Labor', quantity: 16, unitPrice: 75, cost: 45 },
      { id: 'li9', description: 'PEX Piping & Fittings', quantity: 1, unitPrice: 280, cost: 120 },
      { id: 'li10', description: 'Shower Valve & Trim', quantity: 1, unitPrice: 420, cost: 210 },
      { id: 'li11', description: 'Toilet Installation', quantity: 1, unitPrice: 350, cost: 180 },
    ],
    taxRate: 8.5, status: 'draft', validUntil: d(30), notes: 'Drafting for review. Customer wants it done by end of month.',
    createdAt: t(3), updatedAt: t(3), winProbability: 75,
  },
  {
    id: 'q4', customerId: 'c5', customerName: 'Amanda Foster', title: 'Restaurant Grease Trap Install',
    description: 'Install new 50-gallon grease trap for commercial kitchen.',
    lineItems: [
      { id: 'li12', description: '50-Gal Grease Trap Unit', quantity: 1, unitPrice: 1200, cost: 680 },
      { id: 'li13', description: 'Installation Labor', quantity: 6, unitPrice: 85, cost: 50 },
      { id: 'li14', description: 'Drain Line Modification', quantity: 1, unitPrice: 400, cost: 150 },
    ],
    taxRate: 8.5, status: 'declined', validUntil: d(-10), notes: 'Customer felt price was too high. May revisit.',
    createdAt: t(30), updatedAt: t(25),
  },
];

export const seedJobs: Job[] = [
  {
    id: 'j1', quoteId: 'q1', customerId: 'c1', customerName: 'Sarah Mitchell', title: 'AC Unit Replacement',
    description: 'Replace aging 3-ton central AC unit.', status: 'completed',
    estimatedRevenue: 3859, actualRevenue: 3859, estimatedCost: 2325, actualCost: 2180,
    expenses: [
      { id: 'e1', description: 'Carrier AC Unit', amount: 1600, category: 'materials', date: d(10) },
      { id: 'e2', description: 'Refrigerant R-410A', amount: 180, category: 'materials', date: d(10) },
      { id: 'e3', description: 'Disposal fee', amount: 50, category: 'other', date: d(10) },
      { id: 'e4', description: 'Mike labor (8hrs @ $45)', amount: 350, category: 'labor', date: d(10) },
    ],
    startDate: d(10), completedDate: d(10), notes: 'Install went smoothly. Customer very happy.',
    assignedTo: 't1', createdAt: t(15), updatedAt: t(10),
  },
  {
    id: 'j2', customerId: 'c4', customerName: 'Robert Williams', title: 'Furnace Annual Maintenance',
    description: 'Annual furnace inspection and tune-up.', status: 'completed',
    estimatedRevenue: 250, actualRevenue: 250, estimatedCost: 80, actualCost: 65,
    expenses: [
      { id: 'e5', description: 'Air filter & supplies', amount: 35, category: 'materials', date: d(5) },
      { id: 'e6', description: 'Jess labor (1hr @ $38)', amount: 30, category: 'labor', date: d(5) },
    ],
    startDate: d(5), completedDate: d(5), notes: 'Unit in good shape. Replaced filter, cleaned burners.',
    assignedTo: 't2', createdAt: t(8), updatedAt: t(5),
  },
  {
    id: 'j3', customerId: 'c6', customerName: 'David Kim', title: 'Water Heater Install',
    description: 'Install new 50-gallon gas water heater.', status: 'in_progress',
    estimatedRevenue: 1800, actualRevenue: 0, estimatedCost: 900, actualCost: 650,
    expenses: [
      { id: 'e7', description: 'A.O. Smith 50gal Water Heater', amount: 580, category: 'materials', date: d(1) },
      { id: 'e8', description: 'Gas flex line & fittings', amount: 70, category: 'materials', date: d(1) },
    ],
    startDate: d(1), completedDate: '', notes: 'Waiting for gas inspection before completing connection.',
    assignedTo: 't3', createdAt: t(5), updatedAt: t(1),
  },
  {
    id: 'j4', customerId: 'c2', customerName: 'James Rodriguez', title: 'Rooftop Unit #2 Repair',
    description: 'Replace compressor on RTU-2 at Rodriguez Complex.', status: 'scheduled',
    estimatedRevenue: 3200, actualRevenue: 0, estimatedCost: 1800, actualCost: 0,
    expenses: [],
    startDate: d(-2), completedDate: '', notes: 'Parts ordered. ETA next Tuesday.',
    assignedTo: 't1', createdAt: t(3), updatedAt: t(3),
  },
  {
    id: 'j5', customerId: 'c7', customerName: 'Patricia Moore', title: 'Kitchen Faucet Replacement',
    description: 'Replace leaky kitchen faucet with new Moen unit.', status: 'scheduled',
    estimatedRevenue: 380, actualRevenue: 0, estimatedCost: 160, actualCost: 0,
    expenses: [],
    startDate: d(-3), completedDate: '', notes: 'Customer purchased faucet. Just need installation.',
    assignedTo: 't3', createdAt: t(2), updatedAt: t(2),
  },
];

export const seedInvoices: Invoice[] = [
  {
    id: 'inv1', jobId: 'j1', customerId: 'c1', customerName: 'Sarah Mitchell', title: 'AC Unit Replacement',
    lineItems: [
      { id: 'ili1', description: '3-Ton Carrier AC Unit', quantity: 1, unitPrice: 2800 },
      { id: 'ili2', description: 'Installation Labor (8hrs)', quantity: 8, unitPrice: 75 },
      { id: 'ili3', description: 'Refrigerant & Supplies', quantity: 1, unitPrice: 350 },
      { id: 'ili4', description: 'Old Unit Disposal', quantity: 1, unitPrice: 150 },
    ],
    taxRate: 8.5, subtotal: 4100, tax: 348.50, total: 4448.50,
    payments: [
      { id: 'p1', amount: 4448.50, method: 'card', date: d(9), notes: 'Paid in full' },
    ],
    amountPaid: 4448.50, amountDue: 0,
    status: 'paid', dueDate: d(5), issueDate: d(12), notes: 'Thank you for your business!',
    createdAt: t(12), updatedAt: t(9),
  },
  {
    id: 'inv2', jobId: 'j2', customerId: 'c4', customerName: 'Robert Williams', title: 'Furnace Annual Maintenance',
    lineItems: [
      { id: 'ili5', description: 'Annual Furnace Inspection & Tune-up', quantity: 1, unitPrice: 250 },
    ],
    taxRate: 8.5, subtotal: 250, tax: 21.25, total: 271.25,
    payments: [],
    amountPaid: 0, amountDue: 271.25,
    status: 'overdue', dueDate: d(-2), issueDate: d(10), notes: 'Net 15 terms.',
    createdAt: t(10), updatedAt: t(5),
  },
  {
    id: 'inv3', customerId: 'c2', customerName: 'James Rodriguez', title: 'Rooftop Unit Diagnostic',
    lineItems: [
      { id: 'ili6', description: 'Diagnostic Service Call', quantity: 1, unitPrice: 175 },
      { id: 'ili7', description: 'Refrigerant Leak Detection', quantity: 1, unitPrice: 125 },
    ],
    taxRate: 8.5, subtotal: 300, tax: 25.50, total: 325.50,
    payments: [
      { id: 'p2', amount: 200, method: 'transfer', date: d(4), notes: 'Partial payment' },
    ],
    amountPaid: 200, amountDue: 125.50,
    status: 'partial', dueDate: d(7), issueDate: d(8), notes: 'Remaining balance due on completion.',
    createdAt: t(8), updatedAt: t(4),
  },
];

export const seedAppointments: Appointment[] = [
  {
    id: 'a1', customerId: 'c6', customerName: 'David Kim', jobId: 'j3', title: 'Water Heater Install - Day 2',
    description: 'Complete gas connection after inspection passes.', date: d(-1), startTime: '09:00', endTime: '12:00',
    status: 'scheduled', assignedTo: 't3', notes: 'Gas inspection scheduled for morning.', createdAt: t(3),
  },
  {
    id: 'a2', customerId: 'c2', customerName: 'James Rodriguez', jobId: 'j4', title: 'Rooftop Unit Compressor Replacement',
    description: 'Replace compressor on RTU-2.', date: d(-2), startTime: '07:00', endTime: '15:00',
    status: 'scheduled', assignedTo: 't1', notes: 'Bring crane for rooftop access.', createdAt: t(3),
  },
  {
    id: 'a3', customerId: 'c7', customerName: 'Patricia Moore', jobId: 'j5', title: 'Kitchen Faucet Install',
    description: 'Install new Moen kitchen faucet.', date: d(-3), startTime: '13:00', endTime: '15:00',
    status: 'scheduled', assignedTo: 't3', notes: '', createdAt: t(2),
  },
  {
    id: 'a4', customerId: 'c1', customerName: 'Sarah Mitchell', title: 'AC Follow-up Check',
    description: '30-day follow-up on new AC install.', date: d(-20), startTime: '10:00', endTime: '10:30',
    status: 'scheduled', assignedTo: 't2', notes: 'Quick check-in, verify performance.', createdAt: t(5),
  },
];

export const seedSubscriptions: Subscription[] = [
  {
    id: 's1', customerId: 'c4', customerName: 'Robert Williams', title: 'Annual HVAC Maintenance Plan',
    description: 'Bi-annual furnace & AC tune-ups, priority scheduling, 10% off repairs.', amount: 29,
    frequency: 'monthly', status: 'active', startDate: d(90), nextBillingDate: d(-3), notes: 'Auto-renews.', createdAt: t(90),
  },
  {
    id: 's2', customerId: 'c2', customerName: 'James Rodriguez', title: 'Commercial Maintenance Contract',
    description: 'Quarterly inspections for 4 rooftop units.', amount: 450,
    frequency: 'quarterly', status: 'active', startDate: d(60), nextBillingDate: d(30), notes: 'Contract renews annually.', createdAt: t(60),
  },
];

export const seedInventory: InventoryItem[] = [
  { id: 'i1', name: 'Air Filter 20x25x1', sku: 'AF-2025', category: 'Filters', unit: 'each', quantity: 24, costPerUnit: 8, pricePerUnit: 25, lowStockThreshold: 10, supplier: 'HVAC Supply Co', notes: '', createdAt: t(60), updatedAt: t(5) },
  { id: 'i2', name: 'R-410A Refrigerant (25lb)', sku: 'REF-410A', category: 'Refrigerant', unit: 'tank', quantity: 3, costPerUnit: 120, pricePerUnit: 250, lowStockThreshold: 2, supplier: 'CoolGas Distributors', notes: '', createdAt: t(60), updatedAt: t(10) },
  { id: 'i3', name: 'PEX Tubing 1/2" (100ft)', sku: 'PEX-12-100', category: 'Plumbing', unit: 'roll', quantity: 5, costPerUnit: 35, pricePerUnit: 65, lowStockThreshold: 3, supplier: 'PlumbPro Supply', notes: '', createdAt: t(45), updatedAt: t(3) },
  { id: 'i4', name: 'Copper Fittings Assortment', sku: 'CU-FIT', category: 'Plumbing', unit: 'kit', quantity: 2, costPerUnit: 45, pricePerUnit: 85, lowStockThreshold: 2, supplier: 'PlumbPro Supply', notes: '', createdAt: t(45), updatedAt: t(15) },
  { id: 'i5', name: 'Gas Flex Line 24"', sku: 'GFL-24', category: 'Gas', unit: 'each', quantity: 8, costPerUnit: 18, pricePerUnit: 45, lowStockThreshold: 4, supplier: 'HVAC Supply Co', notes: '', createdAt: t(30), updatedAt: t(1) },
  { id: 'i6', name: 'Thermostat Wire 18/5 (250ft)', sku: 'TW-185', category: 'Electrical', unit: 'roll', quantity: 1, costPerUnit: 40, pricePerUnit: 75, lowStockThreshold: 2, supplier: 'HVAC Supply Co', notes: 'Running low — order more.', createdAt: t(60), updatedAt: t(10) },
];

export const seedInventoryTransactions: InventoryTransaction[] = [
  { id: 'it1', itemId: 'i1', itemName: 'Air Filter 20x25x1', type: 'purchase', quantity: 36, notes: 'Monthly restock', date: d(30) },
  { id: 'it2', itemId: 'i1', itemName: 'Air Filter 20x25x1', type: 'usage', quantity: -12, jobId: 'j2', notes: 'Used for Williams maintenance', date: d(5) },
  { id: 'it3', itemId: 'i2', itemName: 'R-410A Refrigerant (25lb)', type: 'usage', quantity: -1, jobId: 'j1', notes: 'AC install for Mitchell', date: d(10) },
  { id: 'it4', itemId: 'i5', itemName: 'Gas Flex Line 24"', type: 'usage', quantity: -1, jobId: 'j3', notes: 'Water heater install', date: d(1) },
];

export const seedMembershipPlans: MembershipPlan[] = [
  {
    id: 'mp1', name: 'Home Comfort Plan', description: 'Bi-annual HVAC tune-ups, priority scheduling, 10% off all repairs, no diagnostic fee.',
    price: 29, frequency: 'monthly', includedServices: ['Spring AC tune-up', 'Fall furnace tune-up', 'Priority scheduling', '10% repair discount', 'No diagnostic fee'],
    status: 'active', createdAt: t(120),
  },
  {
    id: 'mp2', name: 'Premium Care Plan', description: 'Everything in Home Comfort plus annual plumbing inspection and water heater flush.',
    price: 49, frequency: 'monthly', includedServices: ['All Home Comfort services', 'Annual plumbing inspection', 'Water heater flush', 'Free emergency calls', '15% repair discount'],
    status: 'active', createdAt: t(120),
  },
];

export const seedCustomerMemberships: CustomerMembership[] = [
  {
    id: 'cm1', customerId: 'c4', customerName: 'Robert Williams', planId: 'mp1', planName: 'Home Comfort Plan',
    price: 29, frequency: 'monthly', startDate: d(90), nextBillingDate: d(-3), status: 'active', autoRenew: true,
    notes: '', createdAt: t(90),
  },
];

export const seedWarranties: Warranty[] = [
  {
    id: 'w1', jobId: 'j1', jobTitle: 'AC Unit Replacement', customerId: 'c1', customerName: 'Sarah Mitchell',
    type: 'both', description: 'Carrier AC unit — 5yr parts, 2yr labor warranty.', startDate: d(10),
    endDate: d(-1815), status: 'active', notes: 'Keep receipt for warranty claims.', createdAt: t(10),
  },
];

export const seedSettings = {
  name: 'Springfield Climate Solutions',
  email: 'info@springfieldclimate.com',
  phone: '(555) 900-1234',
  address: '500 Industrial Pkwy, Springfield, IL 62704',
  taxRate: 8.5,
  currency: 'USD',
  industry: 'hvac',
  onboardingComplete: true,
  brandColor: '#1e40af',
  brandSecondaryColor: '#10b981',
  logoDataUrl: '',
  tagline: 'Keeping Springfield Comfortable Since 2019',
  stripePublicKey: '',
  quickbooksConnected: false,
  plan: 'free' as const,
  language: 'en',
};
