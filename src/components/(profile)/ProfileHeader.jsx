"use client";

import { Database, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';

export default function ProfileHeader() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-primary rounded-xl">
          <Database className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">DBuddy</h1>
          <p className="text-sm text-primary">Your Database Companion</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full text-foreground hover:bg-muted transition-colors cursor-pointer"
          aria-label="Close">
          <X className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
