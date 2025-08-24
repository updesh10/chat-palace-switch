import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  className?: string;
}

export function FileUpload({ className }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf"
    );
    setSelectedFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        file => file.type === "application/pdf"
      );
      setSelectedFiles(files);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Upload Files</h3>
      </div>

      {/* Upload Area */}
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragOver 
            ? "border-primary bg-primary/5" 
            : "border-border/50 hover:border-primary/50 hover:bg-card/50",
          "min-h-[200px] flex flex-col items-center justify-center p-8"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          
          <Button 
            variant="default" 
            size="lg"
            className="mb-4 bg-primary hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation();
              triggerFileSelect();
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Select Files
          </Button>
          
          <p className="text-muted-foreground text-sm">
            Support: PDF
          </p>
        </div>
      </Card>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Selected Files:</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <Card key={index} className="p-3 bg-card/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
            Upload {selectedFiles.length} File{selectedFiles.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}