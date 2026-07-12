import { useCallback } from "react";
import { Shield, FileText, Upload, AlertTriangle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";

/* ─── Props ─── */
interface SidebarProps {
  primaryFile: File | null;
  comparisonFile: File | null;
  customInstructions: string;
  policyFile: File | null;
  loading: boolean;
  onPrimaryFileChange: (f: File | null) => void;
  onComparisonFileChange: (f: File | null) => void;
  onCustomInstructionsChange: (v: string) => void;
  onRunAudit: () => void;
}

/* ─── Dropzone card used in sidebar ─── */
function DropCard({
  title,
  accept,
  file,
  onDrop,
  disabled,
}: {
  title: string;
  accept: Record<string, string[]>;
  file: File | null;
  onDrop: (f: File | null) => void;
  disabled: boolean;
}) {
  const handleDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onDrop(accepted[0]);
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxFiles: 1,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative cursor-pointer rounded-lg border-2 border-dashed p-5 transition-all duration-200 ${
        disabled
          ? "pointer-events-none border-border/50 opacity-50"
          : isDragActive
            ? "border-primary bg-primary/5"
            : file
              ? "border-success bg-success/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} aria-label={title} />
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            file ? "bg-success/10 text-success" : "bg-muted/70 text-muted-foreground"
          }`}
        >
          {file ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {file ? file.name : "Drag & drop files here, or click to browse"}
          </p>
          {!file && (
            <p className="mt-1 text-xs text-muted-foreground/70">
              Supports: CSV, TXT, PDF, DOCX, Images
              (Current MVP provides structured text extraction for supported document types.)
            </p>
          )}
        </div>
        {!file && !disabled && (
          <div className="flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Upload className="h-3.5 w-3.5" />
            <span>Browse files</span>
          </div>
        )}
        {file && (
          <p className="text-[11px] text-muted-foreground">Tap to replace</p>
        )}
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */
export default function Sidebar({
  primaryFile,
  comparisonFile,
  customInstructions,
  policyFile,
  loading,
  onPrimaryFileChange,
  onComparisonFileChange,
  onCustomInstructionsChange,
  onRunAudit,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-[300px] shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Logo Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-extrabold tracking-tight text-foreground">
            Audit<span className="text-primary">Eye</span>
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] font-medium text-success">Engine Online</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4 custom-scrollbar">
        {/* Section 1: Data Ingestion */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Data Ingestion
            </h2>
          </div>
          <div className="space-y-4">
            {/* Card 1: Primary Audit Document */}
            <div>
              <p className="text-sm font-medium text-foreground">Primary Audit Document</p>
              <p className="mt-0.5 mb-2 text-xs text-muted-foreground">
                Upload the main document for auditing.
              </p>
              <DropCard
                title="Primary Audit Document"
                accept={{
                  "*/*": [],
                }}
                file={primaryFile}
                onDrop={onPrimaryFileChange}
                disabled={loading}
              />
            </div>

            {/* Card 2: Supporting / Comparison Document */}
            <div>
              <p className="text-sm font-medium text-foreground">
                Supporting / Comparison Document <span className="text-muted-foreground/60">(Optional)</span>
              </p>
              <p className="mt-0.5 mb-2 text-xs text-muted-foreground">
                Upload another related document if cross-checking or additional context is needed.
              </p>
              <DropCard
                title="Supporting / Comparison Document (Optional)"
                accept={{
                  "*/*": [],
                }}
                file={comparisonFile}
                onDrop={onComparisonFileChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Audit Parameters */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 flex-1 rounded-full bg-border" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Audit Parameters
            </h2>
          </div>

          <div className="space-y-4">
            {/* Custom Instructions */}
            <div>
              <label
                htmlFor="custom-instructions"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Custom Instructions
              </label>
              <textarea
                id="custom-instructions"
                rows={3}
                value={customInstructions}
                onChange={(e) => onCustomInstructionsChange(e.target.value)}
                placeholder="Example:&#10;Focus on travel expenses.&#10;Strictly enforce company policy.&#10;Require manual verification for purchases above $10,000."
                disabled={loading}
                className="w-full resize-none rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
              />
            </div>

            {/* Organization Policy Status */}
            <div>
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                Organization Policy Status
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5">
                {policyFile ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    <span className="text-sm text-foreground">Policy Loaded</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">No Policy Uploaded</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="border-t border-border p-4">
        <button
          type="button"
          disabled={loading || !primaryFile}
          onClick={onRunAudit}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-primary-hover active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              AuditEye AI is analyzing your documents...
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4" />
              Run AI Audit
            </>
          )}
        </button>
      </div>
    </aside>
  );
}