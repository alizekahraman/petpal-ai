"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const speciesGradient: Record<string, string> = {
  dog: "from-teal/30 to-sage/30",
  cat: "from-lavender/30 to-peach/30",
  bird: "from-sage/30 to-teal/30",
  rabbit: "from-peach/30 to-lavender/30",
  fish: "from-teal/30 to-lavender/30",
  reptile: "from-sage/30 to-peach/30",
  other: "from-muted to-muted/50",
};

const speciesEmoji: Record<string, string> = {
  dog: "🐕", cat: "🐈", bird: "🦜", rabbit: "🐇",
  fish: "🐟", reptile: "🦎", other: "🐾",
};

interface PhotoUploadProps {
  value?: string;
  species?: string;
  onChange: (url: string | undefined) => void;
}

export function PhotoUpload({ value, species = "other", onChange }: PhotoUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>(value);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(url);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    setPreview(undefined);
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative w-32 h-32 rounded-3xl overflow-hidden cursor-pointer transition-all duration-200",
          "bg-gradient-to-br border-2",
          speciesGradient[species] ?? speciesGradient.other,
          dragging
            ? "border-primary scale-105"
            : "border-border/50 hover:border-primary/50 hover:scale-[1.02]"
        )}
      >
        {preview ? (
          <>
            <Image src={preview} alt="Pet photo" fill className="object-cover" sizes="128px" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
              <Camera className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
            <span className="text-4xl">{speciesEmoji[species] ?? "🐾"}</span>
            <div className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/0 hover:bg-black/10 transition-colors rounded-3xl"
            )}>
              <Camera className="w-5 h-5 text-foreground/50" />
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
      >
        <Upload className="w-3.5 h-3.5" />
        {preview ? "Change photo" : "Upload photo"}
      </button>
    </div>
  );
}
