"use client";

import { useRouter } from "next/navigation";
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

const data = [
    { month: "Sep", earnings: 0 },
    { month: "Oct", earnings: 2 },
    { month: "Nov", earnings: 3 },
    { month: "Dec", earnings: 2.5 },
    { month: "Jan", earnings: 4 },
    { month: "Feb", earnings: 3 },
];

const chartConfig = {
    earnings: {
        label: "Earnings (₹L)",
        color: "#22c55e",
    },
} satisfies ChartConfig;

export default function EarningsTrend() {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/billing')}
            className="flex flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card relative overflow-hidden h-full cursor-pointer"
        >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#22c55e]" />

            <div className="flex justify-between items-start pt-6 px-6">
                <div>
                    <h2 className="text-lg font-bold text-foreground">
                        Earnings Trend
                    </h2>
                    <p className="text-[11px] text-muted-foreground mt-1">
                        Last 6 months performance
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold text-foreground">
                        ₹18,27,100
                    </div>
                    <div className="text-[11px] text-[#22c55e] mt-1 flex items-center justify-end gap-1">
                        ↗ +12.5%
                    </div>
                </div>
            </div>

            <div className="px-2 pb-2 pt-4 flex-1 flex flex-col justify-end">
                <ChartContainer config={chartConfig} className="h-[220px] w-full">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="earnings-gradient-final" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeOpacity={0.05}
                            strokeDasharray="4 4"
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                            tickMargin={12}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                            tickMargin={12}
                            tickFormatter={(value) => `₹${value}L`}
                        />
                        <ChartTooltip
                            cursor={{ stroke: "#22c55e", strokeWidth: 1.5, strokeDasharray: "4 4" }}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className="bg-card shadow-lg border-border ring-1 ring-border/10 p-2 rounded-lg text-[10px]"
                                />
                            }
                        />
                        <Area
                            type="monotone"
                            dataKey="earnings"
                            stroke="#22c55e"
                            strokeWidth={2}
                            fill="url(#earnings-gradient-final)"
                            animationDuration={2000}
                            activeDot={{
                                r: 4,
                                fill: "#22c55e",
                                stroke: "var(--card)",
                                strokeWidth: 2
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </div>
    );
}
