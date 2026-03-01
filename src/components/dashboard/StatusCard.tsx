"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DATA = {
    bid: [
        { name: "Accepted", value: 3, color: "var(--primary)" },
        { name: "Active", value: 1, color: "var(--chart-2)" },
    ],
    fleet: [
        { name: "Active", value: 4, color: "var(--primary)" },
        { name: "Standby", value: 1, color: "var(--chart-5)" },
    ],
};

const chartConfig = {
    Accepted: { label: "Accepted", color: "var(--primary)" },
    Active: { label: "Active", color: "var(--chart-2)" },
    Standby: { label: "Standby", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function StatusCard() {
    const [tab, setTab] = useState<"bid" | "fleet">("bid");
    const data = DATA[tab];
    const total = data.reduce((a, b) => a + b.value, 0);

    return (
        <Card className="min-h-[280px] w-full border-border bg-card ring-1 ring-border/50 shadow-md overflow-hidden flex flex-col items-center relative group hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
            {/* Top indicator bar using primary color variable */}
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-primary z-20" />

            <CardHeader className="w-full flex flex-row items-center justify-center pb-0 pt-5 px-5 relative z-10 transition-all">
                <div className="flex gap-0.5 rounded-lg bg-muted/40 p-1 border border-border/10 backdrop-blur-md">
                    <button
                        onClick={() => setTab("bid")}
                        className={cn(
                            "px-5 py-2 text-[8px] font-black uppercase tracking-[0.2em] transition-all rounded-md",
                            tab === "bid" ? "bg-card text-foreground shadow-sm ring-1 ring-border/10" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Bid Status
                    </button>
                    <button
                        onClick={() => setTab("fleet")}
                        className={cn(
                            "px-5 py-2 text-[8px] font-black uppercase tracking-[0.2em] transition-all rounded-md",
                            tab === "fleet" ? "bg-card text-foreground shadow-sm ring-1 ring-border/10" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Fleet Status
                    </button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 w-full flex flex-col items-center justify-center pt-3 pb-5 px-5 relative z-10 transition-all">
                <div className="relative h-[110px] w-[110px] group/chart">
                    {/* Subtle glow using primary variable */}
                    <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl z-0" />

                    <ChartContainer config={chartConfig} className="h-full w-full relative z-10">
                        <PieChart width={110} height={110}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={52}
                                strokeWidth={0}
                                stroke="none"
                                dataKey="value"
                                paddingAngle={4}
                                animationDuration={800}
                                animationBegin={0}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        className="hover:opacity-80 transition-opacity"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const item = payload[0];
                                        return (
                                            <div className="rounded-md border border-border bg-card py-2 px-3 text-[9px] font-black text-foreground shadow-xl ring-1 ring-border/5">
                                                {item.name} : <span className="text-primary">{item.value}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ChartContainer>

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-20 transition-transform duration-500 group-hover:scale-105">
                        <span className="text-[22px] font-black text-foreground tracking-tighter leading-none">{total}</span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mt-0.5">Units</span>
                    </div>
                </div>

                {/* Legend pills below chart */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-5 w-full">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-2.5 py-1 bg-muted/20 rounded-md border border-border/5 hover:bg-muted dark:hover:bg-muted/20 transition-all">
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[9px] font-black tracking-tight text-foreground/70">
                                {item.name} ({item.value})
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
