"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Hammer, Truck, Receipt, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DATA = {
    bids: [
        { id: "REQ-001", eq: "Hyva", qty: 10, rate: "₹1,850", joining: "2 days", status: "ACCEPTED" },
        { id: "REQ-001", eq: "Water Tanker", qty: 5, rate: "₹2,800", joining: "1 days", status: "ACCEPTED" },
        { id: "REQ-002", eq: "Dumper", qty: 8, rate: "₹3,200", joining: "3 days", status: "ACTIVE" },
        { id: "REQ-004", eq: "Trailer", qty: 5, rate: "₹45", joining: "2 days", status: "ACCEPTED" },
    ],
    orders: [
        { id: "WO-001", eq: "Hyva", qty: 10, rate: "₹1,850", joining: "Active", status: "DEPLOYED" },
        { id: "WO-005", eq: "Water Tanker", qty: 5, rate: "₹2,800", joining: "Active", status: "DEPLOYED" },
    ],
    billing: [
        { id: "BILL-001", eq: "Hyva", qty: 10, rate: "₹1,850", joining: "Jan 2026", status: "PAID" },
        { id: "BILL-004", eq: "Hyva", qty: 4, rate: "₹1,850", joining: "Feb 2026", status: "PENDING" },
    ]
};

export default function ActivityTable() {
    const [tab, setTab] = useState<"bids" | "orders" | "billing">("bids");
    const data = DATA[tab];

    return (
        <Card className="relative flex flex-col border-none bg-card ring-1 ring-border shadow-md overflow-hidden group transition-all duration-300">
            {/* Top indicator bar using primary color variable */}
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-primary z-20" />

            {/* Scrollable Tabs row - Improved with conditional color hover */}
            <div className="flex flex-row items-center border-b border-border/10 relative z-10 overflow-x-auto no-scrollbar scroll-smooth">
                <button
                    onClick={() => setTab("bids")}
                    className={cn(
                        "px-8 py-5 text-[8.5px] font-black uppercase tracking-[0.25em] transition-all relative flex items-center gap-2",
                        tab === "bids" ? "text-foreground bg-muted font-black" : "text-muted-foreground/60 hover:text-foreground hover:bg-[oklch(0.6_0.15_150)/0.05] dark:hover:bg-muted/30"
                    )}
                >
                    <Hammer size={12} className={tab === "bids" ? "text-primary" : "opacity-30"} />
                    BIDS
                    {tab === "bids" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-primary shadow-sm" />}
                </button>
                <button
                    onClick={() => setTab("orders")}
                    className={cn(
                        "px-8 py-5 text-[8.5px] font-black uppercase tracking-[0.25em] transition-all relative flex items-center gap-2",
                        tab === "orders" ? "text-foreground bg-muted font-black" : "text-muted-foreground/60 hover:text-foreground hover:bg-[oklch(0.6_0.15_150)/0.05] dark:hover:bg-muted/30"
                    )}
                >
                    <Truck size={12} className={tab === "orders" ? "text-primary" : "opacity-30"} />
                    ORDERS
                    {tab === "orders" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-primary shadow-sm" />}
                </button>
                <button
                    onClick={() => setTab("billing")}
                    className={cn(
                        "px-8 py-5 text-[8.5px] font-black uppercase tracking-[0.25em] transition-all relative flex items-center gap-2",
                        tab === "billing" ? "text-foreground bg-muted font-black" : "text-muted-foreground/60 hover:text-foreground hover:bg-[oklch(0.6_0.15_150)/0.05] dark:hover:bg-muted/30"
                    )}
                >
                    <Receipt size={12} className={tab === "billing" ? "text-primary" : "opacity-30"} />
                    BILLING
                    {tab === "billing" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-primary shadow-sm" />}
                </button>
            </div>

            <CardContent className="p-0 overflow-hidden relative z-10 w-full">
                <div className="overflow-x-auto w-full scrollbar-hidden">
                    <Table className="w-full">
                        <TableHeader className="bg-muted/10 border-none transition-none pointer-events-none">
                            <TableRow className="border-none hover:bg-transparent transition-none">
                                <TableHead className="px-8 py-4 h-auto text-[8.5px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 border-none"># ID</TableHead>
                                <TableHead className="px-8 py-4 h-auto text-[8.5px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 border-none">EQUIPMENT</TableHead>
                                <TableHead className="px-8 py-4 h-auto text-[8.5px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 border-none text-center">QTY</TableHead>
                                <TableHead className="px-8 py-4 h-auto text-[8.5px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 border-none">RATE</TableHead>
                                <TableHead className="px-8 py-4 h-auto text-[8.5px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 border-none text-right">STATUS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-border/10">
                            {data.map((row, i) => (
                                <TableRow
                                    key={i}
                                    className="group/row transition-all duration-300 hover:bg-[oklch(0.6_0.15_150)/0.03] dark:hover:bg-muted/10 border-none cursor-pointer overflow-hidden"
                                >
                                    <TableCell className="px-8 py-4 text-[10px] font-black text-muted-foreground/30 leading-none tabular-nums group-hover/row:text-primary transition-colors">
                                        {row.id}
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-[13px] font-black text-foreground tracking-tighter leading-none">
                                        {row.eq}
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-[13px] font-black text-foreground text-center tabular-nums leading-none">
                                        {row.qty}
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-[13px] font-black text-primary/80 tracking-tighter tabular-nums leading-none font-mono">
                                        {row.rate}
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Badge variant="outline" className={cn(
                                                "h-5 text-[7.5px] font-black uppercase tracking-widest px-2.5 rounded-md border-none ring-1 transition-all shadow-sm",
                                                (row.status === "ACTIVE" || row.status === "DEPLOYED" || row.status === "ACCEPTED" || row.status === "PAID")
                                                    ? "bg-primary/10 text-primary ring-primary/20"
                                                    : "bg-muted text-muted-foreground ring-border/10"
                                            )}>
                                                {row.status}
                                            </Badge>
                                            <ChevronRight size={12} className="text-muted-foreground/10 group-hover/row:text-primary transition-all group-hover/row:translate-x-0.5" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
