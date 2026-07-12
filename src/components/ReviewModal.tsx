import { useEffect, useRef } from "react";
import { X, FileText, AlertTriangle, Download, CheckCircle, Ban } from "lucide-react";
import type { ExpenseItem } from "../types";

interface ReviewModalProps {
  item: ExpenseItem;
  onClose: () => void;
}

export default function ReviewModal({ item, onClose }: ReviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Forensic audit review"
    >
      <div className="animate-toast-in mx-4 flex w-full max-w-4xl flex-col rounded-2xl bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-bold text-foreground">Forensic Audit Review</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close review modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — side by side */}
        <div className="flex flex-col gap-0 md:flex-row">
          {/* Left Panel — Document Viewer */}
          <div className="flex flex-1 flex-col border-b border-border md:border-b-0 md:border-r">
            <div className="border-b border-border px-5 py-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Scanned Document View
              </h3>
            </div>
            <div className="flex flex-1 items-center justify-center bg-muted/30 p-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.receiptUrl || "No document attached"}</p>
                  <p className="text-xs text-muted-foreground">Scanned receipt preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — Forensic AI Analysis */}
          <div className="flex w-full flex-col md:w-80">
            <div className="border-b border-border px-5 py-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Forensic AI Analysis
              </h3>
            </div>

            <div className="flex flex-col gap-4 p-5">
              {/* Extracted data */}
              <div className="space-y-3">
                <DataRow label="Extracted Vendor" value={item.extractedVendor} />
                <DataRow
                  label="Extracted Amount"
                  value={`$${item.extractedAmount.toLocaleString()}`}
                />
                <DataRow label="Confidence Score" value={`${item.confidence}%`} status={item.confidence >= 80 ? "success" : "warning"} />
              </div>

              {/* Violation callout */}
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-bold text-destructive">Violation Detected</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground">{item.violationDetail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-success/90 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
            >
              <CheckCircle className="h-4 w-4" />
              Override & Approve
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-destructive/90 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
            >
              <Ban className="h-4 w-4" />
              Reject & Flag
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-primary bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all duration-150 hover:bg-primary hover:text-white active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Download AI Summary
          </button>
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value, status }: { label: string; value: string; status?: "success" | "warning" }) {
  const valueColor = status === "success"
    ? "text-success"
    : status === "warning"
      ? "text-warning"
      : "text-foreground";

  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${valueColor}`}>{value}</span>
    </div>
  );
}