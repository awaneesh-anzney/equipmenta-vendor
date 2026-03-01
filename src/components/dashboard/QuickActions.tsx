"use client";

import { Eye, Gavel, Truck, Wallet, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ACTIONS = [
    {
        title: "Browse Requirements",
        subtitle: "3 open for bidding",
        icon: Eye,
        color: "var(--primary)",
    },
    {
        title: "My Active Bids",
        subtitle: "1 bids pending review",
        icon: Gavel,
        color: "var(--chart-2)",
    },
    {
        title: "Manage Fleet",
        subtitle: "4 vehicles registered",
        icon: Truck,
        color: "var(--chart-5)",
    },
    {
        title: "View Billing",
        subtitle: "3 invoices",
        icon: Wallet,
        color: "var(--primary)",
    },
];

export default function QuickActions() {
    return (
        <Card className="relative flex min-h-[500px] flex-col border-none bg-card ring-1 ring-border shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Top primary border for consistent theme */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary z-10" />

            <CardHeader className="pb-4 pt-8 px-6 flex-shrink-0">
                <CardTitle className="text-[18px] font-black tracking-tighter text-foreground leading-none">
                    Quick Actions
                </CardTitle>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mt-1.5">
                    FAST-TRACK YOUR WORKFLOW
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 px-6 pb-8 mt-1 flex-grow">
                {ACTIONS.map((action, i) => (
                    <div
                        key={i}
                        className="group/item flex cursor-pointer items-center justify-between rounded-xl p-3 bg-muted/20 ring-1 ring-border/20 transition-all duration-300 hover:bg-muted/50 hover:ring-border hover:translate-x-0.5 border-none"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover/item:scale-105 shadow-sm bg-background border border-border/10"
                                style={{ color: action.color }}
                            >
                                <action.icon size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[13px] font-black text-foreground leading-tight tracking-tight">
                                    {action.title}
                                </p>
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mt-1">
                                    {action.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted/10 opacity-0 group-hover/item:opacity-100 transition-all duration-500">
                            <ChevronRight size={14} className="text-muted-foreground" strokeWidth={3} />
                        </div>
                    </div>
                ))}
                {/* Grayscale hover theme button */}
                <button className="flex w-full items-center justify-center gap-3 rounded-xl py-3.5 mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground bg-muted/5 ring-1 ring-dashed ring-border/50 hover:bg-muted hover:text-foreground transition-all">
                    <span className="text-[16px] leading-none">+</span> Add Vehicle
                </button>
            </CardContent>
        </Card>
    );
}
