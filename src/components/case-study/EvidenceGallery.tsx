"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { EvidenceImage } from "@/content/evidence";

/**
 * Screenshots at their real aspect ratio (never upscaled). Clicking one opens a
 * native <dialog> lightbox: arrow keys page through, Escape or a backdrop click closes.
 */
export function EvidenceGallery({ images }: { images: EvidenceImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <div className="space-y-8">
        {images.map((img, i) => (
          <figure key={img.src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Enlarge screenshot: ${img.caption}`}
              className="group relative inline-block max-w-full align-top rounded-md overflow-hidden border border-border bg-[#0A0F1C] hover:border-accent/60 transition-colors cursor-zoom-in"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes={`(min-width: 896px) ${Math.min(img.width, 832)}px, 100vw`}
                style={{ width: img.width, maxWidth: "100%", height: "auto" }}
              />
              <span
                className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                aria-hidden="true"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </button>
            <figcaption className="mt-2 text-xs text-muted">
              <span className="font-mono text-accent mr-2">Fig. {i + 1}</span>
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Backdrop click: the dialog element itself is the target only outside the content */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        aria-label={current ? `Screenshot: ${current.caption}` : "Screenshot viewer"}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[min(96vw,1400px)] max-h-[94vh] p-0 bg-transparent overflow-visible backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && index !== null && (
          <div className="flex flex-col gap-3 p-2 sm:p-4">
            <div className="flex items-center justify-between gap-3 text-white">
              <p className="font-mono text-xs text-white/70">
                Fig. {index + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="p-2 rounded-md hover:bg-white/10"
                aria-label="Close viewer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="96vw"
                className="rounded-md border border-white/10 bg-[#0A0F1C] animate-fade-in"
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "78vh" }}
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-1 sm:-left-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-1 sm:-right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <p className="text-sm text-white/85 text-center">{current.caption}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
