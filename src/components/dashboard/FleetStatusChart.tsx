"use client";

import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// ── Self-contained data — colors from globals.css only ───────
const DEFAULT_SEGMENTS = [
    { name: "Active", value: 5, color: "var(--chart-2)" },
    { name: "Standby", value: 1, color: "var(--primary)" },
    { name: "Breakdown", value: 1, color: "var(--destructive)" },
    { name: "Pending", value: 1, color: "var(--chart-3)" },
];
const DEFAULT_TOTAL = 8;

const chartConfig = {
    Active: { label: "Active", color: "var(--chart-2)" },
    Standby: { label: "Standby", color: "var(--primary)" },
    Breakdown: { label: "Breakdown", color: "var(--destructive)" },
    Pending: { label: "Pending", color: "var(--chart-3)" },
} satisfies ChartConfig;

interface Segment { name: string; value: number; color: string }
interface FleetStatusChartProps { total?: number; segments?: Segment[] }

export default function FleetStatusChart({
    total = DEFAULT_TOTAL,
    segments = DEFAULT_SEGMENTS,
}: FleetStatusChartProps) {
    const [hIdx, setHIdx] = useState<number | null>(null);
    // mouse position relative to the donut wrapper div
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const hovered = hIdx !== null ? segments[hIdx] : null;
    const pct = hovered ? Math.round((hovered.value / total) * 100) : 0;

    return (
        <div
            className="flex h-full flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card overflow-hidden"
            style={{ borderTop: "3px solid var(--primary)" }}
        >
            {/* Header */}
            <div className="shrink-0 px-5 pt-4 pb-2">
                <p className="text-[15px] font-bold leading-none text-foreground">Fleet Status</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{total} total vehicles</p>
            </div>

            {/* Donut area — relative so tooltip can be positioned inside it */}
            <div className="flex flex-1 items-center justify-center py-2 min-h-[160px]">
                <div
                    className="relative"
                    style={{ width: 150, height: 150 }}
                    onMouseMove={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                    }}
                    onMouseLeave={() => { setHIdx(null); }}
                >
                    <ChartContainer config={chartConfig} className="absolute inset-0 h-full w-full">
                        <PieChart>
                            <Pie
                                data={segments}
                                cx="50%"
                                cy="50%"
                                innerRadius={44}
                                outerRadius={60}
                                paddingAngle={3}
                                dataKey="value"
                                nameKey="name"
                                strokeWidth={0}
                                onMouseLeave={() => setHIdx(null)}
                            >
                                {segments.map((seg, i) => (
                                    <Cell
                                        key={i}
                                        fill={seg.color}
                                        opacity={hIdx === null || hIdx === i ? 1 : 0.40}
                                        style={{ cursor: "pointer", outline: "none" }}
                                        onMouseEnter={() => setHIdx(i)}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>

                    {/* Center label */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[22px] font-bold leading-none text-foreground tabular-nums">{total}</span>
                        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total</span>
                    </div>

                    {/* 
                        Tooltip — follows the cursor WITHIN the donut wrapper.
                        Offset: +12px right, -40px up from cursor so it doesn't
                        block the segment being hovered.
                        clampX keeps it from going off the right edge.
                    */}
                    {hovered && (
                        <div
                            className="pointer-events-none absolute z-40"
                            style={{
                                left: Math.min(mousePos.x + 12, 192 - 4),
                                top: mousePos.y - 52,
                                transform: "translateX(0)",
                            }}
                        >
                            <div className="rounded-lg border border-border bg-white dark:bg-card px-3 py-1.5 shadow-md whitespace-nowrap">
                                <p className="text-[11px] font-bold text-foreground leading-none">{hovered.name}</p>
                                <p className="mt-0.5 text-[11px] font-semibold leading-none text-primary">
                                    {hovered.value} vehicles · {pct}%
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Legend — 2x2 grid */}
            <div className="shrink-0 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border/40 px-5 py-3">
                {segments.map((seg, i) => (
                    <div
                        key={i}
                        className="flex cursor-default items-center justify-between"
                        onMouseEnter={() => setHIdx(i)}
                        onMouseLeave={() => setHIdx(null)}
                    >
                        <span className="flex min-w-0 items-center gap-1.5">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-150"
                                style={{
                                    backgroundColor: seg.color,
                                    transform: hIdx === i ? "scale(1.35)" : "scale(1)",
                                }}
                            />
                            <span className={`truncate text-[12px] font-medium transition-colors duration-150 ${hIdx === i ? "text-foreground" : "text-muted-foreground"}`}>
                                {seg.name}
                            </span>
                        </span>
                        <span className={`ml-2 shrink-0 text-[13px] font-bold tabular-nums transition-colors duration-150 ${hIdx === i ? "text-primary" : "text-foreground"}`}>
                            {seg.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
