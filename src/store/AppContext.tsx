import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
  Customer, Quote, Job, BusinessSettings,
  Invoice, Appointment, Subscription, InventoryItem, InventoryTransaction,
  TeamMember, Attachment, MembershipPlan, CustomerMembership, Warranty,
} from '../types';
import {
  seedCustomers, seedQuotes, seedJobs, seedInvoices, seedAppointments,
  seedSubscriptions, seedInventory, seedInventoryTransactions, seedTeamMembers,
  seedMembershipPlans, seedCustomerMemberships, seedWarranties, seedSettings,
} from '../data/seed';

interface AppState {
  customers: Customer[];
  quotes: Quote[];
  jobs: Job[];
  settings: BusinessSettings;
  invoices: Invoice[];
  appointments: Appointment[];
  subscriptions: Subscription[];
  inventory: InventoryItem[];
  inventoryTransactions: InventoryTransaction[];
  teamMembers: TeamMember[];
  attachments: Attachment[];
  membershipPlans: MembershipPlan[];
  customerMemberships: CustomerMembership[];
  warranties: Warranty[];
  hydrated: boolean;
  online: boolean;
}

const defaultSettings: BusinessSettings = {
  name: '', email: '', phone: '', address: '', taxRate: 0, currency: 'USD', industry: '', onboardingComplete: false,
  brandColor: '#1e40af', brandSecondaryColor: '#10b981', logoDataUrl: '', tagline: '',
  stripePublicKey: '', quickbooksConnected: false, plan: 'free',
};

type Action =
  | { type: 'HYDRATE'; payload: Partial<AppState> }
  | { type: 'SET_ONLINE'; payload: boolean }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: Customer }
  | { type: 'DELETE_CUSTOMER'; payload: string }
  | { type: 'ADD_QUOTE'; payload: Quote }
  | { type: 'UPDATE_QUOTE'; payload: Quote }
  | { type: 'DELETE_QUOTE'; payload: string }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: BusinessSettings }
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'UPDATE_INVOICE'; payload: Invoice }
  | { type: 'DELETE_INVOICE'; payload: string }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'DELETE_APPOINTMENT'; payload: string }
  | { type: 'ADD_SUBSCRIPTION'; payload: Subscription }
  | { type: 'UPDATE_SUBSCRIPTION'; payload: Subscription }
  | { type: 'DELETE_SUBSCRIPTION'; payload: string }
  | { type: 'ADD_INVENTORY_ITEM'; payload: InventoryItem }
  | { type: 'UPDATE_INVENTORY_ITEM'; payload: InventoryItem }
  | { type: 'DELETE_INVENTORY_ITEM'; payload: string }
  | { type: 'ADD_INVENTORY_TRANSACTION'; payload: InventoryTransaction }
  | { type: 'ADD_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'UPDATE_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'DELETE_TEAM_MEMBER'; payload: string }
  | { type: 'ADD_ATTACHMENT'; payload: Attachment }
  | { type: 'DELETE_ATTACHMENT'; payload: string }
  | { type: 'ADD_MEMBERSHIP_PLAN'; payload: MembershipPlan }
  | { type: 'UPDATE_MEMBERSHIP_PLAN'; payload: MembershipPlan }
  | { type: 'DELETE_MEMBERSHIP_PLAN'; payload: string }
  | { type: 'ADD_CUSTOMER_MEMBERSHIP'; payload: CustomerMembership }
  | { type: 'UPDATE_CUSTOMER_MEMBERSHIP'; payload: CustomerMembership }
  | { type: 'DELETE_CUSTOMER_MEMBERSHIP'; payload: string }
  | { type: 'ADD_WARRANTY'; payload: Warranty }
  | { type: 'UPDATE_WARRANTY'; payload: Warranty }
  | { type: 'DELETE_WARRANTY'; payload: string };

const initialState: AppState = {
  customers: [], quotes: [], jobs: [], settings: defaultSettings,
  invoices: [], appointments: [], subscriptions: [],
  inventory: [], inventoryTransactions: [],
  teamMembers: [], attachments: [],
  membershipPlans: [], customerMemberships: [], warranties: [],
  hydrated: false, online: navigator.onLine,
};

