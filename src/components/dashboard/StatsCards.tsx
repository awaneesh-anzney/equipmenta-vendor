"use client";

import { ClipboardList, Truck, Wallet, TrendingUp, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const STATS = [
    {
        label: "ACTIVE WORK ORDERS",
        value: "3",
        trend: "+1 this week",
        icon: ClipboardList,
        color: "#22c55e",
        route: "/workorders"
    },
    {
        label: "VEHICLES DEPLOYED",
        value: "4",
        trend: "4 total fleet",
        icon: Truck,
        color: "#3b82f6",
        route: "/myvehicles"
    },
    {
        label: "PENDING PAYMENTS",
        value: "₹9,25,600",
        trend: "2 invoices",
        icon: Wallet,
        color: "#eab308",
        route: "/billing"
    },
    {
        label: "TOTAL EARNINGS",
        value: "₹18,27,100",
        trend: "+12% vs last month",
        icon: TrendingUp,
        color: "#22c55e",
        route: "/billing"
    },
];

export default function StatsCards() {
    const router = useRouter();

    return (
        <>
            {STATS.map((stat, i) => (
                <div
                    key={i}
                    onClick={() => router.push(stat.route)}
                    className="flex flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card relative overflow-hidden p-5 cursor-pointer justify-between min-h-[140px]"
                >
                    {/* Top colored border */}
                    <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: stat.color }} />

                    <div className="flex justify-between items-start">
                        <div className="text-[12px] font-semibold text-muted-foreground tracking-wide">
                            {stat.label}
                        </div>
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            <stat.icon size={16} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="text-3xl font-bold text-foreground">
                            {stat.value}
                        </div>
                        <div className="text-[12px] font-medium flex items-center gap-1 mt-1" style={{ color: stat.color }}>
                            <ArrowUpRight size={14} strokeWidth={3} />
                            {stat.trend}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
