import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Image } from "lucide-react";

interface FileUploadZoneProps {
  accept: Record<string, string[]>;
  label: string;
  description: string;
  icon: "image" | "pdf";
}

export default function FileUploadZone({ accept, label, description, icon }: FileUploadZoneProps) {
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback(() => {
    setUploaded(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  });

  const IconComponent = icon === "image" ? Image : FileText;

  return (
    <div
      {...getRootProps()}
      className={`relative cursor-pointer rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
        isDragActive
          ? "border-primary bg-primary/5"
          : uploaded
            ? "border-success bg-success/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} aria-label={label} />
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            uploaded ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          }`}
        >
          {uploaded ? (
            <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ) : (
            <IconComponent className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {uploaded ? "File uploaded successfully" : description}
          </p>
        </div>
        {!uploaded && (
          <div className="flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Upload className="h-3.5 w-3.5" />
            <span>Browse files</span>
          </div>
        )}
      </div>
    </div>
  );
}