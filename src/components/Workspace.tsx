import KPIBar from "./KPIBar";
import TabNav from "./TabNav";
import AuditLedger from "./AuditLedger";
import OrgSettings from "./OrgSettings";
import type { AuditResponse } from "../types";

/* ─── Props ─── */
interface WorkspaceProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  auditData: AuditResponse | null;
  loading: boolean;
  onExportReport: () => void;
  onDownloadCsv: () => void;
  onSaveSettings: (
    policyFile: File |null,
    aiPrompt: string
  ) => void;
}

/* ─── Main component ─── */
export default function Workspace({
  activeTab,
  onTabChange,
  auditData,
  loading,
  onExportReport,
  onDownloadCsv,
  onSaveSettings,
}: WorkspaceProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "ledger":
        // If backend returned CSV, show download page.
        if (auditData?.csv && auditData.csv.trim().length > 0) {
          return (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-emerald-700/40 bg-emerald-950/20 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <svg
                  className="h-8 w-8 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-emerald-300">
                Data Normalization Complete
              </h2>

              <p className="max-w-md text-slate-400">
                Your uploaded document has been converted into a structured CSV
                dataset and is ready for download.
              </p>

              <button
                onClick={onDownloadCsv}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
              >
                Download CSV
              </button>
            </div>
          );
        }

        // Otherwise show audit report
        return (
          <AuditLedger
            auditData={auditData}
            loading={loading}
          />
        );

      case "settings":
        return (
          <OrgSettings
            onSaveSettings={onSaveSettings}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-auto p-6">
      <KPIBar
        auditData={auditData}
        loading={loading}
        onExportReport={onExportReport}
      />

      <TabNav
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {renderTabContent()}
    </main>
  );
}