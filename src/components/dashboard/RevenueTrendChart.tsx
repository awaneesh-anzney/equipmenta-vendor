"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const DEFAULT_DATA = [
    { month: "Sep", revenue: 38 },
    { month: "Oct", revenue: 56 },
    { month: "Nov", revenue: 45 },
    { month: "Dec", revenue: 58 },
    { month: "Jan", revenue: 62 },
    { month: "Feb", revenue: 72 },
];

const chartConfig = {
    revenue: {
        label: "Revenue (₹L)",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

interface DataPoint { month: string; revenue: number }
interface RevenueTrendChartProps { data?: DataPoint[]; badge?: string }

export default function RevenueTrendChart({
    data = DEFAULT_DATA,
    badge = "+18%",
}: RevenueTrendChartProps) {
    return (
        <div
            className="flex h-full flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card overflow-hidden"
            style={{ borderTop: "3px solid var(--primary)" }}
        >
            {/* Header */}
            <div className="shrink-0 flex items-start justify-between px-5 pt-4 pb-2">
                <div>
                    <p className="text-[14px] font-bold leading-none text-foreground">Revenue Trend</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">Monthly (₹ Lakhs)</p>
                </div>
                {badge && (
                    <Badge className="gap-1 border-none bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                        {badge}
                    </Badge>
                )}
            </div>

            {/* 
                Chart area: Reduced height to h-[185px] (was 210) to make it compact.
                Added more tickMargin and adjusted ticks for cleaner gap.
            */}
            <div className="flex-1 min-h-[220px]">
                <ChartContainer config={chartConfig} className="h-full w-full px-2 pb-3">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                                <stop offset="90%" stopColor="var(--primary)" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            stroke="currentColor"
                            strokeOpacity={0.08}
                            strokeDasharray="5 4"
                        />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: "currentColor", fillOpacity: 0.80 }}
                            tickMargin={10}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: "currentColor", fillOpacity: 0.80 }}
                            tickMargin={6}
                            width={42}
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                            className="text-foreground"
                        />

                        <ChartTooltip
                            cursor={{
                                stroke: "var(--primary)",
                                strokeWidth: 1.5,
                                strokeOpacity: 1,
                            }}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    labelClassName="font-bold text-foreground"
                                    className="rounded-lg border border-border bg-white dark:bg-card shadow-md text-[11px]"
                                />
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--primary)"
                            strokeWidth={2.5}
                            fill="url(#revenue-gradient)"
                            dot={false}
                            activeDot={{
                                r: 4.5,
                                fill: "var(--primary)",
                                stroke: "var(--background)",
                                strokeWidth: 2
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </div>
    );
}
