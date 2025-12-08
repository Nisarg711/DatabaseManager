"use client";

import { User } from "lucide-react";

export default function ProfileAvatar({ username, email }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-card shadow-lg mb-4">
        <User className="w-12 h-12 text-primary-foreground" />
      </div>
      <h2 className="text-3xl font-bold text-foreground">{username || "User"}</h2>
      <p className="text-muted-foreground">{email}</p>
    </div>
  );
}
