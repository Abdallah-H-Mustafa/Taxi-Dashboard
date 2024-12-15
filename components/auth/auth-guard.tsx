"use client";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  // Temporarily bypass authentication check
  return <>{children}</>;
}