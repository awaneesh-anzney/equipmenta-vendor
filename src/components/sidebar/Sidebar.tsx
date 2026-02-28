'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ClipboardList,
    Gavel,
    FileText,
    Truck,
    Receipt,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Menu,
    Zap
} from "lucide-react";
import { useState } from "react";
import { currentVendor } from '@/data/mockdata';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Requirements', icon: ClipboardList, href: '/requirements' },
    { label: 'My Bids', icon: Gavel, href: '/mybids' },
    { label: 'Work Orders', icon: FileText, href: '/workorders' },
    { label: 'My Vehicles', icon: Truck, href: '/myvehicles' },
    { label: 'Billing', icon: Receipt, href: '/billing' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={[
                "fixed inset-y-0 left-0 z-50 shrink-0",
                isCollapsed ? "w-[80px]" : "w-[260px]",
                "bg-sidebar text-sidebar-foreground",
                "border-r border-sidebar-border shadow-sm",
                "flex flex-col overflow-hidden",
                "transition-all duration-300 ease-in-out",
                "lg:relative lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
            ].join(" ")}
        >
            {/* ─── Brand area ─────────────────────────────── */}
            <div className={`flex h-16 shrink-0 items-center border-b border-sidebar-border ${isCollapsed ? 'justify-center px-0' : 'justify-between px-5'}`}>
                <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary shadow-lg shadow-sidebar-primary/30">
                        <Zap size={16} className="text-sidebar-primary-foreground" />
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 transition-opacity duration-300">
                            <p className="truncate text-[14px] font-extrabold uppercase leading-none tracking-wide text-foreground">
                                Equipment Share
                            </p>
                            <p className="mt-0.5 text-[10px] uppercase leading-none tracking-widest text-muted-foreground">
                                Vendor Panel
                            </p>
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(true)}
                        className="hidden lg:flex shrink-0 items-center justify-center rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>
                )}
            </div>

            {/* ─── Expand Button (Visible when collapsed) ─── */}
            {isCollapsed && (
                <div className="flex shrink-0 items-center justify-center pt-4 pb-2">
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="hidden lg:flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            )}

            {/* ─── Navigation ─────────────────────────────── */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
                    const active = pathname === href || pathname.startsWith(href + '/');
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onClose}
                            className={[
                                "group flex items-center rounded-lg py-2.5 transition-all duration-150",
                                isCollapsed ? "justify-center px-0 mx-2" : "justify-between px-3",
                                active
                                    ? "bg-primary/15 text-primary shadow-sm"
                                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                            ].join(" ")}
                            title={isCollapsed ? label : undefined}
                        >
                            <span className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                                <Icon
                                    size={18}
                                    strokeWidth={active ? 2.5 : 2}
                                    className={active ? "text-primary" : "text-sidebar-foreground/50 transition-colors group-hover:text-sidebar-foreground"}
                                />
                                {!isCollapsed && (
                                    <span className="text-[14px] font-semibold">{label}</span>
                                )}
                            </span>
                            {!isCollapsed && active && (
                                <ChevronRight size={13} className="shrink-0 text-primary/50" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ─── User section ───────────────────────────── */}
            <div className={`shrink-0 border-t border-sidebar-border px-3 py-3 bg-muted/20 ${isCollapsed ? 'block text-center' : ''}`}>
                <div className={`mb-3 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-1'}`}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-sidebar-accent text-[11px] font-black text-sidebar-foreground">
                        {currentVendor.avatar}
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold leading-none text-foreground">{currentVendor.name}</p>
                            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{currentVendor.email}</p>
                        </div>
                    )}
                </div>

                <button
                    className={`group flex items-center rounded-lg py-2 text-[12px] font-medium transition-all hover:bg-rose-500/10 hover:text-rose-500 ${isCollapsed ? 'justify-center w-full px-0 text-muted-foreground' : 'w-full gap-2.5 px-3 text-sidebar-foreground/60'}`}
                    title={isCollapsed ? "Sign Out" : undefined}
                >
                    <LogOut size={14} className={`transition-transform ${!isCollapsed && 'group-hover:-translate-x-0.5'}`} />
                    {!isCollapsed && "Sign Out"}
                </button>
            </div>
        </aside>
    );
}
