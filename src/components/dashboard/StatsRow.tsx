"use client";

import { LucideIcon, TrendingUp, TrendingDown, FileText, Truck, Gavel, IndianRupee } from "lucide-react";

// ── Self-contained data ──────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
    { label: "Total Requirements", value: "5", trend: "+2", trendLabel: "vs last month", icon: FileText, trendUp: true },
    { label: "Active Vehicles", value: "44/52", trend: "Deployed on-site", trendLabel: "", icon: Truck, trendUp: true },
    { label: "Pending Bids", value: "12", trend: "+5", trendLabel: "New this week", icon: Gavel, trendUp: true },
    { label: "Monthly Revenue", value: "₹43.2L", trend: "+12%", trendLabel: "vs last month", icon: IndianRupee, trendUp: true },
];

interface StatItem {
    label: string;
    value: string;
    trend: string;
    trendLabel: string;
    icon: LucideIcon;
    trendUp?: boolean;
}

interface StatsRowProps { stats?: StatItem[] }

export default function StatsRow({ stats = DEFAULT_STATS }: StatsRowProps) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="group flex flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card relative overflow-hidden"
                >
                    <div
                        className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl transition-all duration-300 group-hover:bg-primary"
                        style={{ backgroundColor: "var(--border)" }}
                    />
                    {/* Label + Icon */}
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                        </p>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                            <stat.icon size={15} strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* Value */}
                    <p className="text-[24px] font-bold leading-none tracking-tight text-foreground">
                        {stat.value}
                    </p>

                    {/* Trend */}
                    <div className="flex items-center gap-1.5">
                        {stat.trendUp !== false
                            ? <TrendingUp size={11} className="shrink-0 text-emerald-500" />
                            : <TrendingDown size={11} className="shrink-0 text-primary" />
                        }
                        <span className={`text-[11px] font-semibold ${stat.trendUp !== false ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}>
                            {stat.trend}
                        </span>
                        {stat.trendLabel && (
                            <span className="text-[11px] text-muted-foreground">{stat.trendLabel}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
