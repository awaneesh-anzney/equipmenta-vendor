"use client";

import StatsCards from "./StatsCards";
import EarningsTrend from "./EarningsTrend";
import StatusCard from "./StatusCard";
import LiveRequirements from "./LiveRequirements";
import ActivityTable from "./ActivityTable";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4 p-3 md:p-5 bg-background min-h-screen text-foreground">
            {/* Header removed as requested */}

            {/* Main Layout Container with tighter gap:3 */}
            <div className="flex flex-col gap-4">

                {/* Row 1: Compact Stats */}
                <section className="px-1">
                    <StatsCards />
                </section>

                {/* Row 2: Charts (Side by side) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-1">
                    {/* Status Card (Pie Chart) */}
                    <div className="xl:col-span-1">
                        <StatusCard />
                    </div>
                    {/* Earnings Trend (Area Graph) */}
                    <div className="xl:col-span-2">
                        <EarningsTrend />
                    </div>
                </div>

                {/* Row 3: Live Requirements (Simplified as per request) */}
                <div className="px-1">
                    <LiveRequirements />
                </div>

                {/* Row 4: Activity Table */}
                <section className="px-1 pb-6">
                    <ActivityTable />
                </section>
            </div>
        </div>
    );
}
