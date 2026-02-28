"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// ── Self-contained data ──────────────────────────────────────
const DEFAULT_DATA = [
    { day: "Mon", bids: 12 },
    { day: "Tue", bids: 24 },
    { day: "Wed", bids: 48 },
    { day: "Thu", bids: 36 },
    { day: "Fri", bids: 72 },
    { day: "Sat", bids: 18 },
    { day: "Sun", bids: 22 },
];

// Colors from globals.css — var(--primary) = orange
const chartConfig = {
    bids: {
        label: "Bids",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

interface BidActivityPoint { day: string; bids: number }
interface BidActivityChartProps { data?: BidActivityPoint[] }

export default function BidActivityChart({ data = DEFAULT_DATA }: BidActivityChartProps) {
    return (
        <div
            className="flex h-full flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card overflow-hidden"
            style={{ borderTop: "3px solid var(--primary)" }}
        >
            <div className="shrink-0 px-5 pt-4 pb-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground leading-none mb-1">
                    Activity
                </p>
                <p className="text-[15px] font-bold leading-none text-foreground">Bid Activity</p>
            </div>

            <div className="flex-1 min-h-[140px]">
                <ChartContainer config={chartConfig} className="h-full w-full px-2 pb-2">
                    <BarChart
                        data={data}
                        margin={{ top: 4, right: 6, left: -20, bottom: 0 }}
                        barSize={18}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="currentColor"
                            strokeOpacity={0.08}
                            className="text-foreground"
                        />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: "currentColor", fillOpacity: 0.5 }}
                            tickMargin={4}
                            className="text-foreground"
                        />
                        <YAxis hide />
                        <ChartTooltip
                            cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    className="rounded-lg border border-border bg-white dark:bg-card shadow-md text-[12px]"
                                    labelClassName="font-bold text-foreground"
                                />
                            }
                        />
                        <Bar
                            dataKey="bids"
                            fill="var(--primary)"
                            radius={[4, 4, 0, 0]}
                            opacity={0.85}
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}
