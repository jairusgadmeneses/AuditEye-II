import { Download, Eye, AlertTriangle, Network, Loader2 } from "lucide-react";
import type { AuditResponse } from "../types";

/* ─── KPI Card ─── */
interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  loading?: boolean;
  accent: "orange" | "red" | "green";
}

function KpiCard({ icon, label, value, loading, accent }: KpiCardProps) {
  const accentColors = {
    orange: "bg-primary/10 text-primary",
    red: "bg-destructive/10 text-destructive",
    green: "bg-success/10 text-success",
  };

  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentColors[accent]}`}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-xl font-bold tracking-tight text-foreground">{loading ? "—" : value}</p>
      </div>
    </div>
  );
}

/* ─── KPIBar ─── */
interface KPIBarProps {
  auditData: AuditResponse | null;
  loading: boolean;
  onExportReport: () => void;
}

export default function KPIBar({ auditData, loading, onExportReport }: KPIBarProps) {
  const metrics = auditData?.metrics;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-1 gap-4">
        <KpiCard
          icon={<Eye className="h-5 w-5" />}
          label="Documents Processed"
          value={metrics?.documentsProcessed !== undefined ? String(metrics.documentsProcessed) : "0"}
          loading={loading}
          accent="green"
        />
        <KpiCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Issues Detected"
          value={metrics?.issuesDetected !== undefined ? String(metrics.issuesDetected) : "0"}
          loading={loading}
          accent="red"
        />
        <KpiCard
          icon={<Network className="h-5 w-5" />}
          label="Active Workflow"
          value={
            typeof metrics?.activeWorkflow === "string"
              ? metrics.activeWorkflow
              : "—"
          }
          loading={loading}
          accent="orange"
        />
      </div>
      <button
        type="button"
        disabled={!auditData}
        onClick={onExportReport}
        className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-150 hover:bg-muted hover:shadow-md active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Download className="h-4 w-4 text-primary" />
        Export Summary Report
      </button>
    </div>
  );
}