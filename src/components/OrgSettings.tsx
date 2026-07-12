import { useState, useRef, type ChangeEvent } from "react";
import { Upload, FileText, Save, Loader2 } from "lucide-react";

/* ─── Props ─── */
interface OrgSettingsProps {
  onSaveSettings: (policyFile: File | null, aiPrompt: string) => void;
}

/* ─── Main component ─── */
export default function OrgSettings({ onSaveSettings }: OrgSettingsProps) {
  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Drag / drop handlers ─── */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setPolicyFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) setPolicyFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate a brief save so the user sees the loading state
    await new Promise((r) => setTimeout(r, 800));
    onSaveSettings(policyFile, aiPrompt);
    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* ─── T&E Policy Document ─── */}
      <section>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Company T&amp;E Policy Document
        </label>
        <p className="mb-3 text-xs text-muted-foreground">
          Upload PDF or DOCX for the Agentic RAG Engine
        </p>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          aria-label="Upload company T&E policy document"
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/5 shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
              : policyFile
                ? "border-success/50 bg-success/5"
                : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />

          {policyFile ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <FileText className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{policyFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(policyFile.size / 1024).toFixed(1)} KB &middot; Click to replace
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Drop your policy file here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">PDF or DOCX &middot; Max 10 MB</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── Custom AI System Prompt ─── */}
      <section>
        <label
          htmlFor="ai-prompt"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Custom AI System Prompt{" "}
          <span className="font-normal text-muted-foreground">(Optional)</span>
        </label>
        <p className="mb-3 text-xs text-muted-foreground">
          Provide additional instructions the RAG engine should follow during audit analysis.
        </p>
        <textarea
          id="ai-prompt"
          rows={4}
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="e.g., Always flag alcohol purchases, strictly enforce $50 per diem…"
          className="w-full resize-y rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </section>

      {/* ─── Save button ─── */}
      <button
        type="button"
        disabled={saving}
        onClick={handleSave}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-150 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saving ? "Saving…" : "Save Organization Settings"}
      </button>
    </div>
  );
}