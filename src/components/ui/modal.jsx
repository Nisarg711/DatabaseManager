"use client";
import React, { useEffect, useRef } from "react";

export default function Modal({ open, subtitle, onClose, title, children, loading, loadingTitle, loadingSubtitle, loadingOverlay }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e) => {
            if (e.key === "Escape") onClose && onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => onClose && onClose()}
            />

            {/* Modal content */}
            <div
                ref={contentRef}
                className="relative z-10 w-full max-w-lg mx-4 bg-card text-card-foreground rounded-lg shadow-lg border border-border"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="modalhead flex-col">
                        <h3 className="text-lg font-medium text-foreground">{title}</h3>
                        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                    </div>

                    <button
                        aria-label="Close modal"
                        onClick={() => onClose && onClose()}
                        className="text-muted-foreground hover:text-foreground"
                        style={{ cursor: "pointer" }}
                    >
                        ×
                    </button>
                </div>

                <div className="p-4">
                    {loading && !loadingOverlay ? (
                        <div className="flex items-center gap-3">
                            <svg className="h-6 w-6 animate-spin text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            <div>
                                <div className="font-medium text-foreground">{loadingTitle ?? 'Preparing...'}</div>
                                <div className="text-sm text-muted-foreground">{loadingSubtitle ?? 'Please wait while we prepare the form.'}</div>
                            </div>
                        </div>
                    ) : loading && loadingOverlay ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 bg-muted border border-border rounded">
                                <svg className="h-5 w-5 animate-spin text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                <div>
                                    <div className="font-medium text-foreground">{loadingTitle ?? 'Processing...'}</div>
                                    <div className="text-sm text-muted-foreground">{loadingSubtitle ?? 'Please wait.'}</div>
                                </div>
                            </div>
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
}