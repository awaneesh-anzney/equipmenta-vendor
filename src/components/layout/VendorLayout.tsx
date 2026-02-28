'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background">

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

            {/* ── Main area ── */}
            <div className="flex flex-1 flex-col overflow-hidden min-w-0">
                <Header onMenuToggle={() => setSidebarOpen(v => !v)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-7">
                    {children}
                </main>
            </div>
        </div>
    );
}
