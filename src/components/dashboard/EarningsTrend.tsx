"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
    { month: "Sep", earnings: 3.8 },
    { month: "Oct", earnings: 5.6 },
    { month: "Nov", earnings: 4.5 },
    { month: "Dec", earnings: 5.8 },
    { month: "Jan", earnings: 6.2 },
    { month: "Feb", earnings: 7.2 },
];

const chartConfig = {
    earnings: {
        label: "Earnings (₹L)",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export default function EarningsTrend() {
    return (
        <Card className="min-h-[280px] w-full border-border bg-card ring-1 ring-border/50 shadow-md overflow-hidden relative group hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
            {/* Top indicator bar using primary color variable */}
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-primary z-20" />

            <CardHeader className="flex flex-row items-start justify-between px-6 py-5 pb-1 space-y-0 relative z-10 transition-all">
                <div>
                    <CardTitle className="text-[16px] font-black tracking-tighter text-foreground leading-none">
                        Earnings Trend
                    </CardTitle>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mt-1.5">
                        LAST 6 MONTHS PERFORMANCE
                    </p>
                </div>
                <div className="text-right flex flex-col items-end">
                    <p className="text-[16px] font-black text-foreground tracking-tighter tabular-nums leading-none">
                        ₹18,27,100
                    </p>
                    <div className="flex items-center justify-end gap-1.5 mt-1.5 bg-primary/5 px-2 py-0.5 rounded-full ring-1 ring-primary/20">
                        <span className="text-[7.5px] font-black text-primary uppercase tracking-widest flex items-center leading-none">
                            ↗ +12.5% vs last
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-3 pb-3 pt-0 relative z-0 flex flex-col justify-end transition-all">
                {/* Compact chart height of 190px */}
                <ChartContainer config={chartConfig} className="h-[190px] w-full mt-2">
                    <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="earnings-gradient-compact" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.12} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeOpacity={0.05}
                            strokeDasharray="4 4"
                            stroke="currentColor"
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 8.5, fontWeight: 900, fill: "var(--muted-foreground)" }}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 7.5, fontWeight: 900, fill: "var(--muted-foreground)" }}
                            tickMargin={8}
                            tickFormatter={(value) => `₹${value}L`}
                        />
                        <ChartTooltip
                            cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className="bg-card shadow-lg border-border ring-1 ring-border/5 p-2 rounded-lg text-[9px]"
                                />
                            }
                        />
                        <Area
                            type="monotone"
                            dataKey="earnings"
                            stroke="var(--primary)"
                            strokeWidth={2.5}
                            fill="url(#earnings-gradient-compact)"
                            animationDuration={1500}
                            activeDot={{
                                r: 3.5,
                                fill: "var(--primary)",
                                stroke: "var(--card)",
                                strokeWidth: 2
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
