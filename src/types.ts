export interface ExpenseItem {
  id: string;
  employee: string;
  vendor: string;
  date: string;
  amount: number;
  status: "approved" | "critical" | "pending";
  receiptUrl: string;
  extractedVendor: string;
  extractedAmount: number;
  confidence: number;
  violationDetail: string;
}

export const transactions: ExpenseItem[] = [];

export interface AuditMetrics {
  documentsProcessed?: number;
  issuesDetected?: number;
  estimatedOverspend?: number;
  activeWorkflow?: string;
}

export interface AuditResponse {
  status: "success" | "error";
  workflow: "comparison" | "ai_audit" | "liquidation";
  summary?: string;
  report?: string;
  csv?: string;
  filename?: string;
  metrics?: AuditMetrics;
}

