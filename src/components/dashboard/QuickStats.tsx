"use client";

import { AlertCircle, IndianRupee, BarChart3, LucideIcon } from "lucide-react";

// ── Self-contained data — colors only from globals.css variables ──
const DEFAULT_ITEMS = [
    {
        label: "Alerts (Fitness/Insurance)",
        value: "3",
        icon: AlertCircle,
        iconClass: "text-destructive",
        bgClass: "bg-destructive/10",
    },
    {
        label: "Pending Payments",
        value: "₹9.3L",
        icon: IndianRupee,
        iconClass: "text-chart-4",
        bgClass: "bg-chart-4/10",
    },
    {
        label: "Bid Activity (Week)",
        value: "30",
        icon: BarChart3,
        iconClass: "text-primary",
        bgClass: "bg-primary/10",
    },
];

interface QuickStatItem {
    label: string;
    value: string;
    icon: LucideIcon;
    iconClass: string;
    bgClass: string;
}

interface QuickStatsProps { items?: QuickStatItem[] }

export default function QuickStats({ items = DEFAULT_ITEMS }: QuickStatsProps) {
    return (
        <div
            className="overflow-hidden rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card"
            style={{ borderTop: "3px solid var(--primary)" }}
        >
            {/* Header */}
            <div className="border-b border-border px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground leading-none mb-1">
                    Summary
                </p>
                <p className="text-[15px] font-bold leading-none text-foreground">Quick Stats</p>
            </div>

            {/* Items */}
            <div className="divide-y divide-border">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="group flex cursor-default items-center justify-between px-5 py-3.5 transition-all duration-150 hover:bg-primary/5 hover:pl-6"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div className={`shrink-0 rounded-lg p-1.5 transition-transform duration-150 group-hover:scale-110 ${item.bgClass} ${item.iconClass}`}>
                                <item.icon size={14} strokeWidth={2.5} />
                            </div>
                            <span className="truncate text-[13px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                                {item.label}
                            </span>
                        </div>
                        <span className="ml-3 shrink-0 text-[14px] font-bold tabular-nums text-foreground transition-colors group-hover:text-primary">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
