import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";
import type { AuditResponse } from "./types";

export default function App() {
  /* ── File & form state ── */
  const [activeTab, setActiveTab] = useState("ledger");
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState<AuditResponse | null>(null);
  const [primaryFile, setPrimaryFile] = useState<File | null>(null);
  const [comparisonFile, setComparisonFile] = useState<File | null>(null);
  const [customInstructions, setCustomInstructions] = useState("");
  const [policyText, setPolicyText] = useState("");
  const [orgSettings, setOrgSettings] = useState<{
    policyFile: File | null;
    customPrompt: string;
  }>({
    policyFile: null,
    customPrompt: "",
  });

  /* ── Toast state ── */
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* ── Backend handshake ── */
  const handleRunAudit = useCallback(async () => {
    const API_URL = import.meta.env.VITE_AUDITEYE_API_URL;

    const formData = new FormData();

    if (primaryFile) formData.append("files", primaryFile);

    if (comparisonFile) formData.append("files", comparisonFile);

    if (customInstructions)
      formData.append("prompt", customInstructions);

    if (policyText)
      formData.append("policies", policyText);

    setLoading(true);
    setToast(null);

    try {
      const response = await fetch(`${API_URL}/webhook-test/audit`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: AuditResponse = await response.json();

      setAuditData(data);

      setToast({
        type: "success",
        message: "Audit completed successfully.",
      });
    } catch {
      setToast({
        type: "error",
        message: "Audit failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [
    primaryFile,
    comparisonFile,
    customInstructions,
    policyText,
  ]);

  /* ── Export handler (comparison / ai_audit) ── */
  const handleExportReport = useCallback(() => {
    if (!auditData) return;

    const rows: string[][] = [];
    rows.push(["Field", "Value"]);

    if (auditData.summary)
      rows.push(["Executive Summary", auditData.summary]);

    if (auditData.report)
      rows.push(["Full Report", auditData.report]);

    if (auditData.workflow)
      rows.push(["Workflow", auditData.workflow]);

    if (auditData.metrics?.documentsProcessed !== undefined)
      rows.push([
        "Documents Processed",
        String(auditData.metrics.documentsProcessed),
      ]);

    if (auditData.metrics?.issuesDetected !== undefined)
      rows.push([
        "Issues Detected",
        String(auditData.metrics.issuesDetected),
      ]);

    if (auditData.metrics?.estimatedOverspend !== undefined)
      rows.push([
        "Estimated Overspend",
        String(auditData.metrics.estimatedOverspend),
      ]);

    const escape = (s: string) =>
      s.includes(",") || s.includes('"')
        ? `"${s.replace(/"/g, '""')}"`
        : s;

    const csv = rows
      .map((r) => r.map(escape).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `AuditEye_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, [auditData]);

  /* ── Download CSV for liquidation ── */
  const handleDownloadCsv = useCallback(() => {
    if (!auditData?.csv) return;

    const blob = new Blob([auditData.csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    link.download =
      auditData.filename ??
      `AuditEye_Export_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, [auditData]);

  /* ── Organization Settings ── */
  const handleOrgSettingsSave = useCallback(
    (file: File | null, prompt: string) => {
      // Store for UI purposes
      setOrgSettings({
        policyFile: file,
        customPrompt: prompt,
      });

      // IMPORTANT:
      // The typed policy is what gets sent to the backend.
      // PDF/DOCX parsing can be added later.
      setPolicyText(prompt);

      setToast({
        type: "success",
        message: "Organization settings saved.",
      });
    },
    [],
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        primaryFile={primaryFile}
        comparisonFile={comparisonFile}
        customInstructions={customInstructions}
        policyFile={orgSettings.policyFile}
        loading={loading}
        onPrimaryFileChange={setPrimaryFile}
        onComparisonFileChange={setComparisonFile}
        onCustomInstructionsChange={setCustomInstructions}
        onRunAudit={handleRunAudit}
      />

      <Workspace
        activeTab={activeTab}
        onTabChange={setActiveTab}
        loading={loading}
        auditData={auditData}
        onExportReport={handleExportReport}
        onDownloadCsv={handleDownloadCsv}
        onSaveSettings={handleOrgSettingsSave}
      />

      {toast && (
        <div
          className={`animate-toast-in fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${
            toast.type === "success"
              ? "border-success/30 bg-card text-foreground"
              : "border-destructive/30 bg-card text-foreground"
          }`}
        >
          <span className="text-sm font-medium">
            {toast.message}
          </span>

          <button
            onClick={() => setToast(null)}
            className="ml-1 flex h-5 w-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}