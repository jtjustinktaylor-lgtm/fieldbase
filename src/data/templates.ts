import { IndustryTemplate } from '../types';

export const industryTemplates: IndustryTemplate[] = [
  // === CONTRACTOR & TRADES ===
  {
    id: 'contractor', name: 'General Contractor', icon: '🏗️',
    quoteLineItemDefaults: [
      { description: 'Labor (per hour)', unitPrice: 75, cost: 45 },
      { description: 'Materials', unitPrice: 200, cost: 150 },
      { description: 'Permit fees', unitPrice: 150, cost: 150 },
      { description: 'Subcontractor', unitPrice: 500, cost: 450 },
      { description: 'Project management fee', unitPrice: 300, cost: 0 },
    ],
    expenseCategories: ['materials', 'labor', 'equipment', 'permits', 'subcontractor', 'travel', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Bids', customers: 'Clients' },
  },
  {
    id: 'plumber', name: 'Plumber / HVAC', icon: '🔧',
    quoteLineItemDefaults: [
      { description: 'Service call', unitPrice: 95, cost: 30 },
      { description: 'Labor (per hour)', unitPrice: 85, cost: 50 },
      { description: 'Parts & materials', unitPrice: 100, cost: 65 },
      { description: 'Emergency / after-hours', unitPrice: 175, cost: 60 },
      { description: 'Drain cleaning', unitPrice: 250, cost: 40 },
    ],
    expenseCategories: ['materials', 'labor', 'equipment', 'vehicle', 'travel', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Customers' },
  },
  {
    id: 'electrician', name: 'Electrician', icon: '⚡',
    quoteLineItemDefaults: [
      { description: 'Service call / diagnostic', unitPrice: 110, cost: 35 },
      { description: 'Labor (per hour)', unitPrice: 95, cost: 55 },
      { description: 'Wiring & materials', unitPrice: 150, cost: 90 },
      { description: 'Panel upgrade', unitPrice: 1800, cost: 900 },
    ],
    expenseCategories: ['materials', 'labor', 'equipment', 'permits', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Wiring' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Customers' },
  },
  {
    id: 'painter', name: 'Painter', icon: '🎨',
    quoteLineItemDefaults: [
      { description: 'Interior painting (per room)', unitPrice: 400, cost: 120 },
      { description: 'Exterior painting (per sq ft)', unitPrice: 3.50, cost: 1.20 },
      { description: 'Cabinet painting', unitPrice: 2500, cost: 800 },
      { description: 'Prep & patching', unitPrice: 75, cost: 25 },
    ],
    expenseCategories: ['paint', 'materials', 'labor', 'equipment', 'prep supplies', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Painting' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'roofer', name: 'Roofer', icon: '🏠',
    quoteLineItemDefaults: [
      { description: 'Roof inspection', unitPrice: 250, cost: 50 },
      { description: 'Shingle repair (per sq)', unitPrice: 350, cost: 180 },
      { description: 'Full replacement (per sq)', unitPrice: 450, cost: 250 },
      { description: 'Gutter installation', unitPrice: 8, cost: 4 },
    ],
    expenseCategories: ['shingles', 'materials', 'labor', 'dumpster', 'permits', 'equipment', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Roof' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Bids', customers: 'Homeowners' },
  },
  {
    id: 'landscaping', name: 'Landscaping', icon: '🌿',
    quoteLineItemDefaults: [
      { description: 'Lawn mowing', unitPrice: 50, cost: 10 },
      { description: 'Mulch installation', unitPrice: 300, cost: 120 },
      { description: 'Tree trimming', unitPrice: 500, cost: 100 },
      { description: 'Landscape design', unitPrice: 800, cost: 100 },
    ],
    expenseCategories: ['plants', 'materials', 'labor', 'equipment', 'fuel', 'disposal', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'carpenter', name: 'Carpenter / Woodworker', icon: '🪚',
    quoteLineItemDefaults: [
      { description: 'Custom cabinetry', unitPrice: 5000, cost: 2000 },
      { description: 'Furniture build', unitPrice: 1200, cost: 400 },
      { description: 'Trim & molding (per ft)', unitPrice: 8, cost: 3 },
      { description: 'Labor (per hour)', unitPrice: 65, cost: 35 },
    ],
    expenseCategories: ['lumber', 'hardware', 'labor', 'finishes', 'tools', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Queued' }, { value: 'in_progress', label: 'Building' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'fencing', name: 'Fencing', icon: '🪵',
    quoteLineItemDefaults: [
      { description: 'Wood fence (per linear ft)', unitPrice: 25, cost: 12 },
      { description: 'Chain link (per linear ft)', unitPrice: 18, cost: 8 },
      { description: 'Vinyl fence (per linear ft)', unitPrice: 35, cost: 18 },
      { description: 'Gate installation', unitPrice: 350, cost: 150 },
    ],
    expenseCategories: ['materials', 'labor', 'concrete', 'hardware', 'equipment', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'concrete', name: 'Concrete / Masonry', icon: '🧱',
    quoteLineItemDefaults: [
      { description: 'Concrete patio (per sq ft)', unitPrice: 8, cost: 4 },
      { description: 'Driveway (per sq ft)', unitPrice: 10, cost: 5 },
      { description: 'Foundation work', unitPrice: 5000, cost: 2500 },
      { description: 'Brick repair (per hour)', unitPrice: 70, cost: 35 },
    ],
    expenseCategories: ['concrete', 'materials', 'labor', 'equipment', 'permits', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Pouring' },
      { value: 'completed', label: 'Cured & Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Bids', customers: 'Clients' },
  },
  {
    id: 'locksmith', name: 'Locksmith', icon: '🔐',
    quoteLineItemDefaults: [
      { description: 'Lockout service', unitPrice: 95, cost: 15 },
      { description: 'Lock rekeying', unitPrice: 75, cost: 20 },
      { description: 'Deadbolt installation', unitPrice: 150, cost: 50 },
      { description: 'Smart lock install', unitPrice: 250, cost: 120 },
    ],
    expenseCategories: ['locks', 'keys', 'hardware', 'vehicle', 'tools', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Customers' },
  },
  {
    id: 'pest_control', name: 'Pest Control', icon: '🐛',
    quoteLineItemDefaults: [
      { description: 'Initial inspection', unitPrice: 150, cost: 25 },
      { description: 'Standard treatment', unitPrice: 250, cost: 60 },
      { description: 'Quarterly maintenance', unitPrice: 125, cost: 30 },
      { description: 'Termite treatment', unitPrice: 1200, cost: 400 },
    ],
    expenseCategories: ['chemicals', 'equipment', 'labor', 'vehicle', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Treating' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Treatments', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'pool_service', name: 'Pool Service', icon: '🏊',
    quoteLineItemDefaults: [
      { description: 'Weekly maintenance', unitPrice: 125, cost: 25 },
      { description: 'Opening / closing', unitPrice: 300, cost: 80 },
      { description: 'Equipment repair', unitPrice: 400, cost: 150 },
      { description: 'Acid wash', unitPrice: 500, cost: 100 },
    ],
    expenseCategories: ['chemicals', 'equipment', 'parts', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Servicing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Visits', quotes: 'Quotes', customers: 'Pool Owners' },
  },
  {
    id: 'tree_service', name: 'Tree Service', icon: '🌳',
    quoteLineItemDefaults: [
      { description: 'Tree removal', unitPrice: 1200, cost: 400 },
      { description: 'Stump grinding', unitPrice: 300, cost: 80 },
      { description: 'Trimming / pruning', unitPrice: 500, cost: 150 },
      { description: 'Emergency removal', unitPrice: 2000, cost: 700 },
    ],
    expenseCategories: ['equipment', 'labor', 'disposal', 'fuel', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'appliance_repair', name: 'Appliance Repair', icon: '🔌',
    quoteLineItemDefaults: [
      { description: 'Diagnostic fee', unitPrice: 89, cost: 15 },
      { description: 'Labor (per hour)', unitPrice: 95, cost: 45 },
      { description: 'Parts', unitPrice: 150, cost: 80 },
      { description: 'Same-day surcharge', unitPrice: 50, cost: 0 },
    ],
    expenseCategories: ['parts', 'labor', 'vehicle', 'tools', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Repairing' },
      { value: 'completed', label: 'Fixed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Customers' },
  },
  {
    id: 'garage_door', name: 'Garage Door', icon: '🚗',
    quoteLineItemDefaults: [
      { description: 'Spring replacement', unitPrice: 350, cost: 80 },
      { description: 'Opener installation', unitPrice: 450, cost: 200 },
      { description: 'Door replacement', unitPrice: 1200, cost: 600 },
      { description: 'Service call', unitPrice: 85, cost: 20 },
    ],
    expenseCategories: ['parts', 'labor', 'vehicle', 'tools', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Homeowners' },
  },
  {
    id: 'auto', name: 'Auto Shop', icon: '🔧',
    quoteLineItemDefaults: [
      { description: 'Diagnostic', unitPrice: 120, cost: 15 },
      { description: 'Labor (per hour)', unitPrice: 110, cost: 55 },
      { description: 'Parts', unitPrice: 200, cost: 120 },
      { description: 'Oil change', unitPrice: 65, cost: 25 },
    ],
    expenseCategories: ['parts', 'labor', 'tools', 'fluids', 'equipment', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Lift' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Work Orders', quotes: 'Estimates', customers: 'Vehicle Owners' },
  },
  {
    id: 'cleaning', name: 'Cleaning Service', icon: '🧹',
    quoteLineItemDefaults: [
      { description: 'Standard cleaning', unitPrice: 150, cost: 30 },
      { description: 'Deep clean', unitPrice: 300, cost: 60 },
      { description: 'Move-in/out clean', unitPrice: 400, cost: 80 },
      { description: 'Post-construction clean', unitPrice: 600, cost: 150 },
    ],
    expenseCategories: ['supplies', 'labor', 'vehicle', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Cleaning' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Cleanings', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'moving', name: 'Moving / Delivery', icon: '📦',
    quoteLineItemDefaults: [
      { description: 'Local move (2 movers)', unitPrice: 120, cost: 50 },
      { description: 'Packing services', unitPrice: 50, cost: 20 },
      { description: 'Furniture delivery', unitPrice: 150, cost: 40 },
      { description: 'Storage (per month)', unitPrice: 100, cost: 30 },
    ],
    expenseCategories: ['fuel', 'labor', 'truck', 'supplies', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Moving' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Moves', quotes: 'Estimates', customers: 'Clients' },
  },

  // === PROFESSIONAL SERVICES ===
  {
    id: 'consultant', name: 'Consultant / Freelancer', icon: '💼',
    quoteLineItemDefaults: [
      { description: 'Consulting (per hour)', unitPrice: 150, cost: 0 },
      { description: 'Project deliverable', unitPrice: 2000, cost: 0 },
      { description: 'Rush fee', unitPrice: 500, cost: 0 },
    ],
    expenseCategories: ['software', 'travel', 'contractor', 'equipment', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scoped' }, { value: 'in_progress', label: 'Active' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Dropped' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'it_support', name: 'IT / Tech Support', icon: '💻',
    quoteLineItemDefaults: [
      { description: 'Remote support (per hour)', unitPrice: 125, cost: 0 },
      { description: 'On-site visit', unitPrice: 175, cost: 30 },
      { description: 'Monthly retainer', unitPrice: 500, cost: 0 },
      { description: 'Network setup', unitPrice: 800, cost: 200 },
    ],
    expenseCategories: ['software', 'hardware', 'cloud services', 'travel', 'tools', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ticket Open' }, { value: 'in_progress', label: 'Working' },
      { value: 'completed', label: 'Resolved' }, { value: 'cancelled', label: 'Closed' },
    ],
    terminology: { jobs: 'Tickets', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'photographer', name: 'Photographer / Videographer', icon: '📸',
    quoteLineItemDefaults: [
      { description: 'Portrait session', unitPrice: 300, cost: 20 },
      { description: 'Wedding coverage (per hour)', unitPrice: 350, cost: 30 },
      { description: 'Commercial shoot', unitPrice: 1500, cost: 200 },
      { description: 'Photo editing (per hour)', unitPrice: 75, cost: 0 },
    ],
    expenseCategories: ['equipment', 'software', 'travel', 'props', 'printing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Shooting' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'event_planner', name: 'Event Planner', icon: '🎉',
    quoteLineItemDefaults: [
      { description: 'Event coordination', unitPrice: 2500, cost: 500 },
      { description: 'Venue setup', unitPrice: 800, cost: 200 },
      { description: 'Vendor management', unitPrice: 500, cost: 0 },
      { description: 'Day-of coordination', unitPrice: 1200, cost: 300 },
    ],
    expenseCategories: ['venue', 'catering', 'decor', 'entertainment', 'staff', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Planning' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Events', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'tutoring', name: 'Tutoring / Education', icon: '📚',
    quoteLineItemDefaults: [
      { description: 'One-on-one session (per hour)', unitPrice: 65, cost: 0 },
      { description: 'Group session (per student)', unitPrice: 35, cost: 5 },
      { description: 'Test prep package', unitPrice: 500, cost: 0 },
      { description: 'Online session', unitPrice: 50, cost: 0 },
    ],
    expenseCategories: ['materials', 'software', 'marketing', 'travel', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Packages', customers: 'Students' },
  },

  // === BEAUTY & WELLNESS ===
  {
    id: 'salon', name: 'Salon / Spa', icon: '💇',
    quoteLineItemDefaults: [
      { description: 'Haircut & style', unitPrice: 65, cost: 5 },
      { description: 'Color treatment', unitPrice: 150, cost: 25 },
      { description: 'Manicure', unitPrice: 35, cost: 5 },
      { description: 'Facial', unitPrice: 90, cost: 15 },
    ],
    expenseCategories: ['products', 'rent', 'equipment', 'marketing', 'supplies', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Chair' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Service Menus', customers: 'Clients' },
  },
  {
    id: 'fitness', name: 'Fitness / Personal Trainer', icon: '💪',
    quoteLineItemDefaults: [
      { description: 'Personal training session', unitPrice: 80, cost: 0 },
      { description: 'Group class', unitPrice: 25, cost: 5 },
      { description: 'Monthly program', unitPrice: 300, cost: 0 },
      { description: 'Body composition assessment', unitPrice: 75, cost: 0 },
      { description: 'Online coaching (monthly)', unitPrice: 200, cost: 0 },
    ],
    expenseCategories: ['equipment', 'rent', 'marketing', 'insurance', 'supplements', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'pet_grooming', name: 'Pet Grooming / Dog Walking', icon: '🐾',
    quoteLineItemDefaults: [
      { description: 'Full groom (small dog)', unitPrice: 55, cost: 8 },
      { description: 'Full groom (large dog)', unitPrice: 85, cost: 12 },
      { description: 'Dog walking (30 min)', unitPrice: 25, cost: 0 },
      { description: 'Pet sitting (per day)', unitPrice: 60, cost: 5 },
    ],
    expenseCategories: ['supplies', 'grooming products', 'vehicle', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Grooming' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Service Menu', customers: 'Pet Parents' },
  },

  // === FOOD & CATERING ===
  {
    id: 'catering', name: 'Catering / Food Service', icon: '🍽️',
    quoteLineItemDefaults: [
      { description: 'Per person (buffet)', unitPrice: 35, cost: 12 },
      { description: 'Per person (plated)', unitPrice: 55, cost: 20 },
      { description: 'Bar service (per hour)', unitPrice: 200, cost: 80 },
      { description: 'Delivery & setup', unitPrice: 150, cost: 40 },
    ],
    expenseCategories: ['food', 'staff', 'equipment', 'rent', 'supplies', 'transport', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Prepping' },
      { value: 'completed', label: 'Served' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Events', quotes: 'Menus', customers: 'Clients' },
  },

  // === REAL ESTATE & PROPERTY ===
  {
    id: 'property_mgmt', name: 'Property Management', icon: '🏢',
    quoteLineItemDefaults: [
      { description: 'Tenant placement fee', unitPrice: 1500, cost: 200 },
      { description: 'Monthly management', unitPrice: 200, cost: 0 },
      { description: 'Maintenance call', unitPrice: 150, cost: 75 },
      { description: 'Inspection', unitPrice: 200, cost: 30 },
    ],
    expenseCategories: ['maintenance', 'advertising', 'legal', 'insurance', 'supplies', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Work Orders', quotes: 'Proposals', customers: 'Owners' },
  },
  {
    id: 'home_inspection', name: 'Home Inspector', icon: '🔍',
    quoteLineItemDefaults: [
      { description: 'Standard inspection', unitPrice: 400, cost: 30 },
      { description: 'Radon test', unitPrice: 150, cost: 25 },
      { description: 'Termite inspection', unitPrice: 100, cost: 15 },
      { description: 'Re-inspection', unitPrice: 200, cost: 20 },
    ],
    expenseCategories: ['equipment', 'insurance', 'vehicle', 'software', 'licensing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Inspecting' },
      { value: 'completed', label: 'Report Sent' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Inspections', quotes: 'Quotes', customers: 'Clients' },
  },

  {
    id: 'solar', name: 'Solar / Renewable Energy', icon: '☀️',
    quoteLineItemDefaults: [
      { description: 'Solar panel (per watt)', unitPrice: 3.00, cost: 1.80 },
      { description: 'Inverter installation', unitPrice: 2500, cost: 1500 },
      { description: 'System design & engineering', unitPrice: 1500, cost: 300 },
      { description: 'Permit & inspection', unitPrice: 500, cost: 500 },
      { description: 'Battery storage (per kWh)', unitPrice: 800, cost: 500 },
    ],
    expenseCategories: ['panels', 'inverters', 'mounting', 'wiring', 'permits', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Contracted' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Commissioned' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Proposals', customers: 'Homeowners' },
  },
  {
    id: 'restoration', name: 'Restoration / Remediation', icon: '🏗️',
    quoteLineItemDefaults: [
      { description: 'Water extraction & drying', unitPrice: 1200, cost: 300 },
      { description: 'Mold remediation (per sq ft)', unitPrice: 15, cost: 6 },
      { description: 'Structural repair', unitPrice: 3500, cost: 1500 },
      { description: 'Contents pack-out & storage', unitPrice: 800, cost: 200 },
      { description: 'Deodorization & sanitization', unitPrice: 500, cost: 120 },
    ],
    expenseCategories: ['equipment', 'materials', 'labor', 'disposal', 'subcontractor', 'insurance billing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Dispatched' }, { value: 'in_progress', label: 'Mitigating' },
      { value: 'completed', label: 'Restored' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Estimates', customers: 'Policyholders' },
  },
  {
    id: 'septic', name: 'Septic / Well Water', icon: '🔧',
    quoteLineItemDefaults: [
      { description: 'Septic pumping', unitPrice: 400, cost: 80 },
      { description: 'Septic inspection', unitPrice: 300, cost: 50 },
      { description: 'Drain field repair', unitPrice: 3500, cost: 1500 },
      { description: 'Well pump replacement', unitPrice: 2000, cost: 800 },
      { description: 'Water testing', unitPrice: 150, cost: 30 },
    ],
    expenseCategories: ['equipment', 'materials', 'labor', 'vehicle', 'permits', 'pumping', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Homeowners' },
  },
  {
    id: 'detailing', name: 'Mobile Auto Detailing', icon: '✨',
    quoteLineItemDefaults: [
      { description: 'Basic wash & wax', unitPrice: 75, cost: 12 },
      { description: 'Full interior detail', unitPrice: 200, cost: 30 },
      { description: 'Paint correction', unitPrice: 400, cost: 50 },
      { description: 'Ceramic coating', unitPrice: 1200, cost: 250 },
      { description: 'Headlight restoration', unitPrice: 100, cost: 15 },
    ],
    expenseCategories: ['products', 'supplies', 'equipment', 'vehicle', 'fuel', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Detailing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'therapy', name: 'Therapy / Counseling / Coaching', icon: '🧠',
    quoteLineItemDefaults: [
      { description: 'Individual session (50 min)', unitPrice: 150, cost: 0 },
      { description: 'Couples session (80 min)', unitPrice: 200, cost: 0 },
      { description: 'Group session (per person)', unitPrice: 50, cost: 0 },
      { description: 'Assessment / intake', unitPrice: 250, cost: 0 },
    ],
    expenseCategories: ['rent', 'software', 'continuing ed', 'insurance', 'marketing', 'supplies', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'security', name: 'Security / Alarm Systems', icon: '🛡️',
    quoteLineItemDefaults: [
      { description: 'Alarm panel installation', unitPrice: 800, cost: 300 },
      { description: 'Camera installation (per cam)', unitPrice: 250, cost: 100 },
      { description: 'Monthly monitoring', unitPrice: 45, cost: 8 },
      { description: 'Access control system', unitPrice: 2000, cost: 800 },
    ],
    expenseCategories: ['equipment', 'wiring', 'labor', 'vehicle', 'permits', 'software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Active' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'handyman', name: 'Handyman / Multi-Service', icon: '🔨',
    quoteLineItemDefaults: [
      { description: 'Service call', unitPrice: 75, cost: 15 },
      { description: 'Labor (per hour)', unitPrice: 65, cost: 30 },
      { description: 'Materials', unitPrice: 50, cost: 30 },
      { description: 'Flat-rate small job', unitPrice: 150, cost: 40 },
    ],
    expenseCategories: ['materials', 'labor', 'tools', 'vehicle', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Working' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Estimates', customers: 'Customers' },
  },
  {
    id: 'agriculture', name: 'Agriculture / Farm Services', icon: '🌾',
    quoteLineItemDefaults: [
      { description: 'Fencing (per linear ft)', unitPrice: 8, cost: 4 },
      { description: 'Land clearing (per acre)', unitPrice: 2500, cost: 1000 },
      { description: 'Equipment repair (per hour)', unitPrice: 95, cost: 45 },
      { description: 'Irrigation installation', unitPrice: 3000, cost: 1200 },
    ],
    expenseCategories: ['materials', 'fuel', 'equipment', 'labor', 'parts', 'seeds', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Working' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Farmers' },
  },
  {
    id: 'fleet', name: 'Fleet / Commercial Vehicle', icon: '🚛',
    quoteLineItemDefaults: [
      { description: 'PM service (per vehicle)', unitPrice: 250, cost: 80 },
      { description: 'Brake job', unitPrice: 600, cost: 200 },
      { description: 'Engine diagnostic', unitPrice: 200, cost: 30 },
      { description: 'DOT inspection', unitPrice: 150, cost: 20 },
    ],
    expenseCategories: ['parts', 'fluids', 'labor', 'tools', 'tires', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Lift' },
      { value: 'completed', label: 'Released' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Work Orders', quotes: 'Estimates', customers: 'Fleet Managers' },
  },
  {
    id: 'pressure_washing', name: 'Pressure Washing', icon: '💦',
    quoteLineItemDefaults: [
      { description: 'House wash', unitPrice: 350, cost: 40 },
      { description: 'Driveway (per sq ft)', unitPrice: 0.25, cost: 0.05 },
      { description: 'Deck / patio', unitPrice: 300, cost: 35 },
      { description: 'Commercial (per sq ft)', unitPrice: 0.15, cost: 0.03 },
    ],
    expenseCategories: ['chemicals', 'equipment', 'fuel', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Washing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'window_cleaning', name: 'Window Cleaning', icon: '🪟',
    quoteLineItemDefaults: [
      { description: 'Interior & exterior (per window)', unitPrice: 8, cost: 1.50 },
      { description: 'Screen cleaning', unitPrice: 3, cost: 0.50 },
      { description: 'Hard water removal', unitPrice: 15, cost: 3 },
      { description: 'Gutter cleaning', unitPrice: 200, cost: 30 },
    ],
    expenseCategories: ['supplies', 'equipment', 'labor', 'vehicle', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Cleaning' },
      { value: 'completed', label: 'Sparkling' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'personal_chef', name: 'Personal Chef / Meal Prep', icon: '👨‍🍳',
    quoteLineItemDefaults: [
      { description: 'Meal prep session (5 meals)', unitPrice: 350, cost: 100 },
      { description: 'Dinner party (per guest)', unitPrice: 75, cost: 25 },
      { description: 'Weekly meal plan', unitPrice: 500, cost: 150 },
      { description: 'Grocery shopping', unitPrice: 50, cost: 0 },
    ],
    expenseCategories: ['ingredients', 'packaging', 'fuel', 'equipment', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Cooking' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Bookings', quotes: 'Menus', customers: 'Clients' },
  },
  {
    id: 'nutrition', name: 'Nutritionist / Dietitian', icon: '🥗',
    quoteLineItemDefaults: [
      { description: 'Initial consultation', unitPrice: 200, cost: 0 },
      { description: 'Follow-up session', unitPrice: 120, cost: 0 },
      { description: 'Meal plan creation', unitPrice: 150, cost: 0 },
      { description: 'Package (4 sessions)', unitPrice: 450, cost: 0 },
    ],
    expenseCategories: ['rent', 'software', 'continuing ed', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'wellness', name: 'Massage / Wellness', icon: '💆',
    quoteLineItemDefaults: [
      { description: 'Swedish massage (60 min)', unitPrice: 90, cost: 5 },
      { description: 'Deep tissue (60 min)', unitPrice: 110, cost: 5 },
      { description: 'Hot stone (90 min)', unitPrice: 140, cost: 10 },
      { description: 'Cupping session', unitPrice: 80, cost: 3 },
    ],
    expenseCategories: ['supplies', 'rent', 'linens', 'oils', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Service Menu', customers: 'Clients' },
  },
  {
    id: 'mobile_mechanic', name: 'Mobile Mechanic', icon: '🔧',
    quoteLineItemDefaults: [
      { description: 'Diagnostic', unitPrice: 100, cost: 10 },
      { description: 'Brake pad replacement', unitPrice: 350, cost: 80 },
      { description: 'Oil change', unitPrice: 60, cost: 25 },
      { description: 'Battery replacement', unitPrice: 200, cost: 100 },
    ],
    expenseCategories: ['parts', 'fluids', 'tools', 'fuel', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Fixed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Estimates', customers: 'Clients' },
  },
  {
    id: 'deck_patio', name: 'Deck / Patio Builder', icon: '🪵',
    quoteLineItemDefaults: [
      { description: 'Composite deck (per sq ft)', unitPrice: 35, cost: 18 },
      { description: 'Wood deck (per sq ft)', unitPrice: 25, cost: 12 },
      { description: 'Paver patio (per sq ft)', unitPrice: 15, cost: 7 },
      { description: 'Pergola / cover', unitPrice: 4000, cost: 1800 },
    ],
    expenseCategories: ['materials', 'hardware', 'labor', 'concrete', 'permits', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Building' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Bids', customers: 'Homeowners' },
  },
  {
    id: 'demolition', name: 'Demolition / Junk Removal', icon: '🏗️',
    quoteLineItemDefaults: [
      { description: 'Full truck load', unitPrice: 500, cost: 120 },
      { description: 'Half truck load', unitPrice: 300, cost: 70 },
      { description: 'Appliance removal', unitPrice: 75, cost: 15 },
      { description: 'Demolition (per sq ft)', unitPrice: 5, cost: 2 },
    ],
    expenseCategories: ['dumpster', 'fuel', 'labor', 'disposal fees', 'equipment', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Hauling' },
      { value: 'completed', label: 'Cleared' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Pickups', quotes: 'Quotes', customers: 'Clients' },
  },

  // === HEALTHCARE ===
  {
    id: 'medical_practice', name: 'Medical / Dental Practice', icon: '🏥',
    quoteLineItemDefaults: [
      { description: 'Office visit', unitPrice: 150, cost: 30 },
      { description: 'Follow-up visit', unitPrice: 100, cost: 20 },
      { description: 'Procedure', unitPrice: 500, cost: 100 },
      { description: 'Lab work', unitPrice: 200, cost: 80 },
    ],
    expenseCategories: ['medical supplies', 'lab', 'software', 'rent', 'insurance', 'staff', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Treatment Plans', customers: 'Patients' },
  },
  {
    id: 'dental', name: 'Dental Practice', icon: '🦷',
    quoteLineItemDefaults: [
      { description: 'Cleaning & exam', unitPrice: 200, cost: 30 },
      { description: 'Filling', unitPrice: 250, cost: 40 },
      { description: 'Crown', unitPrice: 1200, cost: 300 },
      { description: 'Teeth whitening', unitPrice: 400, cost: 60 },
    ],
    expenseCategories: ['dental supplies', 'lab fees', 'equipment', 'rent', 'insurance', 'staff', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Chair' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Treatment Plans', customers: 'Patients' },
  },
  {
    id: 'veterinary', name: 'Veterinary Clinic', icon: '🐕',
    quoteLineItemDefaults: [
      { description: 'Office visit', unitPrice: 85, cost: 15 },
      { description: 'Vaccination', unitPrice: 45, cost: 12 },
      { description: 'Spay/neuter', unitPrice: 400, cost: 80 },
      { description: 'Dental cleaning', unitPrice: 350, cost: 70 },
    ],
    expenseCategories: ['medications', 'medical supplies', 'lab', 'food', 'equipment', 'rent', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Exam' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Treatment Plans', customers: 'Pet Owners' },
  },
  {
    id: 'chiropractic', name: 'Chiropractic / Physiotherapy', icon: '🦴',
    quoteLineItemDefaults: [
      { description: 'Initial assessment', unitPrice: 120, cost: 15 },
      { description: 'Adjustment session', unitPrice: 75, cost: 10 },
      { description: 'Physiotherapy (per session)', unitPrice: 90, cost: 12 },
      { description: '10-visit package', unitPrice: 650, cost: 100 },
    ],
    expenseCategories: ['equipment', 'supplies', 'rent', 'insurance', 'marketing', 'software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Treatment Plans', customers: 'Patients' },
  },
  {
    id: 'home_health', name: 'Home Health / Caregiving', icon: '🏠',
    quoteLineItemDefaults: [
      { description: 'Hourly caregiver visit', unitPrice: 35, cost: 22 },
      { description: 'Overnight care (12 hrs)', unitPrice: 300, cost: 200 },
      { description: 'Live-in care (per day)', unitPrice: 350, cost: 240 },
      { description: 'Companionship visit', unitPrice: 30, cost: 18 },
    ],
    expenseCategories: ['caregiver wages', 'supplies', 'training', 'insurance', 'marketing', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Shift' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Visits', quotes: 'Care Plans', customers: 'Clients' },
  },
  {
    id: 'optometry', name: 'Optometry / Eyewear', icon: '👓',
    quoteLineItemDefaults: [
      { description: 'Eye exam', unitPrice: 150, cost: 20 },
      { description: 'Contact lens fitting', unitPrice: 100, cost: 15 },
      { description: 'Single vision lenses', unitPrice: 200, cost: 60 },
      { description: 'Progressive lenses', unitPrice: 450, cost: 150 },
    ],
    expenseCategories: ['frames', 'lenses', 'contacts', 'equipment', 'lab fees', 'rent', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Exam' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Prescriptions', customers: 'Patients' },
  },

  // === LEGAL & FINANCE ===
  {
    id: 'law_firm', name: 'Law Firm / Legal Services', icon: '⚖️',
    quoteLineItemDefaults: [
      { description: 'Consultation (per hour)', unitPrice: 300, cost: 0 },
      { description: 'Document preparation', unitPrice: 500, cost: 0 },
      { description: 'Court appearance', unitPrice: 1500, cost: 0 },
      { description: 'Retainer (monthly)', unitPrice: 2500, cost: 0 },
    ],
    expenseCategories: ['filing fees', 'research', 'software', 'rent', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Active' },
      { value: 'completed', label: 'Resolved' }, { value: 'cancelled', label: 'Closed' },
    ],
    terminology: { jobs: 'Cases', quotes: 'Engagement Letters', customers: 'Clients' },
  },
  {
    id: 'accounting', name: 'Accounting / Bookkeeping', icon: '📊',
    quoteLineItemDefaults: [
      { description: 'Tax return (personal)', unitPrice: 350, cost: 0 },
      { description: 'Tax return (business)', unitPrice: 1200, cost: 0 },
      { description: 'Monthly bookkeeping', unitPrice: 500, cost: 0 },
      { description: 'Payroll processing', unitPrice: 150, cost: 20 },
    ],
    expenseCategories: ['software', 'continuing ed', 'insurance', 'marketing', 'office supplies', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Queued' }, { value: 'in_progress', label: 'Preparing' },
      { value: 'completed', label: 'Filed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Engagements', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'financial_advisor', name: 'Financial Advisor / Planner', icon: '📈',
    quoteLineItemDefaults: [
      { description: 'Financial plan', unitPrice: 2000, cost: 0 },
      { description: 'Quarterly review', unitPrice: 250, cost: 0 },
      { description: 'Retirement planning', unitPrice: 1500, cost: 0 },
      { description: 'Annual retainer', unitPrice: 4000, cost: 0 },
    ],
    expenseCategories: ['software', 'licensing', 'marketing', 'continuing ed', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Review' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Reviews', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'insurance_agency', name: 'Insurance Agency', icon: '🛡️',
    quoteLineItemDefaults: [
      { description: 'Auto policy', unitPrice: 1200, cost: 0 },
      { description: 'Homeowners policy', unitPrice: 1500, cost: 0 },
      { description: 'Life insurance policy', unitPrice: 800, cost: 0 },
      { description: 'Policy review', unitPrice: 0, cost: 0 },
    ],
    expenseCategories: ['licensing', 'software', 'marketing', 'E&O insurance', 'rent', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Quoting' },
      { value: 'completed', label: 'Bound' }, { value: 'cancelled', label: 'Declined' },
    ],
    terminology: { jobs: 'Policies', quotes: 'Quotes', customers: 'Policyholders' },
  },
  {
    id: 'mortgage_broker', name: 'Mortgage / Loan Broker', icon: '🏦',
    quoteLineItemDefaults: [
      { description: 'Loan origination fee', unitPrice: 1500, cost: 0 },
      { description: 'Application processing', unitPrice: 500, cost: 50 },
      { description: 'Refinancing package', unitPrice: 2000, cost: 0 },
      { description: 'Pre-qualification', unitPrice: 0, cost: 0 },
    ],
    expenseCategories: ['software', 'licensing', 'marketing', 'compliance', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Inquiry' }, { value: 'in_progress', label: 'Processing' },
      { value: 'completed', label: 'Funded' }, { value: 'cancelled', label: 'Declined' },
    ],
    terminology: { jobs: 'Applications', quotes: 'Loan Estimates', customers: 'Borrowers' },
  },

  // === CREATIVE & MEDIA ===
  {
    id: 'marketing_agency', name: 'Marketing / Ad Agency', icon: '📢',
    quoteLineItemDefaults: [
      { description: 'Campaign management (monthly)', unitPrice: 2500, cost: 200 },
      { description: 'SEO package (monthly)', unitPrice: 1500, cost: 100 },
      { description: 'Brand strategy', unitPrice: 5000, cost: 500 },
      { description: 'Social media management', unitPrice: 1200, cost: 80 },
    ],
    expenseCategories: ['ad spend', 'software', 'contractor', 'stock media', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scoped' }, { value: 'in_progress', label: 'Active' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Campaigns', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'graphic_design', name: 'Graphic Design / Web Design', icon: '🎨',
    quoteLineItemDefaults: [
      { description: 'Logo design', unitPrice: 800, cost: 0 },
      { description: 'Website design', unitPrice: 3000, cost: 100 },
      { description: 'Business card design', unitPrice: 200, cost: 0 },
      { description: 'Brand identity package', unitPrice: 2500, cost: 100 },
    ],
    expenseCategories: ['software', 'stock assets', 'printing', 'hosting', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Queued' }, { value: 'in_progress', label: 'Designing' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'content_creator', name: 'Content / Social Media Manager', icon: '✍️',
    quoteLineItemDefaults: [
      { description: 'Blog post', unitPrice: 200, cost: 0 },
      { description: 'Social media package (monthly)', unitPrice: 1000, cost: 50 },
      { description: 'Email newsletter', unitPrice: 300, cost: 0 },
      { description: 'Video production', unitPrice: 1500, cost: 200 },
    ],
    expenseCategories: ['software', 'equipment', 'stock media', 'ad spend', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Briefed' }, { value: 'in_progress', label: 'Creating' },
      { value: 'completed', label: 'Published' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Content', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'music_teacher', name: 'Music Lessons / Instructor', icon: '🎵',
    quoteLineItemDefaults: [
      { description: 'Private lesson (30 min)', unitPrice: 45, cost: 0 },
      { description: 'Private lesson (60 min)', unitPrice: 80, cost: 0 },
      { description: 'Group class (per student)', unitPrice: 25, cost: 5 },
      { description: 'Recital / performance prep', unitPrice: 120, cost: 10 },
    ],
    expenseCategories: ['instruments', 'sheet music', 'rent', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Lesson' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Lessons', quotes: 'Packages', customers: 'Students' },
  },

  // === STAFFING & RECRUITING ===
  {
    id: 'staffing_agency', name: 'Staffing / Temp Agency', icon: '👥',
    quoteLineItemDefaults: [
      { description: 'Temp placement (per hour markup)', unitPrice: 8, cost: 0 },
      { description: 'Direct hire fee (% of salary)', unitPrice: 12000, cost: 500 },
      { description: 'Contract-to-hire fee', unitPrice: 5000, cost: 200 },
      { description: 'Onboarding / admin fee', unitPrice: 250, cost: 25 },
    ],
    expenseCategories: ['job boards', 'background checks', 'software', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Open Req' }, { value: 'in_progress', label: 'Filling' },
      { value: 'completed', label: 'Filled' }, { value: 'cancelled', label: 'Closed' },
    ],
    terminology: { jobs: 'Placements', quotes: 'Rate Sheets', customers: 'Clients' },
  },
  {
    id: 'recruiter', name: 'Executive Recruiter / Headhunter', icon: '🎯',
    quoteLineItemDefaults: [
      { description: 'Retained search (upfront)', unitPrice: 15000, cost: 500 },
      { description: 'Contingency fee (% of salary)', unitPrice: 25000, cost: 1000 },
      { description: 'Candidate sourcing', unitPrice: 3000, cost: 200 },
      { description: 'Interview prep coaching', unitPrice: 500, cost: 0 },
    ],
    expenseCategories: ['job boards', 'LinkedIn Recruiter', 'travel', 'marketing', 'software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Sourcing' }, { value: 'in_progress', label: 'Interviewing' },
      { value: 'completed', label: 'Placed' }, { value: 'cancelled', label: 'On Hold' },
    ],
    terminology: { jobs: 'Searches', quotes: 'Engagement Letters', customers: 'Clients' },
  },

  // === EDUCATION & TRAINING ===
  {
    id: 'driving_school', name: 'Driving School', icon: '🚗',
    quoteLineItemDefaults: [
      { description: 'Behind-the-wheel lesson (1 hr)', unitPrice: 75, cost: 15 },
      { description: 'Classroom course', unitPrice: 350, cost: 50 },
      { description: 'Road test package', unitPrice: 200, cost: 30 },
      { description: 'Defensive driving course', unitPrice: 150, cost: 20 },
    ],
    expenseCategories: ['vehicle', 'fuel', 'insurance', 'instructor wages', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Lesson' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Lessons', quotes: 'Packages', customers: 'Students' },
  },
  {
    id: 'corporate_training', name: 'Corporate Training / Workshop', icon: '🎓',
    quoteLineItemDefaults: [
      { description: 'Half-day workshop', unitPrice: 2000, cost: 300 },
      { description: 'Full-day workshop', unitPrice: 3500, cost: 500 },
      { description: 'Online course (per seat)', unitPrice: 150, cost: 10 },
      { description: 'Consultation (per hour)', unitPrice: 250, cost: 0 },
    ],
    expenseCategories: ['materials', 'venue', 'travel', 'software', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Delivering' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Workshops', quotes: 'Proposals', customers: 'Clients' },
  },

  // === HOSPITALITY & TRAVEL ===
  {
    id: 'travel_agency', name: 'Travel Agency / Tour Operator', icon: '✈️',
    quoteLineItemDefaults: [
      { description: 'Flight booking (commission)', unitPrice: 150, cost: 0 },
      { description: 'Hotel package (per night)', unitPrice: 250, cost: 200 },
      { description: 'Guided tour (per person)', unitPrice: 120, cost: 60 },
      { description: 'Planning fee', unitPrice: 200, cost: 0 },
    ],
    expenseCategories: ['GDS software', 'marketing', 'travel insurance', 'phone', 'commissions paid', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Inquiry' }, { value: 'in_progress', label: 'Planning' },
      { value: 'completed', label: 'Booked' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Trips', quotes: 'Itineraries', customers: 'Travelers' },
  },
  {
    id: 'vacation_rental', name: 'Vacation Rental / B&B', icon: '🏡',
    quoteLineItemDefaults: [
      { description: 'Nightly rate', unitPrice: 175, cost: 40 },
      { description: 'Cleaning fee', unitPrice: 100, cost: 50 },
      { description: 'Extra guest fee', unitPrice: 25, cost: 0 },
      { description: 'Weekly discount rate', unitPrice: 1100, cost: 280 },
    ],
    expenseCategories: ['cleaning', 'linens', 'supplies', 'utilities', 'platform fees', 'maintenance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Reserved' }, { value: 'in_progress', label: 'Occupied' },
      { value: 'completed', label: 'Checked Out' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Bookings', quotes: 'Quotes', customers: 'Guests' },
  },
  {
    id: 'wedding_planner', name: 'Wedding / Party Planner', icon: '💍',
    quoteLineItemDefaults: [
      { description: 'Full planning package', unitPrice: 5000, cost: 500 },
      { description: 'Partial planning', unitPrice: 3000, cost: 300 },
      { description: 'Day-of coordination', unitPrice: 1500, cost: 200 },
      { description: 'Vendor management', unitPrice: 800, cost: 0 },
    ],
    expenseCategories: ['vendors', 'decor', 'venue deposit', 'transport', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Planning' },
      { value: 'completed', label: 'Celebrated' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Events', quotes: 'Packages', customers: 'Clients' },
  },

  // === RETAIL & LOCAL SERVICES ===
  {
    id: 'tailor', name: 'Tailor / Alterations', icon: '🧵',
    quoteLineItemDefaults: [
      { description: 'Hem pants', unitPrice: 20, cost: 2 },
      { description: 'Take in / let out', unitPrice: 35, cost: 3 },
      { description: 'Custom suit', unitPrice: 800, cost: 200 },
      { description: 'Wedding dress alterations', unitPrice: 400, cost: 40 },
    ],
    expenseCategories: ['fabric', 'thread & notions', 'equipment', 'rent', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Dropped Off' }, { value: 'in_progress', label: 'Altering' },
      { value: 'completed', label: 'Ready' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'cobbler', name: 'Shoe Repair / Cobbler', icon: '👞',
    quoteLineItemDefaults: [
      { description: 'Heel replacement', unitPrice: 35, cost: 8 },
      { description: 'Sole replacement', unitPrice: 65, cost: 15 },
      { description: 'Leather conditioning', unitPrice: 25, cost: 4 },
      { description: 'Zipper replacement', unitPrice: 45, cost: 10 },
    ],
    expenseCategories: ['leather', 'soles', 'heels', 'tools', 'adhesives', 'rent', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Received' }, { value: 'in_progress', label: 'Repairing' },
      { value: 'completed', label: 'Ready' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Repairs', quotes: 'Estimates', customers: 'Customers' },
  },
  {
    id: 'florist', name: 'Florist / Flower Shop', icon: '💐',
    quoteLineItemDefaults: [
      { description: 'Bouquet arrangement', unitPrice: 65, cost: 20 },
      { description: 'Wedding arrangement', unitPrice: 250, cost: 80 },
      { description: 'Sympathy arrangement', unitPrice: 100, cost: 35 },
      { description: 'Weekly office delivery', unitPrice: 50, cost: 18 },
    ],
    expenseCategories: ['flowers', 'supplies', 'delivery', 'rent', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Arranging' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'pawnbroker', name: 'Pawn Shop / Resale', icon: '💎',
    quoteLineItemDefaults: [
      { description: 'Pawn loan (avg)', unitPrice: 200, cost: 100 },
      { description: 'Retail sale item', unitPrice: 150, cost: 75 },
      { description: 'Consignment (commission)', unitPrice: 50, cost: 0 },
      { description: 'Appraisal fee', unitPrice: 25, cost: 0 },
    ],
    expenseCategories: ['inventory', 'rent', 'security', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Pending' }, { value: 'in_progress', label: 'Processing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Forfeited' },
    ],
    terminology: { jobs: 'Transactions', quotes: 'Appraisals', customers: 'Customers' },
  },
  {
    id: 'tattoo_studio', name: 'Tattoo / Piercing Studio', icon: '🖊️',
    quoteLineItemDefaults: [
      { description: 'Small tattoo', unitPrice: 150, cost: 15 },
      { description: 'Medium tattoo (per hour)', unitPrice: 200, cost: 20 },
      { description: 'Large / custom piece', unitPrice: 500, cost: 50 },
      { description: 'Piercing', unitPrice: 50, cost: 8 },
    ],
    expenseCategories: ['ink & needles', 'supplies', 'equipment', 'rent', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Inking' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Designs', customers: 'Clients' },
  },
  {
    id: 'laundromat', name: 'Laundromat / Dry Cleaner', icon: '👔',
    quoteLineItemDefaults: [
      { description: 'Wash & fold (per lb)', unitPrice: 1.50, cost: 0.30 },
      { description: 'Dry cleaning (per item)', unitPrice: 12, cost: 3 },
      { description: 'Comforter cleaning', unitPrice: 35, cost: 8 },
      { description: 'Express service', unitPrice: 50, cost: 10 },
    ],
    expenseCategories: ['detergent & supplies', 'utilities', 'equipment maintenance', 'rent', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Dropped Off' }, { value: 'in_progress', label: 'Processing' },
      { value: 'completed', label: 'Ready' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Price Lists', customers: 'Customers' },
  },

  // === CHILD CARE ===
  {
    id: 'daycare', name: 'Daycare / Childcare', icon: '👶',
    quoteLineItemDefaults: [
      { description: 'Full-time weekly (infant)', unitPrice: 350, cost: 180 },
      { description: 'Full-time weekly (toddler)', unitPrice: 300, cost: 150 },
      { description: 'Part-time weekly (3 days)', unitPrice: 220, cost: 110 },
      { description: 'Drop-in (per day)', unitPrice: 85, cost: 40 },
      { description: 'Registration fee', unitPrice: 100, cost: 10 },
    ],
    expenseCategories: ['staff wages', 'food & supplies', 'insurance', 'rent', 'toys & curriculum', 'cleaning', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Waitlisted' }, { value: 'in_progress', label: 'Enrolled' },
      { value: 'completed', label: 'Graduated' }, { value: 'cancelled', label: 'Withdrawn' },
    ],
    terminology: { jobs: 'Enrollments', quotes: 'Tuition Schedules', customers: 'Families' },
  },
  {
    id: 'after_school', name: 'After-School / Tutoring Center', icon: '🎒',
    quoteLineItemDefaults: [
      { description: 'Monthly after-school program', unitPrice: 450, cost: 200 },
      { description: 'Homework help (per session)', unitPrice: 40, cost: 15 },
      { description: 'SAT/ACT prep course', unitPrice: 800, cost: 150 },
      { description: 'Summer camp (per week)', unitPrice: 300, cost: 120 },
    ],
    expenseCategories: ['staff wages', 'materials', 'rent', 'snacks', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Registered' }, { value: 'in_progress', label: 'Active' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Dropped' },
    ],
    terminology: { jobs: 'Programs', quotes: 'Program Guides', customers: 'Families' },
  },

  // === ENTERTAINMENT ===
  {
    id: 'dj', name: 'DJ / Mobile Entertainment', icon: '🎧',
    quoteLineItemDefaults: [
      { description: 'DJ service (4 hours)', unitPrice: 800, cost: 50 },
      { description: 'MC / hosting', unitPrice: 300, cost: 0 },
      { description: 'Uplighting package', unitPrice: 400, cost: 80 },
      { description: 'Photo booth rental', unitPrice: 600, cost: 100 },
      { description: 'Overtime (per hour)', unitPrice: 150, cost: 0 },
    ],
    expenseCategories: ['equipment', 'music licensing', 'fuel', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Performing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Gigs', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'escape_room', name: 'Escape Room / Entertainment Venue', icon: '🔐',
    quoteLineItemDefaults: [
      { description: 'Standard game (per group)', unitPrice: 150, cost: 20 },
      { description: 'Premium game (per group)', unitPrice: 200, cost: 30 },
      { description: 'Private booking', unitPrice: 400, cost: 40 },
      { description: 'Corporate event (per hour)', unitPrice: 500, cost: 80 },
      { description: 'Party room add-on', unitPrice: 150, cost: 20 },
    ],
    expenseCategories: ['rent', 'props & set design', 'puzzles', 'staff wages', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Game' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Bookings', quotes: 'Packages', customers: 'Groups' },
  },

  // === TRANSPORTATION ===
  {
    id: 'limo', name: 'Limo / Chauffeur / Car Service', icon: '🚗',
    quoteLineItemDefaults: [
      { description: 'Airport transfer (sedan)', unitPrice: 85, cost: 25 },
      { description: 'Hourly rate (SUV)', unitPrice: 125, cost: 40 },
      { description: 'Wedding package (6 hrs)', unitPrice: 900, cost: 250 },
      { description: 'Prom package', unitPrice: 600, cost: 180 },
      { description: 'Corporate account (monthly)', unitPrice: 2000, cost: 800 },
    ],
    expenseCategories: ['fuel', 'vehicle maintenance', 'insurance', 'tolls', 'chauffeur wages', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Reserved' }, { value: 'in_progress', label: 'En Route' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Rides', quotes: 'Rates', customers: 'Passengers' },
  },
  {
    id: 'courier', name: 'Courier / Last-Mile Delivery', icon: '📦',
    quoteLineItemDefaults: [
      { description: 'Same-day local delivery', unitPrice: 25, cost: 8 },
      { description: 'Scheduled route stop', unitPrice: 12, cost: 4 },
      { description: 'Rush / priority delivery', unitPrice: 45, cost: 12 },
      { description: 'Large item delivery', unitPrice: 75, cost: 25 },
      { description: 'Monthly route contract', unitPrice: 1500, cost: 600 },
    ],
    expenseCategories: ['fuel', 'vehicle maintenance', 'insurance', 'drivers', 'app/software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Assigned' }, { value: 'in_progress', label: 'In Transit' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Deliveries', quotes: 'Rate Cards', customers: 'Clients' },
  },

  // === RETAIL & COMMERCE ===
  {
    id: 'print_shop', name: 'Print / Sign Shop', icon: '🖨️',
    quoteLineItemDefaults: [
      { description: 'Business cards (500)', unitPrice: 45, cost: 8 },
      { description: 'Vinyl banner (per sq ft)', unitPrice: 8, cost: 2.50 },
      { description: 'Vehicle wrap (full)', unitPrice: 3500, cost: 1200 },
      { description: 'Sign fabrication', unitPrice: 500, cost: 180 },
      { description: 'Flyers (1000)', unitPrice: 120, cost: 30 },
    ],
    expenseCategories: ['materials', 'ink & toner', 'equipment', 'rent', 'labor', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Printing' },
      { value: 'completed', label: 'Ready' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'car_wash', name: 'Car Wash (Fixed Location)', icon: '🚿',
    quoteLineItemDefaults: [
      { description: 'Basic wash', unitPrice: 15, cost: 3 },
      { description: 'Full detail (interior & exterior)', unitPrice: 180, cost: 30 },
      { description: 'Monthly unlimited pass', unitPrice: 40, cost: 5 },
      { description: 'Fleet contract (per vehicle)', unitPrice: 12, cost: 2.50 },
      { description: 'Ceramic coating', unitPrice: 800, cost: 200 },
    ],
    expenseCategories: ['chemicals', 'water & utilities', 'equipment maintenance', 'labor', 'rent', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Queued' }, { value: 'in_progress', label: 'Washing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Washes', quotes: 'Fleet Proposals', customers: 'Customers' },
  },
  {
    id: 'vending', name: 'Vending / Micro-Market', icon: '🏪',
    quoteLineItemDefaults: [
      { description: 'Machine placement (monthly commission)', unitPrice: 150, cost: 0 },
      { description: 'Micro-market monthly', unitPrice: 500, cost: 100 },
      { description: 'Machine restocking visit', unitPrice: 0, cost: 25 },
      { description: 'Machine lease (per month)', unitPrice: 200, cost: 80 },
    ],
    expenseCategories: ['inventory', 'fuel & route costs', 'machine maintenance', 'commissions', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Route Planned' }, { value: 'in_progress', label: 'Servicing' },
      { value: 'completed', label: 'Restocked' }, { value: 'cancelled', label: 'Removed' },
    ],
    terminology: { jobs: 'Routes', quotes: 'Placement Proposals', customers: 'Locations' },
  },

  // === SPACES & STORAGE ===
  {
    id: 'coworking', name: 'Coworking / Shared Office Space', icon: '🏢',
    quoteLineItemDefaults: [
      { description: 'Hot desk (monthly)', unitPrice: 250, cost: 60 },
      { description: 'Dedicated desk (monthly)', unitPrice: 450, cost: 120 },
      { description: 'Private office (monthly)', unitPrice: 1200, cost: 400 },
      { description: 'Meeting room (per hour)', unitPrice: 50, cost: 5 },
      { description: 'Day pass', unitPrice: 35, cost: 5 },
    ],
    expenseCategories: ['rent', 'utilities', 'internet', 'furniture', 'cleaning', 'coffee & supplies', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Reserved' }, { value: 'in_progress', label: 'Active Member' },
      { value: 'completed', label: 'Ended' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Memberships', quotes: 'Plans', customers: 'Members' },
  },
  {
    id: 'storage_facility', name: 'Storage Facility', icon: '📦',
    quoteLineItemDefaults: [
      { description: '5x10 unit (monthly)', unitPrice: 95, cost: 25 },
      { description: '10x10 unit (monthly)', unitPrice: 150, cost: 40 },
      { description: '10x20 unit (monthly)', unitPrice: 250, cost: 65 },
      { description: 'Climate-controlled premium', unitPrice: 200, cost: 60 },
      { description: 'Insurance (monthly)', unitPrice: 15, cost: 3 },
    ],
    expenseCategories: ['property tax', 'insurance', 'maintenance', 'security', 'utilities', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Reserved' }, { value: 'in_progress', label: 'Occupied' },
      { value: 'completed', label: 'Vacated' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Leases', quotes: 'Rate Sheets', customers: 'Tenants' },
  },
  {
    id: 'rv_boat_storage', name: 'RV / Boat Storage', icon: '🚢',
    quoteLineItemDefaults: [
      { description: 'Outdoor parking (monthly)', unitPrice: 125, cost: 20 },
      { description: 'Covered parking (monthly)', unitPrice: 200, cost: 40 },
      { description: 'Enclosed unit (monthly)', unitPrice: 350, cost: 80 },
      { description: 'Dump station access', unitPrice: 15, cost: 2 },
    ],
    expenseCategories: ['property tax', 'insurance', 'maintenance', 'security', 'utilities', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Reserved' }, { value: 'in_progress', label: 'Stored' },
      { value: 'completed', label: 'Released' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Reservations', quotes: 'Rate Cards', customers: 'Owners' },
  },

  // === PET SERVICES ===
  {
    id: 'pet_boarding', name: 'Pet Boarding / Doggy Daycare', icon: '🐕',
    quoteLineItemDefaults: [
      { description: 'Overnight boarding (per night)', unitPrice: 55, cost: 15 },
      { description: 'Daycare (per day)', unitPrice: 35, cost: 10 },
      { description: '10-day daycare package', unitPrice: 300, cost: 90 },
      { description: 'Holiday surcharge', unitPrice: 15, cost: 0 },
      { description: 'Pickup / drop-off service', unitPrice: 20, cost: 8 },
    ],
    expenseCategories: ['staff wages', 'food', 'supplies', 'insurance', 'rent', 'cleaning', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Boarding' },
      { value: 'completed', label: 'Picked Up' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Stays', quotes: 'Packages', customers: 'Pet Parents' },
  },

  // === SENIOR CARE ===
  {
    id: 'senior_living', name: 'Senior Care / Assisted Living', icon: '🏡',
    quoteLineItemDefaults: [
      { description: 'Assisted living (monthly)', unitPrice: 4500, cost: 2800 },
      { description: 'Memory care (monthly)', unitPrice: 6000, cost: 3500 },
      { description: 'Respite stay (per day)', unitPrice: 200, cost: 120 },
      { description: 'Move-in fee', unitPrice: 2000, cost: 300 },
    ],
    expenseCategories: ['staff wages', 'food', 'medical supplies', 'rent/mortgage', 'insurance', 'activities', 'maintenance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Touring' }, { value: 'in_progress', label: 'Residing' },
      { value: 'completed', label: 'Transitioned' }, { value: 'cancelled', label: 'Declined' },
    ],
    terminology: { jobs: 'Residents', quotes: 'Care Plans', customers: 'Families' },
  },

  // === DEATH CARE ===
  {
    id: 'funeral_home', name: 'Funeral Home / Memorial Services', icon: '🕊️',
    quoteLineItemDefaults: [
      { description: 'Traditional funeral service', unitPrice: 6500, cost: 2500 },
      { description: 'Cremation package', unitPrice: 2500, cost: 800 },
      { description: 'Memorial service', unitPrice: 2000, cost: 600 },
      { description: 'Embalming & preparation', unitPrice: 800, cost: 200 },
      { description: 'Casket (mid-range)', unitPrice: 2500, cost: 1200 },
    ],
    expenseCategories: ['caskets & urns', 'embalming supplies', 'staff wages', 'vehicle maintenance', 'rent/mortgage', 'utilities', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Arranged' }, { value: 'in_progress', label: 'Preparing' },
      { value: 'completed', label: 'Served' }, { value: 'cancelled', label: 'Transferred' },
    ],
    terminology: { jobs: 'Services', quotes: 'Arrangements', customers: 'Families' },
  },

  // === PROFESSIONAL SERVICES (expanded) ===
  {
    id: 'translation', name: 'Translation / Interpretation', icon: '🌍',
    quoteLineItemDefaults: [
      { description: 'Document translation (per word)', unitPrice: 0.12, cost: 0.05 },
      { description: 'Certified translation (per page)', unitPrice: 75, cost: 25 },
      { description: 'On-site interpreter (per hour)', unitPrice: 85, cost: 45 },
      { description: 'Phone/video interpreter (per hour)', unitPrice: 60, cost: 30 },
      { description: 'Rush surcharge', unitPrice: 200, cost: 0 },
    ],
    expenseCategories: ['software (CAT tools)', 'contractor payments', 'certification', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Assigned' }, { value: 'in_progress', label: 'Translating' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Rate Sheets', customers: 'Clients' },
  },
  {
    id: 'notary', name: 'Notary / Mobile Notary', icon: '📋',
    quoteLineItemDefaults: [
      { description: 'Notarization (per signature)', unitPrice: 15, cost: 0 },
      { description: 'Mobile notary visit fee', unitPrice: 75, cost: 20 },
      { description: 'Loan signing (per package)', unitPrice: 150, cost: 0 },
      { description: 'Apostille service', unitPrice: 100, cost: 25 },
      { description: 'After-hours surcharge', unitPrice: 50, cost: 0 },
    ],
    expenseCategories: ['supplies (seals, journals)', 'fuel', 'insurance', 'commission renewal', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Signing' },
      { value: 'completed', label: 'Notarized' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Fee Schedules', customers: 'Signers' },
  },
  {
    id: 'appraiser', name: 'Appraisal Service', icon: '🔍',
    quoteLineItemDefaults: [
      { description: 'Residential appraisal', unitPrice: 450, cost: 30 },
      { description: 'Commercial appraisal', unitPrice: 2500, cost: 200 },
      { description: 'Personal property appraisal', unitPrice: 300, cost: 20 },
      { description: 'Estate / divorce appraisal', unitPrice: 600, cost: 40 },
      { description: 'Rush appraisal', unitPrice: 200, cost: 0 },
    ],
    expenseCategories: ['MLS subscriptions', 'software', 'insurance', 'vehicle', 'continuing ed', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Inspecting' },
      { value: 'completed', label: 'Report Sent' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appraisals', quotes: 'Fee Quotes', customers: 'Clients' },
  },

  // === CARE & WELLNESS (expanded) ===
  {
    id: 'medspa', name: 'Med Spa / Aesthetics', icon: '💉',
    quoteLineItemDefaults: [
      { description: 'Botox (per area)', unitPrice: 350, cost: 80 },
      { description: 'Dermal filler (per syringe)', unitPrice: 650, cost: 200 },
      { description: 'Laser treatment (per session)', unitPrice: 300, cost: 60 },
      { description: 'Chemical peel', unitPrice: 150, cost: 25 },
      { description: 'Microneedling', unitPrice: 350, cost: 50 },
    ],
    expenseCategories: ['medical supplies', 'equipment', 'rent', 'staff wages', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Treatment' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'No Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Treatment Plans', customers: 'Clients' },
  },
  {
    id: 'towing', name: 'Towing / Roadside Assistance', icon: '🚛',
    quoteLineItemDefaults: [
      { description: 'Local tow (up to 10 mi)', unitPrice: 95, cost: 30 },
      { description: 'Long-distance tow (per mile)', unitPrice: 4, cost: 1.50 },
      { description: 'Lockout service', unitPrice: 65, cost: 10 },
      { description: 'Jump start / tire change', unitPrice: 60, cost: 10 },
      { description: 'Flatbed premium', unitPrice: 50, cost: 15 },
    ],
    expenseCategories: ['fuel', 'vehicle maintenance', 'insurance', 'dispatch software', 'driver wages', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Dispatched' }, { value: 'in_progress', label: 'En Route' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Calls', quotes: 'Rate Cards', customers: 'Motorists' },
  },
  {
    id: 'dental_lab', name: 'Dental Lab / Prosthetics', icon: '🦷',
    quoteLineItemDefaults: [
      { description: 'Crown (PFM)', unitPrice: 150, cost: 45 },
      { description: 'Zirconia crown', unitPrice: 200, cost: 65 },
      { description: 'Denture (full set)', unitPrice: 500, cost: 150 },
      { description: 'Night guard', unitPrice: 120, cost: 30 },
      { description: 'Rush fee (24hr)', unitPrice: 75, cost: 0 },
    ],
    expenseCategories: ['materials', 'equipment', 'shipping', 'labor', 'software', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Received' }, { value: 'in_progress', label: 'Fabricating' },
      { value: 'completed', label: 'Shipped' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Cases', quotes: 'Fee Schedules', customers: 'Dentists' },
  },

  // === HIGH-DEMAND ADDITIONS ===
  {
    id: 'real_estate', name: 'Real Estate Agent / Broker', icon: '🏘️',
    quoteLineItemDefaults: [
      { description: 'Listing commission (3%)', unitPrice: 12000, cost: 300 },
      { description: 'Buyer agent commission (2.5%)', unitPrice: 10000, cost: 200 },
      { description: 'Staging consultation', unitPrice: 300, cost: 0 },
      { description: 'Professional photography', unitPrice: 250, cost: 150 },
      { description: 'Open house event', unitPrice: 0, cost: 50 },
    ],
    expenseCategories: ['MLS fees', 'marketing', 'photography', 'signage', 'lockboxes', 'continuing ed', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Listed' }, { value: 'in_progress', label: 'Under Contract' },
      { value: 'completed', label: 'Closed' }, { value: 'cancelled', label: 'Expired' },
    ],
    terminology: { jobs: 'Listings', quotes: 'CMAs', customers: 'Clients' },
  },
  {
    id: 'flooring', name: 'Flooring Installer', icon: '🪵',
    quoteLineItemDefaults: [
      { description: 'Hardwood installation (per sq ft)', unitPrice: 8, cost: 4.50 },
      { description: 'Laminate installation (per sq ft)', unitPrice: 4.50, cost: 2.00 },
      { description: 'Tile installation (per sq ft)', unitPrice: 7, cost: 3.50 },
      { description: 'Carpet installation (per sq ft)', unitPrice: 3.50, cost: 1.50 },
      { description: 'Subfloor prep / leveling', unitPrice: 2.50, cost: 1.00 },
    ],
    expenseCategories: ['materials', 'underlayment', 'adhesives', 'labor', 'equipment', 'disposal', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Estimates', customers: 'Homeowners' },
  },
  {
    id: 'brewery', name: 'Brewery / Winery / Distillery', icon: '🍺',
    quoteLineItemDefaults: [
      { description: 'Tap room pour (16oz)', unitPrice: 7, cost: 1.20 },
      { description: 'Growler fill (64oz)', unitPrice: 16, cost: 3.00 },
      { description: 'Keg (half barrel)', unitPrice: 175, cost: 55 },
      { description: 'Private event space (per hour)', unitPrice: 200, cost: 30 },
      { description: 'Tasting flight (per person)', unitPrice: 12, cost: 2.50 },
    ],
    expenseCategories: ['ingredients', 'packaging', 'equipment', 'rent', 'taproom staff', 'licensing', 'utilities', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Brewing' },
      { value: 'completed', label: 'Served' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Menu Pricing', customers: 'Patrons' },
  },
  {
    id: 'dog_training', name: 'Dog Training / Obedience', icon: '🐕‍🦺',
    quoteLineItemDefaults: [
      { description: 'Private lesson (1 hr)', unitPrice: 120, cost: 0 },
      { description: 'Group class (6-week)', unitPrice: 250, cost: 30 },
      { description: 'Board & train (per week)', unitPrice: 800, cost: 200 },
      { description: 'Puppy socialization class', unitPrice: 150, cost: 20 },
      { description: 'Behavioral evaluation', unitPrice: 200, cost: 0 },
    ],
    expenseCategories: ['treats & rewards', 'equipment', 'rent', 'insurance', 'marketing', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Training' },
      { value: 'completed', label: 'Graduated' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Programs', customers: 'Handlers' },
  },
  {
    id: 'marine', name: 'Marine / Boat Services', icon: '⛵',
    quoteLineItemDefaults: [
      { description: 'Bottom cleaning (per ft)', unitPrice: 6, cost: 2.50 },
      { description: 'Engine service / winterization', unitPrice: 350, cost: 100 },
      { description: 'Fiberglass repair (per hour)', unitPrice: 95, cost: 40 },
      { description: 'Detailing / wax (per ft)', unitPrice: 12, cost: 4 },
      { description: 'Shrink wrap (per ft)', unitPrice: 8, cost: 3 },
    ],
    expenseCategories: ['parts', 'materials', 'fuel', 'dock fees', 'equipment', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Slip' },
      { value: 'completed', label: 'Sea Ready' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Work Orders', quotes: 'Quotes', customers: 'Boat Owners' },
  },
  {
    id: 'bail_bonds', name: 'Bail Bonds Agent', icon: '⚖️',
    quoteLineItemDefaults: [
      { description: 'State bond premium (10%)', unitPrice: 1000, cost: 0 },
      { description: 'Federal bond premium (15%)', unitPrice: 1500, cost: 0 },
      { description: 'Collateral processing fee', unitPrice: 100, cost: 10 },
      { description: 'Skip tracing / recovery', unitPrice: 500, cost: 100 },
    ],
    expenseCategories: ['insurance premiums', 'licensing', 'marketing', 'compliance', 'recovery costs', 'office', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Pending' }, { value: 'in_progress', label: 'Bonded' },
      { value: 'completed', label: 'Exonerated' }, { value: 'cancelled', label: 'Forfeited' },
    ],
    terminology: { jobs: 'Bonds', quotes: 'Premium Quotes', customers: 'Defendants' },
  },
  {
    id: 'immigration_attorney', name: 'Immigration Attorney', icon: '🌍',
    quoteLineItemDefaults: [
      { description: 'Initial consultation', unitPrice: 250, cost: 0 },
      { description: 'Visa application', unitPrice: 3000, cost: 200 },
      { description: 'Green card petition', unitPrice: 4500, cost: 300 },
      { description: 'Naturalization / citizenship', unitPrice: 2500, cost: 150 },
      { description: 'Court representation (per hearing)', unitPrice: 2000, cost: 100 },
    ],
    expenseCategories: ['filing fees', 'translation', 'courier costs', 'research', 'software', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Pending' }, { value: 'in_progress', label: 'Filed' },
      { value: 'completed', label: 'Approved' }, { value: 'cancelled', label: 'Denied' },
    ],
    terminology: { jobs: 'Cases', quotes: 'Fee Agreements', customers: 'Petitioners' },
  },
  {
    id: 'equine', name: 'Equine / Horse Services', icon: '🐴',
    quoteLineItemDefaults: [
      { description: 'Farrier / hoof trimming', unitPrice: 45, cost: 10 },
      { description: 'Full set of shoes', unitPrice: 150, cost: 40 },
      { description: 'Hauling / transport (per mile)', unitPrice: 3.50, cost: 1.20 },
      { description: 'Deworming / vaccination', unitPrice: 75, cost: 25 },
      { description: 'Training session (per hour)', unitPrice: 65, cost: 0 },
    ],
    expenseCategories: ['feed', 'shoeing', 'vet supplies', 'fuel', 'insurance', 'equipment', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Farm' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Visits', quotes: 'Quotes', customers: 'Horse Owners' },
  },

  // === ADDITIONAL HIGH-VALUE TEMPLATES ===
  {
    id: 'dj_entertainment', name: 'DJ / Entertainment', icon: '🎧',
    quoteLineItemDefaults: [
      { description: 'DJ performance (per hour)', unitPrice: 150, cost: 0 },
      { description: 'Sound system rental', unitPrice: 300, cost: 50 },
      { description: 'Lighting package', unitPrice: 200, cost: 40 },
      { description: 'MC services', unitPrice: 100, cost: 0 },
      { description: 'Travel fee', unitPrice: 75, cost: 30 },
    ],
    expenseCategories: ['equipment', 'music', 'transport', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Playing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Gigs', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'barbershop', name: 'Barbershop', icon: '💈',
    quoteLineItemDefaults: [
      { description: 'Haircut', unitPrice: 30, cost: 2 },
      { description: 'Beard trim', unitPrice: 15, cost: 1 },
      { description: 'Hot towel shave', unitPrice: 25, cost: 3 },
      { description: 'Hair design / lineup', unitPrice: 10, cost: 0 },
      { description: 'Kids cut', unitPrice: 20, cost: 1 },
    ],
    expenseCategories: ['supplies', 'tools', 'booth rent', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Chair' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'No-Show' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Walk-ins', customers: 'Clients' },
  },
  {
    id: 'laundromat', name: 'Laundromat / Dry Cleaning', icon: '👔',
    quoteLineItemDefaults: [
      { description: 'Wash & fold (per lb)', unitPrice: 1.50, cost: 0.30 },
      { description: 'Dry cleaning (per item)', unitPrice: 8, cost: 2 },
      { description: 'Comforter / bedding', unitPrice: 25, cost: 5 },
      { description: 'Alterations', unitPrice: 20, cost: 3 },
      { description: 'Pickup/delivery service', unitPrice: 15, cost: 5 },
    ],
    expenseCategories: ['supplies', 'equipment', 'utilities', 'labor', 'delivery', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Dropped Off' }, { value: 'in_progress', label: 'Processing' },
      { value: 'completed', label: 'Ready' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Price List', customers: 'Customers' },
  },
  {
    id: 'tattoo_piercing', name: 'Tattoo / Piercing Studio', icon: '🖊️',
    quoteLineItemDefaults: [
      { description: 'Small tattoo (under 3")', unitPrice: 150, cost: 15 },
      { description: 'Medium tattoo (3-6")', unitPrice: 300, cost: 30 },
      { description: 'Large tattoo (6"+)', unitPrice: 500, cost: 50 },
      { description: 'Cover-up / rework', unitPrice: 400, cost: 40 },
      { description: 'Piercing', unitPrice: 50, cost: 8 },
      { description: 'Touch-up session', unitPrice: 75, cost: 10 },
    ],
    expenseCategories: ['ink', 'needles', 'supplies', 'equipment', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Tattooing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Consultations', customers: 'Clients' },
  },
  {
    id: 'clothing_brand', name: 'Clothing / Fashion Brand', icon: '👗',
    quoteLineItemDefaults: [
      { description: 'Custom garment', unitPrice: 200, cost: 60 },
      { description: 'Alterations', unitPrice: 40, cost: 8 },
      { description: 'Embroidery (per item)', unitPrice: 15, cost: 3 },
      { description: 'Screen printing (per shirt)', unitPrice: 12, cost: 3 },
      { description: 'Wholesale order (per unit)', unitPrice: 25, cost: 10 },
    ],
    expenseCategories: ['fabric', 'supplies', 'equipment', 'labor', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Producing' },
      { value: 'completed', label: 'Shipped' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'food_truck', name: 'Food Truck / Street Vendor', icon: '🚚',
    quoteLineItemDefaults: [
      { description: 'Event booking (per hour)', unitPrice: 200, cost: 60 },
      { description: 'Catering (per person)', unitPrice: 15, cost: 5 },
      { description: 'Private party flat rate', unitPrice: 800, cost: 250 },
      { description: 'Festival / fair booth', unitPrice: 500, cost: 150 },
    ],
    expenseCategories: ['food', 'fuel', 'permits', 'equipment', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Serving' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Events', quotes: 'Bookings', customers: 'Clients' },
  },
  {
    id: 'mobile_carwash', name: 'Mobile Car Wash', icon: '🚿',
    quoteLineItemDefaults: [
      { description: 'Basic exterior wash', unitPrice: 35, cost: 5 },
      { description: 'Full detail interior/exterior', unitPrice: 150, cost: 20 },
      { description: 'Ceramic coating', unitPrice: 500, cost: 80 },
      { description: 'Fleet pricing (per vehicle)', unitPrice: 25, cost: 4 },
      { description: 'Headlight restoration', unitPrice: 75, cost: 10 },
    ],
    expenseCategories: ['supplies', 'water', 'fuel', 'equipment', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Washing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Quotes', customers: 'Vehicle Owners' },
  },
  {
    id: 'personal_assistant', name: 'Personal Assistant / Errand Service', icon: '📋',
    quoteLineItemDefaults: [
      { description: 'Hourly rate', unitPrice: 35, cost: 0 },
      { description: 'Errand run (flat)', unitPrice: 50, cost: 10 },
      { description: 'Grocery shopping', unitPrice: 40, cost: 5 },
      { description: 'Appointment scheduling', unitPrice: 25, cost: 0 },
      { description: 'Monthly retainer', unitPrice: 500, cost: 0 },
    ],
    expenseCategories: ['fuel', 'supplies', 'software', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Running' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Tasks', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'life_coach', name: 'Life Coach / Motivational', icon: '🌟',
    quoteLineItemDefaults: [
      { description: 'Individual session (per hour)', unitPrice: 125, cost: 0 },
      { description: 'Group session', unitPrice: 50, cost: 0 },
      { description: 'Monthly package (4 sessions)', unitPrice: 400, cost: 0 },
      { description: 'Workshop / seminar', unitPrice: 500, cost: 50 },
      { description: 'VIP day intensive', unitPrice: 1500, cost: 100 },
    ],
    expenseCategories: ['software', 'marketing', 'travel', 'materials', 'certifications', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'music_lessons', name: 'Music Lessons / Instruments', icon: '🎸',
    quoteLineItemDefaults: [
      { description: 'Individual lesson (30 min)', unitPrice: 40, cost: 0 },
      { description: 'Individual lesson (60 min)', unitPrice: 70, cost: 0 },
      { description: 'Group lesson (per student)', unitPrice: 25, cost: 0 },
      { description: 'Recital / performance fee', unitPrice: 50, cost: 10 },
      { description: 'Instrument rental (per month)', unitPrice: 50, cost: 15 },
    ],
    expenseCategories: ['instruments', 'sheet music', 'studio rent', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'In Lesson' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Lessons', quotes: 'Packages', customers: 'Students' },
  },
  {
    id: 'dance_studio', name: 'Dance Studio / Choreography', icon: '💃',
    quoteLineItemDefaults: [
      { description: 'Group class (per student)', unitPrice: 20, cost: 0 },
      { description: 'Private lesson', unitPrice: 75, cost: 0 },
      { description: 'Wedding choreography package', unitPrice: 350, cost: 0 },
      { description: 'Studio rental (per hour)', unitPrice: 50, cost: 15 },
      { description: 'Recital costume fee', unitPrice: 45, cost: 20 },
    ],
    expenseCategories: ['studio rent', 'music', 'costumes', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Dancing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Classes', quotes: 'Packages', customers: 'Dancers' },
  },
  {
    id: 'sports_coaching', name: 'Sports Coaching / Training', icon: '⚽',
    quoteLineItemDefaults: [
      { description: 'Individual training session', unitPrice: 75, cost: 0 },
      { description: 'Group training (per athlete)', unitPrice: 30, cost: 0 },
      { description: 'Team coaching (per session)', unitPrice: 150, cost: 20 },
      { description: 'Camps / clinics (per day)', unitPrice: 100, cost: 25 },
      { description: 'Video analysis session', unitPrice: 50, cost: 0 },
    ],
    expenseCategories: ['equipment', 'field rental', 'travel', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Training' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Programs', customers: 'Athletes' },
  },
  {
    id: 'home_staging', name: 'Home Staging / Interior Design', icon: '🏡',
    quoteLineItemDefaults: [
      { description: 'Consultation (per hour)', unitPrice: 125, cost: 0 },
      { description: 'Full home staging', unitPrice: 2500, cost: 800 },
      { description: 'Partial staging (per room)', unitPrice: 500, cost: 150 },
      { description: 'Furniture rental (per month)', unitPrice: 300, cost: 100 },
      { description: 'Design concept board', unitPrice: 200, cost: 0 },
    ],
    expenseCategories: ['furniture', 'decor', 'transport', 'labor', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Staging' },
      { value: 'completed', label: 'Installed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Proposals', customers: 'Clients' },
  },
  {
    id: 'sign_making', name: 'Sign Making / Large Format', icon: '🪧',
    quoteLineItemDefaults: [
      { description: 'Vinyl banner (per sq ft)', unitPrice: 8, cost: 2 },
      { description: 'Channel letters', unitPrice: 1500, cost: 600 },
      { description: 'Vehicle wrap', unitPrice: 3000, cost: 1200 },
      { description: 'Yard signs (per sign)', unitPrice: 15, cost: 4 },
      { description: 'Installation', unitPrice: 200, cost: 50 },
    ],
    expenseCategories: ['materials', 'ink', 'equipment', 'labor', 'install', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Producing' },
      { value: 'completed', label: 'Installed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: '3d_printing', name: '3D Printing / Prototyping', icon: '🖨️',
    quoteLineItemDefaults: [
      { description: 'Prototype (per unit)', unitPrice: 150, cost: 30 },
      { description: 'Batch production (per unit)', unitPrice: 25, cost: 5 },
      { description: 'Design / CAD work (per hour)', unitPrice: 85, cost: 0 },
      { description: 'Material surcharge', unitPrice: 20, cost: 10 },
      { description: 'Rush order', unitPrice: 75, cost: 0 },
    ],
    expenseCategories: ['filament', 'resin', 'equipment', 'software', 'shipping', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Queued' }, { value: 'in_progress', label: 'Printing' },
      { value: 'completed', label: 'Shipped' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'drone_services', name: 'Drone / Aerial Services', icon: '🛸',
    quoteLineItemDefaults: [
      { description: 'Aerial photography', unitPrice: 250, cost: 20 },
      { description: 'Real estate flyover', unitPrice: 200, cost: 15 },
      { description: 'Roof / inspection survey', unitPrice: 175, cost: 10 },
      { description: 'Mapping / 3D scan', unitPrice: 500, cost: 40 },
      { description: 'Event coverage (per hour)', unitPrice: 200, cost: 15 },
    ],
    expenseCategories: ['equipment', 'batteries', 'insurance', 'travel', 'software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Flying' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Flights', quotes: 'Packages', customers: 'Clients' },
  },
  {
    id: 'mobile_notary', name: 'Mobile Notary / Loan Signing', icon: '📝',
    quoteLineItemDefaults: [
      { description: 'Notarization (per signature)', unitPrice: 15, cost: 0 },
      { description: 'Loan signing package', unitPrice: 150, cost: 10 },
      { description: 'Travel fee', unitPrice: 50, cost: 15 },
      { description: 'After-hours surcharge', unitPrice: 25, cost: 0 },
      { description: 'Apostille service', unitPrice: 75, cost: 20 },
    ],
    expenseCategories: ['supplies', 'travel', 'insurance', 'marketing', 'software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Signing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Fee Schedule', customers: 'Signers' },
  },
  {
    id: 'cleaning_commercial', name: 'Commercial / Janitorial Cleaning', icon: '🏢',
    quoteLineItemDefaults: [
      { description: 'Office cleaning (per visit)', unitPrice: 200, cost: 60 },
      { description: 'Floor stripping & waxing', unitPrice: 500, cost: 120 },
      { description: 'Carpet cleaning (per room)', unitPrice: 75, cost: 20 },
      { description: 'Window cleaning (per pane)', unitPrice: 5, cost: 1 },
      { description: 'Monthly contract', unitPrice: 800, cost: 250 },
    ],
    expenseCategories: ['supplies', 'equipment', 'labor', 'vehicle', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Cleaning' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Cleanings', quotes: 'Contracts', customers: 'Facilities' },
  },
  {
    id: 'snow_removal', name: 'Snow Removal / Ice Management', icon: '❄️',
    quoteLineItemDefaults: [
      { description: 'Driveway plowing', unitPrice: 50, cost: 12 },
      { description: 'Parking lot (per push)', unitPrice: 200, cost: 50 },
      { description: 'Salting / de-icing', unitPrice: 100, cost: 30 },
      { description: 'Sidewalk shoveling', unitPrice: 35, cost: 8 },
      { description: 'Seasonal contract', unitPrice: 1500, cost: 400 },
    ],
    expenseCategories: ['salt', 'fuel', 'equipment', 'labor', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Triggered' }, { value: 'in_progress', label: 'Clearing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Calls', quotes: 'Contracts', customers: 'Clients' },
  },
  {
    id: 'fire_protection', name: 'Fire Protection / Sprinkler', icon: '🔥',
    quoteLineItemDefaults: [
      { description: 'Fire extinguisher inspection', unitPrice: 25, cost: 3 },
      { description: 'Sprinkler inspection', unitPrice: 200, cost: 40 },
      { description: 'Sprinkler installation', unitPrice: 3000, cost: 1200 },
      { description: 'Alarm system install', unitPrice: 1500, cost: 600 },
      { description: 'Annual certification', unitPrice: 300, cost: 50 },
    ],
    expenseCategories: ['parts', 'equipment', 'permits', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Inspecting' },
      { value: 'completed', label: 'Certified' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Inspections', quotes: 'Quotes', customers: 'Facilities' },
  },
  {
    id: 'elevator_service', name: 'Elevator / Lift Service', icon: '🛗',
    quoteLineItemDefaults: [
      { description: 'Inspection', unitPrice: 250, cost: 50 },
      { description: 'Maintenance visit', unitPrice: 300, cost: 75 },
      { description: 'Repair (per hour)', unitPrice: 150, cost: 60 },
      { description: 'Modernization quote', unitPrice: 5000, cost: 2000 },
      { description: 'Annual service contract', unitPrice: 1200, cost: 300 },
    ],
    expenseCategories: ['parts', 'equipment', 'labor', 'permits', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Servicing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Quotes', customers: 'Buildings' },
  },
  {
    id: 'wellness_retreat', name: 'Wellness Retreat / Yoga Studio', icon: '🧘',
    quoteLineItemDefaults: [
      { description: 'Drop-in class', unitPrice: 20, cost: 0 },
      { description: 'Monthly unlimited', unitPrice: 120, cost: 0 },
      { description: 'Private session', unitPrice: 80, cost: 0 },
      { description: 'Retreat weekend', unitPrice: 350, cost: 100 },
      { description: 'Teacher training', unitPrice: 2500, cost: 500 },
    ],
    expenseCategories: ['studio rent', 'equipment', 'marketing', 'insurance', 'supplies', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Session' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Classes', quotes: 'Memberships', customers: 'Students' },
  },
  {
    id: 'farmers_market', name: 'Farmers Market / Vendor', icon: '🌽',
    quoteLineItemDefaults: [
      { description: 'Market booth (per week)', unitPrice: 50, cost: 10 },
      { description: 'Produce basket', unitPrice: 25, cost: 8 },
      { description: 'CSA share (seasonal)', unitPrice: 300, cost: 100 },
      { description: 'Wholesale order', unitPrice: 200, cost: 75 },
    ],
    expenseCategories: ['seeds', 'supplies', 'transport', 'booth fees', 'packaging', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Planted' }, { value: 'in_progress', label: 'Harvesting' },
      { value: 'completed', label: 'Sold' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Price List', customers: 'Customers' },
  },
  {
    id: 'custom_furniture', name: 'Custom Furniture / Woodworking', icon: '🪑',
    quoteLineItemDefaults: [
      { description: 'Custom table', unitPrice: 1500, cost: 400 },
      { description: 'Built-in shelving', unitPrice: 800, cost: 200 },
      { description: 'Restoration / refinishing', unitPrice: 400, cost: 80 },
      { description: 'Design consultation', unitPrice: 100, cost: 0 },
      { description: 'Delivery & setup', unitPrice: 150, cost: 40 },
    ],
    expenseCategories: ['lumber', 'hardware', 'finishes', 'tools', 'delivery', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Commissioned' }, { value: 'in_progress', label: 'Building' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Commissions', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'glass_repair', name: 'Glass / Window Repair', icon: '🪟',
    quoteLineItemDefaults: [
      { description: 'Window pane replacement', unitPrice: 200, cost: 60 },
      { description: 'Shower door install', unitPrice: 800, cost: 300 },
      { description: 'Mirror installation', unitPrice: 150, cost: 40 },
      { description: 'Auto glass repair', unitPrice: 100, cost: 25 },
      { description: 'Emergency board-up', unitPrice: 250, cost: 50 },
    ],
    expenseCategories: ['glass', 'hardware', 'labor', 'vehicle', 'tools', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'hvac_commercial', name: 'Commercial HVAC', icon: '❄️',
    quoteLineItemDefaults: [
      { description: 'System inspection', unitPrice: 200, cost: 40 },
      { description: 'Maintenance contract (annual)', unitPrice: 1500, cost: 400 },
      { description: 'Unit replacement', unitPrice: 8000, cost: 4000 },
      { description: 'Duct cleaning', unitPrice: 500, cost: 100 },
      { description: 'Emergency repair', unitPrice: 350, cost: 80 },
    ],
    expenseCategories: ['parts', 'refrigerant', 'equipment', 'labor', 'permits', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Servicing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Proposals', customers: 'Facilities' },
  },
  {
    id: 'plumbing_commercial', name: 'Commercial Plumbing', icon: '🔧',
    quoteLineItemDefaults: [
      { description: 'Emergency service call', unitPrice: 250, cost: 60 },
      { description: 'Backflow testing', unitPrice: 150, cost: 30 },
      { description: 'Water heater install (commercial)', unitPrice: 3500, cost: 1800 },
      { description: 'Sewer line camera inspection', unitPrice: 300, cost: 40 },
      { description: 'Grease trap cleaning', unitPrice: 200, cost: 50 },
    ],
    expenseCategories: ['parts', 'equipment', 'permits', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Bids', customers: 'Facilities' },
  },
  {
    id: 'electrical_commercial', name: 'Commercial Electrical', icon: '⚡',
    quoteLineItemDefaults: [
      { description: 'Electrical inspection', unitPrice: 200, cost: 40 },
      { description: 'Panel upgrade (commercial)', unitPrice: 5000, cost: 2500 },
      { description: 'Lighting retrofit', unitPrice: 3000, cost: 1200 },
      { description: 'Emergency generator install', unitPrice: 8000, cost: 4000 },
      { description: 'Code compliance audit', unitPrice: 500, cost: 100 },
    ],
    expenseCategories: ['materials', 'permits', 'equipment', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Wiring' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Bids', customers: 'Facilities' },
  },
  {
    id: 'parking_lot', name: 'Parking Lot / Striping', icon: '🅿️',
    quoteLineItemDefaults: [
      { description: 'Line striping (per stall)', unitPrice: 5, cost: 1 },
      { description: 'Sealcoating (per sq ft)', unitPrice: 0.25, cost: 0.08 },
      { description: 'Pothole repair', unitPrice: 150, cost: 50 },
      { description: 'Signage installation', unitPrice: 200, cost: 60 },
      { description: 'ADA compliance upgrade', unitPrice: 800, cost: 250 },
    ],
    expenseCategories: ['paint', 'sealant', 'materials', 'equipment', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Striping' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Property Managers' },
  },
  {
    id: 'dumpster_rental', name: 'Dumpster Rental / Waste', icon: '🗑️',
    quoteLineItemDefaults: [
      { description: '10-yard dumpster (per week)', unitPrice: 300, cost: 80 },
      { description: '20-yard dumpster (per week)', unitPrice: 400, cost: 120 },
      { description: '30-yard dumpster (per week)', unitPrice: 500, cost: 160 },
      { description: 'Extra weight (per ton)', unitPrice: 50, cost: 20 },
      { description: 'Same-day delivery', unitPrice: 75, cost: 20 },
    ],
    expenseCategories: ['fuel', 'dump fees', 'equipment', 'maintenance', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Delivered' },
      { value: 'completed', label: 'Picked Up' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Deliveries', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'fencing_commercial', name: 'Commercial Fencing', icon: '🏗️',
    quoteLineItemDefaults: [
      { description: 'Chain link (per linear ft)', unitPrice: 18, cost: 8 },
      { description: 'Security fencing (per linear ft)', unitPrice: 45, cost: 20 },
      { description: 'Gate operator install', unitPrice: 2500, cost: 1000 },
      { description: 'Barbed wire (per linear ft)', unitPrice: 8, cost: 3 },
      { description: 'Access control integration', unitPrice: 3000, cost: 1200 },
    ],
    expenseCategories: ['materials', 'concrete', 'hardware', 'labor', 'permits', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Bids', customers: 'Facilities' },
  },
  {
    id: 'paving', name: 'Paving / Asphalt', icon: '🛤️',
    quoteLineItemDefaults: [
      { description: 'Asphalt paving (per sq ft)', unitPrice: 3, cost: 1.20 },
      { description: 'Sealcoating (per sq ft)', unitPrice: 0.25, cost: 0.08 },
      { description: 'Crack filling (per linear ft)', unitPrice: 2, cost: 0.50 },
      { description: 'Grading & prep', unitPrice: 500, cost: 150 },
      { description: 'Driveway (per sq ft)', unitPrice: 4, cost: 1.50 },
    ],
    expenseCategories: ['asphalt', 'equipment', 'labor', 'fuel', 'permits', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Paving' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Bids', customers: 'Clients' },
  },
  {
    id: 'excavation', name: 'Excavation / Grading', icon: '🚜',
    quoteLineItemDefaults: [
      { description: 'Excavation (per cubic yard)', unitPrice: 8, cost: 3 },
      { description: 'Grading (per sq ft)', unitPrice: 1.50, cost: 0.50 },
      { description: 'Foundation dig', unitPrice: 3000, cost: 1000 },
      { description: 'Septic system install', unitPrice: 5000, cost: 2000 },
      { description: 'Operator (per hour)', unitPrice: 125, cost: 55 },
    ],
    expenseCategories: ['fuel', 'equipment', 'labor', 'permits', 'dump fees', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Digging' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Bids', customers: 'Clients' },
  },
  {
    id: 'ironwork', name: 'Iron / Metal Fabrication', icon: '⚒️',
    quoteLineItemDefaults: [
      { description: 'Custom railing (per linear ft)', unitPrice: 60, cost: 20 },
      { description: 'Security gate', unitPrice: 1500, cost: 500 },
      { description: 'Structural steel (per lb)', unitPrice: 3, cost: 1 },
      { description: 'Welding repair (per hour)', unitPrice: 95, cost: 35 },
      { description: 'Ornamental ironwork', unitPrice: 800, cost: 250 },
    ],
    expenseCategories: ['steel', 'hardware', 'equipment', 'labor', 'permits', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Fabricating' },
      { value: 'completed', label: 'Installed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'drywall', name: 'Drywall / Plastering', icon: '🏗️',
    quoteLineItemDefaults: [
      { description: 'Drywall install (per sheet)', unitPrice: 35, cost: 10 },
      { description: 'Taping & mudding (per sheet)', unitPrice: 15, cost: 3 },
      { description: 'Texture application', unitPrice: 2, cost: 0.40 },
      { description: 'Plaster repair', unitPrice: 200, cost: 40 },
      { description: 'Water damage patch', unitPrice: 350, cost: 80 },
    ],
    expenseCategories: ['drywall', 'mud', 'tape', 'labor', 'tools', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Hanging' },
      { value: 'completed', label: 'Finished' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'tile_stone', name: 'Tile / Stone Installer', icon: '🪨',
    quoteLineItemDefaults: [
      { description: 'Floor tile (per sq ft)', unitPrice: 12, cost: 4 },
      { description: 'Shower tile (per sq ft)', unitPrice: 18, cost: 6 },
      { description: 'Countertop install', unitPrice: 80, cost: 30 },
      { description: 'Backsplash (per sq ft)', unitPrice: 15, cost: 5 },
      { description: 'Stone restoration', unitPrice: 10, cost: 3 },
    ],
    expenseCategories: ['tile', 'stone', 'thinset', 'grout', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Tiling' },
      { value: 'completed', label: 'Grouted & Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'insulation', name: 'Insulation Installer', icon: '🧊',
    quoteLineItemDefaults: [
      { description: 'Blown-in attic (per sq ft)', unitPrice: 2, cost: 0.60 },
      { description: 'Spray foam (per sq ft)', unitPrice: 4, cost: 1.50 },
      { description: 'Batt insulation (per sq ft)', unitPrice: 1.50, cost: 0.50 },
      { description: 'Crawl space encapsulation', unitPrice: 3000, cost: 1200 },
      { description: 'Insulation removal', unitPrice: 1500, cost: 500 },
    ],
    expenseCategories: ['insulation', 'equipment', 'labor', 'disposal', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'water_treatment', name: 'Water Treatment / Filtration', icon: '💧',
    quoteLineItemDefaults: [
      { description: 'Water test', unitPrice: 75, cost: 15 },
      { description: 'Whole-house filter install', unitPrice: 1200, cost: 400 },
      { description: 'Water softener install', unitPrice: 1800, cost: 700 },
      { description: 'UV purification system', unitPrice: 1500, cost: 600 },
      { description: 'Annual maintenance', unitPrice: 200, cost: 40 },
    ],
    expenseCategories: ['equipment', 'filters', 'parts', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'generac_generator', name: 'Generator Install / Service', icon: '🔌',
    quoteLineItemDefaults: [
      { description: 'Standby generator install', unitPrice: 5000, cost: 2500 },
      { description: 'Generator maintenance', unitPrice: 200, cost: 40 },
      { description: 'Transfer switch install', unitPrice: 800, cost: 300 },
      { description: 'Load bank test', unitPrice: 150, cost: 30 },
      { description: 'Annual service contract', unitPrice: 400, cost: 80 },
    ],
    expenseCategories: ['generators', 'parts', 'equipment', 'permits', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'awnings_shades', name: 'Awnings / Window Shades', icon: '☂️',
    quoteLineItemDefaults: [
      { description: 'Retractable awning', unitPrice: 2500, cost: 1000 },
      { description: 'Fixed awning', unitPrice: 1500, cost: 600 },
      { description: 'Window shades (per window)', unitPrice: 200, cost: 75 },
      { description: 'Motorized shade', unitPrice: 400, cost: 150 },
      { description: 'Repair / re-cover', unitPrice: 300, cost: 80 },
    ],
    expenseCategories: ['fabric', 'hardware', 'motors', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'closet_org', name: 'Closet / Organization Systems', icon: '🗄️',
    quoteLineItemDefaults: [
      { description: 'Walk-in closet system', unitPrice: 2500, cost: 800 },
      { description: 'Reach-in closet', unitPrice: 800, cost: 250 },
      { description: 'Garage organization', unitPrice: 1500, cost: 500 },
      { description: 'Pantry system', unitPrice: 600, cost: 200 },
      { description: 'Custom shelving', unitPrice: 400, cost: 120 },
    ],
    expenseCategories: ['materials', 'hardware', 'labor', 'vehicle', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'smart_home', name: 'Smart Home / Home Automation', icon: '🏠',
    quoteLineItemDefaults: [
      { description: 'Smart thermostat install', unitPrice: 250, cost: 80 },
      { description: 'Security camera system', unitPrice: 1200, cost: 400 },
      { description: 'Whole-home automation', unitPrice: 5000, cost: 2000 },
      { description: 'Smart lighting setup', unitPrice: 500, cost: 150 },
      { description: 'Network / WiFi optimization', unitPrice: 300, cost: 50 },
    ],
    expenseCategories: ['equipment', 'cables', 'labor', 'software', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'ev_charger', name: 'EV Charger Installer', icon: '🔋',
    quoteLineItemDefaults: [
      { description: 'Level 2 charger install', unitPrice: 1200, cost: 400 },
      { description: 'Panel upgrade (if needed)', unitPrice: 2000, cost: 800 },
      { description: 'Commercial charger', unitPrice: 5000, cost: 2000 },
      { description: 'Trenching / conduit', unitPrice: 500, cost: 150 },
      { description: 'Permit & inspection', unitPrice: 200, cost: 100 },
    ],
    expenseCategories: ['chargers', 'materials', 'permits', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'dumpster_diving', name: 'Junk Removal / Hauling', icon: '♻️',
    quoteLineItemDefaults: [
      { description: 'Single item pickup', unitPrice: 75, cost: 15 },
      { description: 'Truck load (per load)', unitPrice: 350, cost: 80 },
      { description: 'Cleanout (full day)', unitPrice: 800, cost: 200 },
      { description: 'Appliance removal', unitPrice: 100, cost: 20 },
      { description: 'Donation drop-off', unitPrice: 50, cost: 10 },
    ],
    expenseCategories: ['fuel', 'dump fees', 'labor', 'vehicle', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Hauling' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Pickups', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'maid_service', name: 'Maid / Housekeeping Service', icon: '🧹',
    quoteLineItemDefaults: [
      { description: 'Regular cleaning (per visit)', unitPrice: 120, cost: 30 },
      { description: 'Deep clean', unitPrice: 250, cost: 60 },
      { description: 'Move-in/out clean', unitPrice: 350, cost: 80 },
      { description: 'Laundry & ironing', unitPrice: 50, cost: 10 },
      { description: 'Organizing add-on', unitPrice: 75, cost: 15 },
    ],
    expenseCategories: ['supplies', 'labor', 'vehicle', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Cleaning' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Cleanings', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'nanny_babysitter', name: 'Nanny / Babysitting Agency', icon: '👶',
    quoteLineItemDefaults: [
      { description: 'Nanny placement (one-time)', unitPrice: 2000, cost: 200 },
      { description: 'Babysitting (per hour)', unitPrice: 20, cost: 12 },
      { description: 'Overnight care', unitPrice: 200, cost: 100 },
      { description: 'Nanny share (per family)', unitPrice: 10, cost: 5 },
      { description: 'Background check fee', unitPrice: 75, cost: 30 },
    ],
    expenseCategories: ['insurance', 'marketing', 'background checks', 'software', 'admin', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Caring' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Placements', quotes: 'Rates', customers: 'Families' },
  },
  {
    id: 'tutoring_center', name: 'Tutoring Center / Learning Lab', icon: '📖',
    quoteLineItemDefaults: [
      { description: 'Assessment test', unitPrice: 50, cost: 5 },
      { description: 'Individual session (per hour)', unitPrice: 65, cost: 20 },
      { description: 'Small group (per student)', unitPrice: 35, cost: 10 },
      { description: 'Monthly unlimited', unitPrice: 400, cost: 100 },
      { description: 'SAT/ACT prep course', unitPrice: 800, cost: 150 },
    ],
    expenseCategories: ['materials', 'software', 'rent', 'labor', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Tutoring' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Sessions', quotes: 'Programs', customers: 'Students' },
  },
  {
    id: 'daycare', name: 'Daycare / Childcare Center', icon: '🧒',
    quoteLineItemDefaults: [
      { description: 'Full-time (per week)', unitPrice: 250, cost: 100 },
      { description: 'Part-time (per week)', unitPrice: 150, cost: 60 },
      { description: 'Drop-in (per day)', unitPrice: 60, cost: 20 },
      { description: 'Registration fee', unitPrice: 100, cost: 10 },
      { description: 'Late pickup fee', unitPrice: 1, cost: 0 },
    ],
    expenseCategories: ['supplies', 'food', 'insurance', 'rent', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Enrolled' }, { value: 'in_progress', label: 'In Care' },
      { value: 'completed', label: 'Picked Up' }, { value: 'cancelled', label: 'Withdrawn' },
    ],
    terminology: { jobs: 'Enrollments', quotes: 'Rates', customers: 'Families' },
  },
  {
    id: 'summer_camp', name: 'Summer Camp / Youth Programs', icon: '🏕️',
    quoteLineItemDefaults: [
      { description: 'Day camp (per week)', unitPrice: 300, cost: 100 },
      { description: 'Overnight camp (per week)', unitPrice: 800, cost: 300 },
      { description: 'Specialty camp (STEM, arts)', unitPrice: 400, cost: 120 },
      { description: 'Early bird discount', unitPrice: -50, cost: 0 },
      { description: 'Sibling discount', unitPrice: -25, cost: 0 },
    ],
    expenseCategories: ['supplies', 'food', 'insurance', 'transport', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Enrolled' }, { value: 'in_progress', label: 'At Camp' },
      { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Registrations', quotes: 'Programs', customers: 'Families' },
  },
  {
    id: 'vending', name: 'Vending Machine Business', icon: '🏧',
    quoteLineItemDefaults: [
      { description: 'Machine placement (per month)', unitPrice: 100, cost: 20 },
      { description: 'Commission to location (%)', unitPrice: 15, cost: 15 },
      { description: 'Restocking visit', unitPrice: 50, cost: 10 },
      { description: 'Machine repair', unitPrice: 150, cost: 40 },
      { description: 'New machine install', unitPrice: 200, cost: 50 },
    ],
    expenseCategories: ['inventory', 'fuel', 'parts', 'commissions', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Route Day' }, { value: 'in_progress', label: 'Restocking' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Removed' },
    ],
    terminology: { jobs: 'Stops', quotes: 'Contracts', customers: 'Locations' },
  },
  {
    id: 'atm_business', name: 'ATM Business / Cash Machines', icon: '🏧',
    quoteLineItemDefaults: [
      { description: 'ATM placement (per month)', unitPrice: 150, cost: 30 },
      { description: 'Cash loading visit', unitPrice: 50, cost: 10 },
      { description: 'Machine repair', unitPrice: 200, cost: 60 },
      { description: 'Transaction fee revenue', unitPrice: 3, cost: 0.50 },
      { description: 'New location setup', unitPrice: 300, cost: 80 },
    ],
    expenseCategories: ['cash', 'fuel', 'parts', 'commissions', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Route Day' }, { value: 'in_progress', label: 'Loading' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Removed' },
    ],
    terminology: { jobs: 'Stops', quotes: 'Contracts', customers: 'Locations' },
  },
  {
    id: 'laundromat_route', name: 'Laundromat Route / Wash-Dry-Fold', icon: '👕',
    quoteLineItemDefaults: [
      { description: 'Pickup & delivery (per bag)', unitPrice: 25, cost: 8 },
      { description: 'Wash-dry-fold (per lb)', unitPrice: 1.50, cost: 0.40 },
      { description: 'Commercial linen service', unitPrice: 100, cost: 30 },
      { description: 'Subscription plan (per week)', unitPrice: 40, cost: 12 },
    ],
    expenseCategories: ['supplies', 'fuel', 'equipment', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Pickup Scheduled' }, { value: 'in_progress', label: 'Processing' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Rates', customers: 'Customers' },
  },
  {
    id: 'carpet_cleaning', name: 'Carpet / Upholstery Cleaning', icon: '🧹',
    quoteLineItemDefaults: [
      { description: 'Carpet cleaning (per room)', unitPrice: 75, cost: 15 },
      { description: 'Staircase', unitPrice: 75, cost: 15 },
      { description: 'Upholstery (per piece)', unitPrice: 100, cost: 20 },
      { description: 'Area rug cleaning', unitPrice: 150, cost: 30 },
      { description: 'Pet stain treatment', unitPrice: 50, cost: 10 },
    ],
    expenseCategories: ['chemicals', 'equipment', 'labor', 'vehicle', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Cleaning' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'chimney', name: 'Chimney Sweep / Fireplace', icon: '🔥',
    quoteLineItemDefaults: [
      { description: 'Chimney sweep', unitPrice: 200, cost: 30 },
      { description: 'Inspection (Level 1)', unitPrice: 150, cost: 20 },
      { description: 'Cap installation', unitPrice: 250, cost: 80 },
      { description: 'Liner repair', unitPrice: 2000, cost: 800 },
      { description: 'Masonry repair', unitPrice: 500, cost: 150 },
    ],
    expenseCategories: ['supplies', 'equipment', 'labor', 'vehicle', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Sweeping' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'fence_staining', name: 'Fence / Deck Staining', icon: '🎨',
    quoteLineItemDefaults: [
      { description: 'Fence staining (per linear ft)', unitPrice: 4, cost: 1 },
      { description: 'Deck staining (per sq ft)', unitPrice: 3, cost: 0.80 },
      { description: 'Power wash + stain', unitPrice: 5, cost: 1.50 },
      { description: 'Prep & repair', unitPrice: 200, cost: 50 },
    ],
    expenseCategories: ['stain', 'supplies', 'equipment', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Staining' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'holiday_lighting', name: 'Holiday Lighting / Decor', icon: '🎄',
    quoteLineItemDefaults: [
      { description: 'Roofline lights', unitPrice: 500, cost: 120 },
      { description: 'Tree wrapping', unitPrice: 200, cost: 50 },
      { description: 'Full property display', unitPrice: 2000, cost: 500 },
      { description: 'Takedown & storage', unitPrice: 300, cost: 60 },
      { description: 'Commercial display', unitPrice: 5000, cost: 1500 },
    ],
    expenseCategories: ['lights', 'hardware', 'labor', 'vehicle', 'storage', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Installing' },
      { value: 'completed', label: 'Lit' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Installations', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'gunsmith', name: 'Gunsmith / Firearms', icon: '🔫',
    quoteLineItemDefaults: [
      { description: 'Cleaning & inspection', unitPrice: 50, cost: 5 },
      { description: 'Trigger job', unitPrice: 100, cost: 15 },
      { description: 'Barrel threading', unitPrice: 125, cost: 20 },
      { description: 'Cerakote coating', unitPrice: 200, cost: 40 },
      { description: 'FFL transfer fee', unitPrice: 25, cost: 5 },
    ],
    expenseCategories: ['parts', 'supplies', 'tools', 'insurance', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Received' }, { value: 'in_progress', label: 'Working' },
      { value: 'completed', label: 'Ready' }, { value: 'cancelled', label: 'Returned' },
    ],
    terminology: { jobs: 'Work Orders', quotes: 'Quotes', customers: 'Customers' },
  },
  {
    id: 'screen_printing', name: 'Screen Printing / Embroidery', icon: '🖨️',
    quoteLineItemDefaults: [
      { description: 'T-shirt print (per shirt)', unitPrice: 12, cost: 3 },
      { description: 'Embroidery (per item)', unitPrice: 15, cost: 4 },
      { description: 'Hat embroidery', unitPrice: 10, cost: 3 },
      { description: 'Setup fee', unitPrice: 50, cost: 0 },
      { description: 'Bulk order (100+ shirts)', unitPrice: 8, cost: 2 },
    ],
    expenseCategories: ['blanks', 'ink', 'thread', 'equipment', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Printing' },
      { value: 'completed', label: 'Shipped' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Quotes', customers: 'Clients' },
  },
  {
    id: 'cannabis', name: 'Cannabis / Dispensary', icon: '🌿',
    quoteLineItemDefaults: [
      { description: 'Eighth (3.5g)', unitPrice: 40, cost: 12 },
      { description: 'Quarter (7g)', unitPrice: 70, cost: 22 },
      { description: 'Edible (per pack)', unitPrice: 25, cost: 8 },
      { description: 'Concentrate (per gram)', unitPrice: 50, cost: 15 },
      { description: 'Pre-roll (each)', unitPrice: 10, cost: 3 },
    ],
    expenseCategories: ['inventory', 'packaging', 'compliance', 'labor', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Processing' },
      { value: 'completed', label: 'Fulfilled' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Menu', customers: 'Patients / Customers' },
  },
  {
    id: 'firewood', name: 'Firewood / Log Splitting', icon: '🪵',
    quoteLineItemDefaults: [
      { description: 'Face cord', unitPrice: 150, cost: 30 },
      { description: 'Full cord', unitPrice: 350, cost: 70 },
      { description: 'Delivery fee', unitPrice: 50, cost: 15 },
      { description: 'Stacking service', unitPrice: 50, cost: 10 },
      { description: 'Kindling bundle', unitPrice: 8, cost: 1 },
    ],
    expenseCategories: ['fuel', 'equipment', 'vehicle', 'labor', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Splitting' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Price List', customers: 'Customers' },
  },
  {
    id: 'ice_cream', name: 'Ice Cream / Dessert Truck', icon: '🍦',
    quoteLineItemDefaults: [
      { description: 'Event booking (per hour)', unitPrice: 175, cost: 50 },
      { description: 'Private party', unitPrice: 600, cost: 180 },
      { description: 'Catering (per person)', unitPrice: 8, cost: 3 },
      { description: 'Festival booth', unitPrice: 400, cost: 120 },
    ],
    expenseCategories: ['ingredients', 'fuel', 'permits', 'equipment', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Serving' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Events', quotes: 'Bookings', customers: 'Clients' },
  },
  {
    id: 'bail_bonds', name: 'Bail Bonds Agent', icon: '⚖️',
    quoteLineItemDefaults: [
      { description: 'Bail bond premium (10%)', unitPrice: 1000, cost: 0 },
      { description: 'Collateral processing', unitPrice: 100, cost: 20 },
      { description: 'Skip tracing', unitPrice: 500, cost: 100 },
      { description: 'Court appearance tracking', unitPrice: 50, cost: 0 },
    ],
    expenseCategories: ['insurance', 'legal', 'marketing', 'software', 'admin', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'In Process' }, { value: 'in_progress', label: 'Posting' },
      { value: 'completed', label: 'Posted' }, { value: 'cancelled', label: 'Forfeited' },
    ],
    terminology: { jobs: 'Bonds', quotes: 'Premiums', customers: 'Defendants' },
  },
  {
    id: 'process_server', name: 'Process Server / Legal Courier', icon: '📬',
    quoteLineItemDefaults: [
      { description: 'Standard service', unitPrice: 75, cost: 15 },
      { description: 'Rush service (24hr)', unitPrice: 125, cost: 25 },
      { description: 'Skip tracing', unitPrice: 200, cost: 40 },
      { description: 'Stakeout (per hour)', unitPrice: 75, cost: 20 },
      { description: 'Court filing', unitPrice: 50, cost: 10 },
    ],
    expenseCategories: ['fuel', 'printing', 'software', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Received' }, { value: 'in_progress', label: 'Serving' },
      { value: 'completed', label: 'Served' }, { value: 'cancelled', label: 'Failed' },
    ],
    terminology: { jobs: 'Services', quotes: 'Fee Schedule', customers: 'Attorneys' },
  },
  {
    id: 'mobile_detailing', name: 'Mobile Boat / RV Detailing', icon: '🚐',
    quoteLineItemDefaults: [
      { description: 'Boat detail (basic)', unitPrice: 250, cost: 40 },
      { description: 'Boat detail (full)', unitPrice: 500, cost: 80 },
      { description: 'RV detail (basic)', unitPrice: 400, cost: 60 },
      { description: 'RV detail (full)', unitPrice: 800, cost: 120 },
      { description: 'Ceramic coating', unitPrice: 1500, cost: 300 },
    ],
    expenseCategories: ['supplies', 'fuel', 'equipment', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Detailing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Appointments', quotes: 'Quotes', customers: 'Owners' },
  },
  {
    id: 'pet_sitting', name: 'Pet Sitting / Boarding', icon: '🐾',
    quoteLineItemDefaults: [
      { description: 'Drop-in visit (30 min)', unitPrice: 25, cost: 0 },
      { description: 'Overnight stay', unitPrice: 75, cost: 10 },
      { description: 'Boarding (per night)', unitPrice: 50, cost: 15 },
      { description: 'Pet taxi', unitPrice: 30, cost: 8 },
      { description: 'Holiday surcharge', unitPrice: 15, cost: 0 },
    ],
    expenseCategories: ['supplies', 'food', 'insurance', 'marketing', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Booked' }, { value: 'in_progress', label: 'Caring' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Bookings', quotes: 'Rates', customers: 'Pet Parents' },
  },
  {
    id: 'dog_walking', name: 'Professional Dog Walking', icon: '🐕',
    quoteLineItemDefaults: [
      { description: 'Solo walk (30 min)', unitPrice: 25, cost: 0 },
      { description: 'Group walk (30 min)', unitPrice: 18, cost: 0 },
      { description: '60-min adventure walk', unitPrice: 40, cost: 0 },
      { description: 'Puppy visit', unitPrice: 20, cost: 0 },
      { description: 'Monthly package (daily)', unitPrice: 400, cost: 0 },
    ],
    expenseCategories: ['insurance', 'marketing', 'supplies', 'vehicle', 'software', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Walking' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Walks', quotes: 'Packages', customers: 'Pet Parents' },
  },
  {
    id: 'pooper_scooper', name: 'Pooper Scooper / Yard Cleanup', icon: '💩',
    quoteLineItemDefaults: [
      { description: 'One-time cleanup', unitPrice: 50, cost: 5 },
      { description: 'Weekly service', unitPrice: 15, cost: 2 },
      { description: 'Bi-weekly service', unitPrice: 20, cost: 3 },
      { description: 'Deodorizing', unitPrice: 25, cost: 5 },
    ],
    expenseCategories: ['supplies', 'fuel', 'bags', 'marketing', 'insurance', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Scooping' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Yards', quotes: 'Rates', customers: 'Pet Parents' },
  },
  {
    id: 'breeding', name: 'Dog Breeding / Kennel', icon: '🐶',
    quoteLineItemDefaults: [
      { description: 'Puppy (pet quality)', unitPrice: 2000, cost: 400 },
      { description: 'Puppy (show quality)', unitPrice: 3500, cost: 600 },
      { description: 'Stud fee', unitPrice: 1000, cost: 0 },
      { description: 'Shipping / transport', unitPrice: 500, cost: 200 },
      { description: 'Deposit (non-refundable)', unitPrice: 500, cost: 0 },
    ],
    expenseCategories: ['vet', 'food', 'supplies', 'testing', 'registration', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Reserved' }, { value: 'in_progress', label: 'Growing' },
      { value: 'completed', label: 'Placed' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Litters', quotes: 'Pricing', customers: 'Buyers' },
  },
  {
    id: 'horse_farm', name: 'Horse Farm / Equestrian Center', icon: '🐴',
    quoteLineItemDefaults: [
      { description: 'Boarding (per month)', unitPrice: 600, cost: 200 },
      { description: 'Riding lesson (per hour)', unitPrice: 65, cost: 15 },
      { description: 'Training (per month)', unitPrice: 1200, cost: 400 },
      { description: 'Farrier service', unitPrice: 150, cost: 50 },
      { description: 'Vet call', unitPrice: 200, cost: 80 },
    ],
    expenseCategories: ['feed', 'vet', 'farrier', 'bedding', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'In Care' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Services', quotes: 'Rates', customers: 'Horse Owners' },
  },
  {
    id: 'beekeeping', name: 'Beekeeping / Honey Producer', icon: '🐝',
    quoteLineItemDefaults: [
      { description: 'Honey jar (16oz)', unitPrice: 12, cost: 3 },
      { description: 'Hive removal', unitPrice: 300, cost: 50 },
      { description: 'Bee colony (nuc)', unitPrice: 200, cost: 80 },
      { description: 'Pollination service', unitPrice: 500, cost: 100 },
      { description: 'Beeswax (per lb)', unitPrice: 10, cost: 2 },
    ],
    expenseCategories: ['equipment', 'supplies', 'fuel', 'packaging', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Harvesting' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Price List', customers: 'Customers' },
  },
  {
    id: 'landscaping_commercial', name: 'Commercial Landscaping', icon: '🌿',
    quoteLineItemDefaults: [
      { description: 'Weekly maintenance', unitPrice: 500, cost: 150 },
      { description: 'Seasonal planting', unitPrice: 1000, cost: 400 },
      { description: 'Irrigation install', unitPrice: 3000, cost: 1200 },
      { description: 'Snow removal (seasonal)', unitPrice: 2000, cost: 600 },
      { description: 'Tree service', unitPrice: 800, cost: 200 },
    ],
    expenseCategories: ['plants', 'materials', 'equipment', 'labor', 'fuel', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'On Site' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Contracts', quotes: 'Bids', customers: 'Properties' },
  },
  {
    id: 'tree_farm', name: 'Tree Farm / Nursery', icon: '🌲',
    quoteLineItemDefaults: [
      { description: 'Sapling (per tree)', unitPrice: 25, cost: 5 },
      { description: 'Mature tree (installed)', unitPrice: 500, cost: 150 },
      { description: 'Shrub (per plant)', unitPrice: 30, cost: 8 },
      { description: 'Delivery & planting', unitPrice: 150, cost: 40 },
      { description: 'Landscape consultation', unitPrice: 100, cost: 0 },
    ],
    expenseCategories: ['inventory', 'soil', 'pots', 'labor', 'delivery', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Ordered' }, { value: 'in_progress', label: 'Growing' },
      { value: 'completed', label: 'Delivered' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Orders', quotes: 'Catalog', customers: 'Customers' },
  },
  {
    id: 'aquarium_service', name: 'Aquarium / Pond Service', icon: '🐟',
    quoteLineItemDefaults: [
      { description: 'Monthly maintenance', unitPrice: 100, cost: 20 },
      { description: 'Tank setup', unitPrice: 500, cost: 200 },
      { description: 'Pond install', unitPrice: 3000, cost: 1200 },
      { description: 'Fish stocking', unitPrice: 200, cost: 80 },
      { description: 'Emergency service', unitPrice: 150, cost: 30 },
    ],
    expenseCategories: ['supplies', 'fish', 'equipment', 'vehicle', 'labor', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Servicing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Quotes', customers: 'Owners' },
  },
  {
    id: 'hot_tub', name: 'Hot Tub / Spa Service', icon: '♨️',
    quoteLineItemDefaults: [
      { description: 'Monthly maintenance', unitPrice: 100, cost: 20 },
      { description: 'Drain & refill', unitPrice: 200, cost: 40 },
      { description: 'Equipment repair', unitPrice: 300, cost: 80 },
      { description: 'New installation', unitPrice: 5000, cost: 2500 },
      { description: 'Cover replacement', unitPrice: 400, cost: 150 },
    ],
    expenseCategories: ['chemicals', 'parts', 'equipment', 'labor', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Servicing' },
      { value: 'completed', label: 'Done' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Service Calls', quotes: 'Quotes', customers: 'Owners' },
  },
  {
    id: 'sauna_steam', name: 'Sauna / Steam Room Install', icon: '🧖',
    quoteLineItemDefaults: [
      { description: 'Sauna installation', unitPrice: 5000, cost: 2000 },
      { description: 'Steam shower install', unitPrice: 3000, cost: 1200 },
      { description: 'Maintenance visit', unitPrice: 150, cost: 30 },
      { description: 'Heater replacement', unitPrice: 800, cost: 350 },
      { description: 'Custom build', unitPrice: 10000, cost: 4000 },
    ],
    expenseCategories: ['materials', 'equipment', 'labor', 'permits', 'vehicle', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Building' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'outdoor_kitchen', name: 'Outdoor Kitchen / BBQ', icon: '🔥',
    quoteLineItemDefaults: [
      { description: 'Built-in grill station', unitPrice: 3000, cost: 1200 },
      { description: 'Outdoor countertop', unitPrice: 1500, cost: 600 },
      { description: 'Pizza oven install', unitPrice: 2500, cost: 1000 },
      { description: 'Sink & plumbing', unitPrice: 800, cost: 300 },
      { description: 'Full outdoor kitchen', unitPrice: 15000, cost: 6000 },
    ],
    expenseCategories: ['materials', 'equipment', 'labor', 'permits', 'gas line', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Building' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Projects', quotes: 'Quotes', customers: 'Homeowners' },
  },
  {
    id: 'other', name: 'Other / Custom', icon: '⚡',
    quoteLineItemDefaults: [
      { description: 'Service', unitPrice: 100, cost: 30 },
      { description: 'Materials', unitPrice: 50, cost: 25 },
      { description: 'Delivery', unitPrice: 25, cost: 10 },
    ],
    expenseCategories: ['materials', 'labor', 'equipment', 'travel', 'marketing', 'other'],
    jobStatusLabels: [
      { value: 'scheduled', label: 'Scheduled' }, { value: 'in_progress', label: 'Active' },
      { value: 'completed', label: 'Complete' }, { value: 'cancelled', label: 'Cancelled' },
    ],
    terminology: { jobs: 'Jobs', quotes: 'Quotes', customers: 'Customers' },
  },
];

export function getTemplate(id: string): IndustryTemplate {
  return industryTemplates.find(t => t.id === id) || industryTemplates[industryTemplates.length - 1];
}