function reducer(state: AppState, action: Action): AppState {
  let next: AppState;
  switch (action.type) {
    case 'HYDRATE': return { ...state, ...action.payload, hydrated: true };
    case 'SET_ONLINE': return { ...state, online: action.payload };
    case 'ADD_CUSTOMER': next = { ...state, customers: [...state.customers, action.payload] }; break;
    case 'UPDATE_CUSTOMER': next = { ...state, customers: state.customers.map(c => c.id === action.payload.id ? action.payload : c) }; break;
    case 'DELETE_CUSTOMER': next = { ...state, customers: state.customers.filter(c => c.id !== action.payload) }; break;
    case 'ADD_QUOTE': next = { ...state, quotes: [...state.quotes, action.payload] }; break;
    case 'UPDATE_QUOTE': next = { ...state, quotes: state.quotes.map(q => q.id === action.payload.id ? action.payload : q) }; break;
    case 'DELETE_QUOTE': next = { ...state, quotes: state.quotes.filter(q => q.id !== action.payload) }; break;
    case 'ADD_JOB': next = { ...state, jobs: [...state.jobs, action.payload] }; break;
    case 'UPDATE_JOB': next = { ...state, jobs: state.jobs.map(j => j.id === action.payload.id ? action.payload : j) }; break;
    case 'DELETE_JOB': next = { ...state, jobs: state.jobs.filter(j => j.id !== action.payload) }; break;
    case 'UPDATE_SETTINGS': next = { ...state, settings: action.payload }; break;
    case 'ADD_INVOICE': next = { ...state, invoices: [...state.invoices, action.payload] }; break;
    case 'UPDATE_INVOICE': next = { ...state, invoices: state.invoices.map(i => i.id === action.payload.id ? action.payload : i) }; break;
    case 'DELETE_INVOICE': next = { ...state, invoices: state.invoices.filter(i => i.id !== action.payload) }; break;
    case 'ADD_APPOINTMENT': next = { ...state, appointments: [...state.appointments, action.payload] }; break;
    case 'UPDATE_APPOINTMENT': next = { ...state, appointments: state.appointments.map(a => a.id === action.payload.id ? action.payload : a) }; break;
    case 'DELETE_APPOINTMENT': next = { ...state, appointments: state.appointments.filter(a => a.id !== action.payload) }; break;
    case 'ADD_SUBSCRIPTION': next = { ...state, subscriptions: [...state.subscriptions, action.payload] }; break;
    case 'UPDATE_SUBSCRIPTION': next = { ...state, subscriptions: state.subscriptions.map(s => s.id === action.payload.id ? action.payload : s) }; break;
    case 'DELETE_SUBSCRIPTION': next = { ...state, subscriptions: state.subscriptions.filter(s => s.id !== action.payload) }; break;
    case 'ADD_INVENTORY_ITEM': next = { ...state, inventory: [...state.inventory, action.payload] }; break;
    case 'UPDATE_INVENTORY_ITEM': next = { ...state, inventory: state.inventory.map(i => i.id === action.payload.id ? action.payload : i) }; break;
    case 'DELETE_INVENTORY_ITEM': next = { ...state, inventory: state.inventory.filter(i => i.id !== action.payload) }; break;
    case 'ADD_INVENTORY_TRANSACTION': next = { ...state, inventoryTransactions: [...state.inventoryTransactions, action.payload] }; break;
    case 'ADD_TEAM_MEMBER': next = { ...state, teamMembers: [...state.teamMembers, action.payload] }; break;
    case 'UPDATE_TEAM_MEMBER': next = { ...state, teamMembers: state.teamMembers.map(m => m.id === action.payload.id ? action.payload : m) }; break;
    case 'DELETE_TEAM_MEMBER': next = { ...state, teamMembers: state.teamMembers.filter(m => m.id !== action.payload) }; break;
    case 'ADD_ATTACHMENT': next = { ...state, attachments: [...state.attachments, action.payload] }; break;
    case 'DELETE_ATTACHMENT': next = { ...state, attachments: state.attachments.filter(a => a.id !== action.payload) }; break;
    case 'ADD_MEMBERSHIP_PLAN': next = { ...state, membershipPlans: [...state.membershipPlans, action.payload] }; break;
    case 'UPDATE_MEMBERSHIP_PLAN': next = { ...state, membershipPlans: state.membershipPlans.map(p => p.id === action.payload.id ? action.payload : p) }; break;
    case 'DELETE_MEMBERSHIP_PLAN': next = { ...state, membershipPlans: state.membershipPlans.filter(p => p.id !== action.payload) }; break;
    case 'ADD_CUSTOMER_MEMBERSHIP': next = { ...state, customerMemberships: [...state.customerMemberships, action.payload] }; break;
    case 'UPDATE_CUSTOMER_MEMBERSHIP': next = { ...state, customerMemberships: state.customerMemberships.map(m => m.id === action.payload.id ? action.payload : m) }; break;
    case 'DELETE_CUSTOMER_MEMBERSHIP': next = { ...state, customerMemberships: state.customerMemberships.filter(m => m.id !== action.payload) }; break;
    case 'ADD_WARRANTY': next = { ...state, warranties: [...state.warranties, action.payload] }; break;
    case 'UPDATE_WARRANTY': next = { ...state, warranties: state.warranties.map(w => w.id === action.payload.id ? action.payload : w) }; break;
    case 'DELETE_WARRANTY': next = { ...state, warranties: state.warranties.filter(w => w.id !== action.payload) }; break;
    default: return state;
  }
  persist(next);
  return next;
}

function persist(state: AppState) {
  try {
    localStorage.setItem('fieldflow', JSON.stringify({
      customers: state.customers, quotes: state.quotes, jobs: state.jobs, settings: state.settings,
      invoices: state.invoices, appointments: state.appointments, subscriptions: state.subscriptions,
      inventory: state.inventory, inventoryTransactions: state.inventoryTransactions,
      teamMembers: state.teamMembers, attachments: state.attachments,
      membershipPlans: state.membershipPlans, customerMemberships: state.customerMemberships, warranties: state.warranties,
    }));
  } catch { /* quota */ }
}

interface AppContextValue extends AppState { dispatch: React.Dispatch<Action> }
const AppContext = createContext<AppContextValue>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fieldflow');
      if (raw) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
      } else {
        // First time: load demo data so the app looks alive
        dispatch({ type: 'HYDRATE', payload: {
          customers: seedCustomers,
          quotes: seedQuotes,
          jobs: seedJobs,
          invoices: seedInvoices,
          appointments: seedAppointments,
          subscriptions: seedSubscriptions,
          inventory: seedInventory,
          inventoryTransactions: seedInventoryTransactions,
          teamMembers: seedTeamMembers,
          membershipPlans: seedMembershipPlans,
          customerMemberships: seedCustomerMemberships,
          warranties: seedWarranties,
          settings: { ...defaultSettings, ...seedSettings },
        }});
      }
    } catch { dispatch({ type: 'HYDRATE', payload: {} }); }

    const handleOnline = () => dispatch({ type: 'SET_ONLINE', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE', payload: false });
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() { return useContext(AppContext); }
