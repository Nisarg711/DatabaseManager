"use client";
import { useState } from "react";
import { X, Copy, Eye, EyeOff } from "lucide-react";

export default function TokenModal({ onClose, showToast }) {
    const [apiToken, setApiToken] = useState("");
    const [loadingToken, setLoadingToken] = useState(false);
    const [showToken, setShowToken] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const handleGenerateToken = async () => {
        setLoadingToken(true);
        try {
            const res = await fetch("/api/auth/get-token", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setApiToken(data.token);
                setHasGenerated(true);
            } else {
                const error = await res.json();
                alert(`Error: ${error.error || "Failed to generate token"}`);
            }
        } catch (error) {
            console.error("Can't generate token", error);
            alert("Failed to generate token. Please try again.");
        } finally {
            setLoadingToken(false);
        }
    };

    const handleCopyToken = async () => {
        try {
            await navigator.clipboard.writeText(apiToken);
            setCopySuccess(true);
            if (showToast) {
                showToast("Token copied to clipboard!", "success");
            }
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error("Failed to copy token:", error);
            if (showToast) {
                showToast("Failed to copy token to clipboard", "error");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-md">
                <div className="bg-primary p-4 rounded-t-xl flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary-foreground">API Token</h3>
                    <button
                        onClick={onClose}
                        className="text-primary-foreground hover:bg-white/20 p-1 rounded-full transition">
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {!hasGenerated ? (
                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground">
                                Generate a Bearer token for API access. This token will expire in 7 days.
                            </p>
                            <button
                                onClick={handleGenerateToken}
                                disabled={loadingToken}
                                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50 cursor-pointer">
                                {loadingToken ? "Generating..." : "Generate Token"}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-muted/30 rounded-lg p-4 border border-border">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-primary">Bearer Token</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setShowToken(!showToken)}
                                            className="text-primary hover:bg-accent p-1 rounded transition cursor-pointer"
                                            title={showToken ? "Hide" : "Show"}>
                                            {showToken ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCopyToken}
                                            className="text-primary hover:bg-accent p-1 rounded transition cursor-pointer"
                                            title="Copy">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-input-background rounded p-3 border border-border break-all font-mono text-xs max-h-24 overflow-y-auto text-foreground">
                                    {showToken ? apiToken : "•".repeat(40)}
                                </div>
                            </div>

                            {copySuccess && (
                                <div className="text-center text-sm font-medium text-primary">
                                    Copied to clipboard!
                                </div>
                            )}

                            <div className="text-center text-sm text-muted-foreground">
                                <span className="font-medium">Expires in: </span>
                                <span className="text-primary font-bold">7 days</span>
                            </div>

                            <button
                                onClick={handleGenerateToken}
                                disabled={loadingToken}
                                className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/90 transition font-semibold disabled:opacity-50 cursor-pointer">
                                {loadingToken ? "Generating..." : "Regenerate Token"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}