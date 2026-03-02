"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hammer, Truck, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

import { mockVendorBids, mockVendorWorkOrders, mockVendorBilling, formatSAR } from "@/data/mockdata";

function getMonthShort(monthStr: string) {
    const parts = monthStr.split(' ');
    if (parts.length === 2) return `${parts[0].substring(0, 3)} ${parts[1]}`;
    return monthStr;
}

const DATA = {
    bids: mockVendorBids.slice(0, 4).map(b => ({
        id: b.requirementId,
        eq: b.vehicleCategory,
        qty: b.vehiclesOffering,
        rate: formatSAR(b.rate),
        joining: b.joiningDays + " days",
        status: b.status,
        route: "/mybids"
    })),
    orders: mockVendorWorkOrders.slice(0, 4).map(w => ({
        id: w.id,
        eq: w.vehicleCategory,
        qty: w.quantity,
        rate: formatSAR(w.rate),
        joining: w.status === 'ACTIVE' ? "Active" : "Pending",
        status: w.status === "ACTIVE" ? "DEPLOYED" : w.status,
        route: "/workorders"
    })),
    billing: mockVendorBilling.slice(0, 4).map(b => ({
        id: b.id,
        eq: b.requirementId,
        qty: b.totalTrips > 0 ? b.totalTrips : "-",
        rate: formatSAR(b.rate),
        joining: getMonthShort(b.month),
        status: b.status,
        route: "/billing"
    }))
};

export default function ActivityTable() {
    const [tab, setTab] = useState<"bids" | "orders" | "billing">("bids");
    const data = DATA[tab];
    const router = useRouter();

    const handleTabClick = (e: React.MouseEvent, target: "bids" | "orders" | "billing") => {
        e.stopPropagation();
        setTab(target);
    };

    return (
        <div className="flex flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: "#22c55e" }} />

            <div className="flex px-4 pt-1 gap-4 border-b border-border/50 items-end overflow-x-auto no-scrollbar pt-4">
                <button
                    onClick={(e) => handleTabClick(e, "bids")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2",
                        tab === "bids" ? "text-foreground border-[#22c55e]" : "text-muted-foreground border-transparent hover:text-foreground"
                    )}
                >
                    <Hammer size={16} />
                    My Recent Bids
                </button>
                <button
                    onClick={(e) => handleTabClick(e, "orders")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2",
                        tab === "orders" ? "text-foreground border-[#22c55e]" : "text-muted-foreground border-transparent hover:text-foreground"
                    )}
                >
                    <Truck size={16} />
                    Active Work Orders
                </button>
                <button
                    onClick={(e) => handleTabClick(e, "billing")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2",
                        tab === "billing" ? "text-foreground border-[#22c55e]" : "text-muted-foreground border-transparent hover:text-foreground"
                    )}
                >
                    <Receipt size={16} />
                    Recent Billing
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="border-b border-border/50">
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">REQ ID</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">EQUIPMENT</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">QTY</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">RATE</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">JOINING</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                onClick={() => router.push(row.route)}
                                className={cn(
                                    "cursor-pointer hover:bg-[#22c55e]/10 transition-colors",
                                    i !== data.length - 1 ? "border-b border-border/50" : ""
                                )}
                            >
                                <td className="px-6 py-3 text-sm font-medium text-foreground">
                                    {row.id}
                                </td>
                                <td className="px-6 py-3 text-sm font-bold text-foreground">
                                    {row.eq}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-foreground">
                                    {row.qty}
                                </td>
                                <td className="px-6 py-3 text-sm font-bold text-foreground">
                                    {row.rate}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-foreground">
                                    {row.joining}
                                </td>
                                <td className="px-6 py-3 text-xs font-bold tracking-wider uppercase">
                                    <span className={cn(
                                        row.status === "ACTIVE" || row.status === "PAID" ? "text-[#22c55e]" : "text-foreground"
                                    )}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
