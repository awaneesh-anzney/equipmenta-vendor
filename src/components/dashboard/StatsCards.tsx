"use client";

import {
    ClipboardCheck,
    Truck,
    Wallet,
    TrendingUp,
    ArrowUpRight
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATS = [
    {
        label: "ACTIVE WORK ORDERS",
        value: "3",
        trend: "+1 this week",
        icon: ClipboardCheck,
        color: "var(--primary)",
    },
    {
        label: "VEHICLES DEPLOYED",
        value: "4",
        trend: "4 total fleet",
        icon: Truck,
        color: "var(--primary)",
    },
    {
        label: "PENDING PAYMENTS",
        value: "₹9,25,600",
        trend: "2 invoices",
        icon: Wallet,
        color: "var(--chart-5)",
    },
    {
        label: "TOTAL EARNINGS",
        value: "₹18,27,100",
        trend: "+12% vs last month",
        icon: TrendingUp,
        color: "var(--primary)",
    },
];

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
                <Card
                    key={i}
                    className="relative bg-card border border-border shadow-sm overflow-hidden group transition-all duration-300 hover:bg-muted/30 dark:hover:bg-muted/10"
                >
                    {/* Subtle Top indicator */}
                    <div
                        className="absolute top-0 left-0 w-full h-[2px] z-10"
                        style={{ backgroundColor: stat.color }}
                    />

                    <CardHeader className="flex flex-row items-center justify-between pb-1 pt-5 px-5">
                        <CardTitle className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-hover:text-foreground/80">
                            {stat.label}
                        </CardTitle>
                        <div
                            className="flex h-7 w-7 items-center justify-center rounded-lg transition-transform duration-500 group-hover:scale-105 shadow-sm"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            <stat.icon size={14} strokeWidth={2.5} />
                        </div>
                    </CardHeader>

                    <CardContent className="pb-5 pt-0 px-5">
                        <div className="text-[24px] font-black tracking-tight text-foreground leading-tight tabular-nums">
                            {stat.value}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span
                                className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1"
                                style={{ color: stat.color }}
                            >
                                <ArrowUpRight size={10} strokeWidth={3} /> {stat.trend}
                            </span>
                        </div>
                    </CardContent>

                    {/* Dynamic hover overlay: Gray in dark, Light Green in light */}
                    <div className="absolute inset-0 bg-primary/0 pointer-events-none transition-colors group-hover:bg-[oklch(0.6_0.15_150)/0.05] dark:group-hover:bg-muted/10 group-hover:opacity-100" />
                </Card>
            ))}
        </div>
    );
}
