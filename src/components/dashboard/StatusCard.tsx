"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DATA = {
    bid: [
        { name: "Accepted", value: 3, color: "#22c55e" },
        { name: "Active", value: 1, color: "#3b82f6" },
    ],
    fleet: [
        { name: "Active", value: 4, color: "#22c55e" },
        { name: "Standby", value: 1, color: "#eab308" },
    ],
};

const chartConfig = {
    Accepted: { label: "Accepted", color: "#22c55e" },
    Active: { label: "Active", color: "#3b82f6" },
    Standby: { label: "Standby", color: "#eab308" },
} satisfies ChartConfig;

export default function StatusCard() {
    const [tab, setTab] = useState<"bid" | "fleet">("bid");
    const data = DATA[tab];
    const router = useRouter();

    const handleTabClick = (e: React.MouseEvent, target: "bid" | "fleet") => {
        e.stopPropagation();
        setTab(target);
    };

    return (
        <div
            onClick={() => router.push(tab === "bid" ? "/mybids" : "/myvehicles")}
            className="flex flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card relative overflow-hidden h-full cursor-pointer justify-between"
        >
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: "#22c55e" }} />

            <div className="flex justify-center pt-6 px-4">
                <div className="flex bg-muted/20 p-1.5 rounded-lg border border-border/30">
                    <button
                        onClick={(e) => handleTabClick(e, "bid")}
                        className={cn(
                            "px-8 py-2 text-xs font-semibold rounded-md transition-colors",
                            tab === "bid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Bid Status
                    </button>
                    <button
                        onClick={(e) => handleTabClick(e, "fleet")}
                        className={cn(
                            "px-8 py-2 text-xs font-semibold rounded-md transition-colors",
                            tab === "fleet" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Fleet Status
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center pt-6 pb-8 px-4 flex-1">
                <div className="relative h-[150px] w-[150px]">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <PieChart width={150} height={150}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                strokeWidth={2}
                                stroke="var(--card)"
                                dataKey="value"
                                paddingAngle={0}
                                animationDuration={1000}
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
                                            <div className="rounded-md border border-border bg-card py-2 px-3 text-xs font-bold shadow-md">
                                                {item.name}: <span style={{ color: item.payload.color }}>{item.value}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ChartContainer>
                </div>

                <div className="flex items-center justify-center gap-6 pt-8 w-full">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs font-medium text-foreground">
                                {item.name} ({item.value})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
