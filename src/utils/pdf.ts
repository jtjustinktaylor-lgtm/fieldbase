import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Quote, Invoice, BusinessSettings, Customer } from '../types';

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥',
  CNY: '¥', INR: '₹', MXN: '$', BRL: 'R$', KRW: '₩', CHF: 'CHF',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', CZK: 'Kč', HUF: 'Ft',
  RUB: '₽', ZAR: 'R', SGD: 'S$', HKD: 'HK$', NZD: 'NZ$', ARS: '$',
};

function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency + ' ';
}

function formatMoney(amount: number, currency: string): string {
  const sym = getCurrencySymbol(currency);
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function addHeader(doc: jsPDF, settings: BusinessSettings, docType: string, docNumber: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const brandColor = settings.brandColor || '#1e40af';
  const [r, g, b] = hexToRgb(brandColor);

  // Brand color bar at top
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(settings.name || 'Your Company', 20, 18);

  // Tagline
  if (settings.tagline) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(settings.tagline, 20, 28);
  }

  // Document type on the right
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(docType, pageWidth - 20, 20, { align: 'right' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`#${docNumber}`, pageWidth - 20, 30, { align: 'right' });

  // Reset text color
  doc.setTextColor(0, 0, 0);
}

function addBusinessInfo(doc: jsPDF, settings: BusinessSettings, startY: number): number {
  let y = startY + 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);

  const info = [
    settings.email,
    settings.phone,
    settings.address,
  ].filter(Boolean);

  for (const line of info) {
    doc.text(line!, 20, y);
    y += 4;
  }

  doc.setTextColor(0, 0, 0);
  return y;
}

function addCustomerInfo(doc: jsPDF, customer: Customer | undefined, customerName: string, startY: number, rightX: number): number {
  let y = startY + 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Bill To:', rightX, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);

  doc.text(customerName || '—', rightX, y);
  y += 4;

  if (customer) {
    if (customer.email) { doc.text(customer.email, rightX, y); y += 4; }
    if (customer.phone) { doc.text(customer.phone, rightX, y); y += 4; }
    if (customer.address) { doc.text(customer.address, rightX, y); y += 4; }
  }

  doc.setTextColor(0, 0, 0);
  return y;
}

function addLineItemsTable(
  doc: jsPDF,
  items: { description: string; quantity: number; unitPrice: number; total: number }[],
  currency: string,
  startY: number,
) {
  const brandColor = '#1e40af';
  const [r, g, b] = hexToRgb(brandColor);

  autoTable(doc, {
    startY,
    head: [['#', 'Description', 'Qty', 'Unit Price', 'Total']],
    body: items.map((item, i) => [
      String(i + 1),
      item.description || '—',
      String(item.quantity),
      formatMoney(item.unitPrice, currency),
      formatMoney(item.total, currency),
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [r, g, b],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 35, halign: 'right' },
      4: { cellWidth: 35, halign: 'right' },
    },
    margin: { left: 20, right: 20 },
  });

  return (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
}

function addTotals(
  doc: jsPDF,
  subtotal: number,
  taxRate: number,
  tax: number,
  total: number,
  currency: string,
  startY: number,
  additionalLines?: { label: string; value: string; color?: [number, number, number] }[],
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const rightX = pageWidth - 20;
  let y = startY + 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);

  // Subtotal
  doc.text('Subtotal', rightX - 60, y, { align: 'right' });
  doc.text(formatMoney(subtotal, currency), rightX, y, { align: 'right' });
  y += 5;

  // Tax
  doc.text(`Tax (${taxRate}%)`, rightX - 60, y, { align: 'right' });
  doc.text(formatMoney(tax, currency), rightX, y, { align: 'right' });
  y += 5;

  // Additional lines (e.g., amount paid, amount due)
  if (additionalLines) {
    for (const line of additionalLines) {
      if (line.color) {
        doc.setTextColor(line.color[0], line.color[1], line.color[2]);
      } else {
        doc.setTextColor(100, 100, 100);
      }
      doc.text(line.label, rightX - 60, y, { align: 'right' });
      doc.text(line.value, rightX, y, { align: 'right' });
      y += 5;
    }
  }

  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(rightX - 70, y, rightX, y);
  y += 5;

  // Total
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Total', rightX - 60, y, { align: 'right' });
  doc.text(formatMoney(total, currency), rightX, y, { align: 'right' });

  return y;
}

function addNotes(doc: jsPDF, notes: string, startY: number) {
  if (!notes) return startY;
  let y = startY + 12;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Notes:', 20, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const lines = doc.splitTextToSize(notes, doc.internal.pageSize.getWidth() - 40);
  doc.text(lines, 20, y);

  return y + lines.length * 4;
}

function addFooter(doc: jsPDF, settings: BusinessSettings) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Generated by FieldFlow — ${settings.name || 'Your Company'}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' },
  );
}

// ─── Public API ───────────────────────────────────────────────────────

