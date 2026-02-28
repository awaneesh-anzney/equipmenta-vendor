"use client";

import { currentVendor } from "@/data/mockdata";
import StatsRow from "./StatsRow";
import RevenueTrendChart from "./RevenueTrendChart";
import FleetStatusChart from "./FleetStatusChart";
import RecentRequirementsTable from "./RecentRequirementsTable";
import BidActivityChart from "./BidActivityChart";
import QuickStats from "./QuickStats";

export default function DashboardPage() {
    return (
        <div className="flex w-full flex-col gap-6 pb-8">
            {/* Welcome Header */}
            <div>
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                    Welcome back, {currentVendor.name} 👋
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {currentVendor.company} — here&apos;s a snapshot of your activity
                </p>
            </div>

            {/* Top Stats Row */}
            <StatsRow />

            {/* Middle Row: Revenue Trend (Left) & Fleet Status (Right) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RevenueTrendChart />
                </div>
                <div className="lg:col-span-1">
                    <FleetStatusChart />
                </div>
            </div>

            {/* Bottom Row: Quick Stats & Bid Activity (Left) | Recent Requirements (Right) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col gap-6 lg:col-span-1">
                    <QuickStats />
                    <BidActivityChart />
                </div>
                <div className="lg:col-span-2">
                    <RecentRequirementsTable />
                </div>
            </div>
        </div>
    );
}
