import { FileText, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Left here just in case other files need it
import type { AuditResponse } from "../types";

/* ─── Empty state ─── */
function EmptyLedger() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No Audit Entries Yet</h3>
      <p className="mt-1 max-w-md text-center text-sm text-muted-foreground">
        Upload employee receipts or vendor invoices from the sidebar to kick off an audit. Every
        transaction flagged by the RAG engine will appear here.
      </p>
    </div>
  );
}

/* ─── Props ─── */
interface AuditLedgerProps {
  auditData: AuditResponse | null;
  loading?: boolean;
}

/* ─── Main component ─── */
export default function AuditLedger({ auditData, loading }: AuditLedgerProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <p className="text-sm text-muted-foreground">Running audit analysis…</p>
      </div>
    );
  }

  if (!auditData) return <EmptyLedger />;

  return (
    <div className="space-y-4">
      {/* Summary card */}
      {auditData?.summary && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Audit Summary</span>
          </div>
          <div className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
            {String(auditData.summary)}
          </div>
        </div>
      )}

      {/* Full report */}
      {auditData?.report && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Detailed Report</span>
          </div>
          <div className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
            {String(auditData.report)}
          </div>
        </div>
      )}

      {/* Metrics badges */}
      {auditData?.metrics && (
        <div className="flex flex-wrap gap-3">
          {auditData.metrics.documentsProcessed !== undefined && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              {auditData.metrics.documentsProcessed} doc{auditData.metrics.documentsProcessed !== 1 ? "s" : ""} processed
            </span>
          )}
          {auditData.metrics.issuesDetected !== undefined && auditData.metrics.issuesDetected > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              {auditData.metrics.issuesDetected} issue{auditData.metrics.issuesDetected !== 1 ? "s" : ""} found
            </span>
          )}
        </div>
      )}
    </div>
  );
}