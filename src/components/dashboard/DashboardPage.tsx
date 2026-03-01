"use client";

import StatsCards from "./StatsCards";
import EarningsTrend from "./EarningsTrend";
import StatusCard from "./StatusCard";
import LiveRequirements from "./LiveRequirements";
import ActivityTable from "./ActivityTable";

export default function DashboardPage() {
    return (
        <div className="flex flex-col p-2 md:p-4 lg:p-5 lg:pt-3 bg-background min-h-screen text-foreground">
            {/* Container with requested Grid Row Class: gap-6 */}
            <div className="flex flex-col gap-6">

                {/* Row 1: Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <StatsCards />
                </div>

                {/* Row 2: Charts (The requested xl:grid-cols-3 pattern) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div className="xl:col-span-2">
                        <EarningsTrend />
                    </div>
                    <div className="xl:col-span-1">
                        <StatusCard />
                    </div>
                </div>

                {/* Row 3: Live Requirements (Full width grid list) */}
                <div className="w-full">
                    <LiveRequirements />
                </div>

                {/* Row 4: Detailed Activity Table */}
                <div className="w-full pb-10">
                    <ActivityTable />
                </div>

            </div>
        </div>
    );
}
