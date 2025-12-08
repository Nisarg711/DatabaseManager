"use client";

import { Key } from "lucide-react";

export default function APITokenSection({ onGenerateToken }) {
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Key className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-bold text-foreground">API Token</h3>
            <p className="text-sm text-muted-foreground">Generate Bearer token for API access</p>
          </div>
        </div>
        <button
          onClick={onGenerateToken}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors font-semibold cursor-pointer">
          Generate Token
        </button>
      </div>
    </div>
  );
}
