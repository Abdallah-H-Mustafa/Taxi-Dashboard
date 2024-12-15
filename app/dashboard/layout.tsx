"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateSession } from "@/lib/auth/auth-utils";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { OfflineIndicator } from "@/components/dashboard/dispatch/offline-indicator";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!validateSession()) {
      router.push("/login");
      return;
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <aside className="relative z-20 border-r border-border/40 bg-card/50 backdrop-blur-xl">
        <SidebarNav />
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 h-12 border-b border-border/40 bg-card/50 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-4">
            <OfflineIndicator />
          </div>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="dashboard-layout flex-1"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}