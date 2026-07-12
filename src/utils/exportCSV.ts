import type { ExpenseItem } from "../types";

/**
 * Convert an array of ExpenseItem rows into a CSV string.
 * Uses the visible columns plus audit metadata for a complete report.
 */
function toCSV(rows: ExpenseItem[]): string {
  const headers = [
    "Employee / Dept",
    "Vendor",
    "Date",
    "Amount ($)",
    "Status",
    "Extracted Vendor",
    "Extracted Amount ($)",
    "Confidence (%)",
    "Violation Detail",
  ];

  const escape = (val: string | number): string => {
    const s = String(val);
    // Wrap in quotes if it contains a comma, quote, or newline
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const headerRow = headers.join(",");
  const dataRows = rows.map((r) =>
    [
      r.employee,
      r.vendor,
      r.date,
      r.amount,
      r.status,
      r.extractedVendor,
      r.extractedAmount,
      r.confidence,
      r.violationDetail,
    ]
      .map(escape)
      .join(","),
  );

  return [headerRow, ...dataRows].join("\n");
}

/**
 * Trigger a browser download of a CSV file.
 */
function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Public API — export the audit ledger as a CSV file.
 * Returns the number of rows exported (0 if no data).
 */
export function exportAuditLedger(rows: ExpenseItem[]): number {
  if (rows.length === 0) return 0;

  const timestamp = new Date().toISOString().slice(0, 10);
  const csv = toCSV(rows);
  downloadCSV(csv, `AuditEye_Report_${timestamp}.csv`);
  return rows.length;
}