export function generateQuotePDF(
  quote: Quote,
  customer: Customer | undefined,
  settings: BusinessSettings,
): void {
  const doc = new jsPDF();
  const currency = settings.currency || 'USD';
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  addHeader(doc, settings, 'QUOTE', quote.id.slice(0, 8).toUpperCase());

  // Business & Customer info
  const infoBottom = Math.max(
    addBusinessInfo(doc, settings, 40),
    addCustomerInfo(doc, customer, quote.customerName, 40, pageWidth - 80),
  );

  // Quote meta
  let y = infoBottom + 6;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Date: ${formatDate(quote.createdAt)}`, 20, y);
  doc.text(`Valid Until: ${formatDate(quote.validUntil)}`, pageWidth - 80, y);
  y += 4;
  doc.text(`Status: ${quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}`, 20, y);
  if (quote.winProbability !== undefined) {
    doc.text(`Win Probability: ${quote.winProbability}%`, pageWidth - 80, y);
  }
  y += 4;

  // Description
  if (quote.description) {
    y += 4;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(quote.description, pageWidth - 40);
    doc.text(descLines, 20, y);
    y += descLines.length * 4;
  }

  // Title
  if (quote.title) {
    y += 6;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(quote.title, 20, y);
    y += 2;
  }

  // Line items
  const subtotal = quote.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
  const tax = subtotal * (quote.taxRate / 100);
  const total = subtotal + tax;

  const tableItems = quote.lineItems.map(li => ({
    description: li.description,
    quantity: li.quantity,
    unitPrice: li.unitPrice,
    total: li.quantity * li.unitPrice,
  }));

  const tableBottom = addLineItemsTable(doc, tableItems, currency, y + 6);

  // Totals
  const totalsBottom = addTotals(doc, subtotal, quote.taxRate, tax, total, currency, tableBottom);

  // Notes
  addNotes(doc, quote.notes, totalsBottom);

  // Footer
  addFooter(doc, settings);

  // Save
  const filename = `Quote-${quote.customerName || 'Customer'}-${quote.id.slice(0, 8)}.pdf`;
  doc.save(filename);
}

export function generateInvoicePDF(
  invoice: Invoice,
  customer: Customer | undefined,
  settings: BusinessSettings,
): void {
  const doc = new jsPDF();
  const currency = settings.currency || 'USD';
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  addHeader(doc, settings, 'INVOICE', invoice.id.slice(0, 8).toUpperCase());

  // Business & Customer info
  const infoBottom = Math.max(
    addBusinessInfo(doc, settings, 40),
    addCustomerInfo(doc, customer, invoice.customerName, 40, pageWidth - 80),
  );

  // Invoice meta
  let y = infoBottom + 6;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Issue Date: ${formatDate(invoice.issueDate)}`, 20, y);
  doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, pageWidth - 80, y);
  y += 4;
  doc.text(`Status: ${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}`, 20, y);
  y += 4;

  // Title
  if (invoice.title) {
    y += 6;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(invoice.title, 20, y);
    y += 2;
  }

  // Line items
  const subtotal = invoice.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax;
  const amountPaid = invoice.payments.reduce((s, p) => s + p.amount, 0);
  const amountDue = total - amountPaid;

  const tableItems = invoice.lineItems.map(li => ({
    description: li.description,
    quantity: li.quantity,
    unitPrice: li.unitPrice,
    total: li.quantity * li.unitPrice,
  }));

  const tableBottom = addLineItemsTable(doc, tableItems, currency, y + 6);

  // Totals with payment info
  const additionalLines: { label: string; value: string; color?: [number, number, number] }[] = [];
  if (amountPaid > 0) {
    additionalLines.push({
      label: 'Paid',
      value: formatMoney(amountPaid, currency),
      color: [16, 185, 129], // emerald
    });
  }
  if (amountDue > 0) {
    additionalLines.push({
      label: 'Amount Due',
      value: formatMoney(amountDue, currency),
      color: [245, 158, 11], // amber
    });
  }

  const totalsBottom = addTotals(doc, subtotal, invoice.taxRate, tax, total, currency, tableBottom, additionalLines);

  // Payment history
  let paymentsEndY = totalsBottom;
  if (invoice.payments.length > 0) {
    paymentsEndY = totalsBottom + 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('Payment History:', 20, paymentsEndY);
    paymentsEndY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    for (const p of invoice.payments) {
      const methodLabel = p.method === 'stripe' ? 'Card (Stripe)' : p.method.charAt(0).toUpperCase() + p.method.slice(1);
      doc.text(`${formatDate(p.date)} — ${methodLabel}: ${formatMoney(p.amount, currency)}`, 24, paymentsEndY);
      paymentsEndY += 4;
    }
  }

  // Notes
  addNotes(doc, invoice.notes, paymentsEndY);

  // Footer
  addFooter(doc, settings);

  // Save
  const filename = `Invoice-${invoice.customerName || 'Customer'}-${invoice.id.slice(0, 8)}.pdf`;
  doc.save(filename);
}
