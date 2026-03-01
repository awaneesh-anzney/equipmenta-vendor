'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-muted/40 dark:bg-background">

            {/* ── Mobile overlay backdrop ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* ── Right Side Area ── */}
            <div className="flex flex-1 flex-col overflow-hidden min-w-0">
                <Header onMenuToggle={() => setSidebarOpen(v => !v)} />

                {/* ── MAIN Dashboard Area ── */}
                <main className="flex-1 overflow-y-auto px-4 py-4 md:px-7 md:py-6">
                    <div className="max-w-[1440px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
