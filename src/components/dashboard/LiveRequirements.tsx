"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const DATA = [
    {
        id: "002",
        status: "LIVE",
        bids: 5,
        project: "Godda Thermal Plant",
        client: "Adani Power",
        location: "Godda, Jharkhand",
        duty: "24hr duty",
        date: "2026-04-01",
        types: ["Dumper", "Wheel Loader"],
        moreCount: 1
    },
    {
        id: "004",
        status: "LIVE",
        bids: 11,
        project: "Rajmahal OCP",
        client: "ECL",
        location: "Dumka, Jharkhand",
        duty: "12hr duty",
        date: "2026-03-10",
        types: ["Trailer", "Poclain"],
        moreCount: 2
    },
    {
        id: "005",
        status: "LIVE",
        bids: 3,
        project: "Mumbai Coastal Road",
        client: "L&T Construction",
        location: "Mumbai, Maharashtra",
        duty: "24hr duty",
        date: "2026-04-15",
        types: ["Transit Mixer", "Boom Placer"],
        moreCount: 2
    }
];

export default function LiveRequirements() {
    const router = useRouter();

    return (
        <div className="flex flex-col rounded-xl border border-border bg-white shadow-none transition-all duration-200 hover:border-primary/30 hover:shadow-sm dark:bg-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#22c55e]" />

            <div className="flex justify-between items-start px-6 pt-6 pb-5 border-b border-border/50">
                <div className="flex items-start gap-2.5">
                    <div className="mt-1.5 relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground leading-tight">
                            Live Requirements
                        </h2>
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">
                            Open for bidding now
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    onClick={() => router.push('/requirements')}
                    className="text-sm font-semibold h-9 px-4 rounded-md border-border/50 shadow-sm transition-colors hover:bg-muted hover:text-foreground"
                >
                    View All
                </Button>
            </div>

            <div className="flex flex-col">
                {DATA.map((req, i) => (
                    <div
                        key={i}
                        onClick={() => router.push(`/requirements/${req.id}`)}
                        className={cn(
                            "px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-muted/30 transition-colors",
                            i !== DATA.length - 1 ? "border-b border-border/50" : ""
                        )}
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="text-xs font-medium text-muted-foreground">REQ-{req.id}</span>
                                <span className="text-xs font-bold text-[#22c55e]">{req.status}</span>
                                <span className="text-xs font-medium text-muted-foreground">• {req.bids} bids</span>
                            </div>
                            <div className="text-base font-bold text-foreground leading-tight">
                                {req.project}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground mt-1">
                                {req.client}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin size={12} className="opacity-70" /> {req.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock size={12} className="opacity-70" /> {req.duty}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar size={12} className="opacity-70" /> {req.date}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                            <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                                {req.types.length + (req.moreCount || 0)} equipment types
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {req.types.map((type, idx) => (
                                    <span
                                        key={idx}
                                        className="border border-border/50 bg-background/50 rounded-sm px-2.5 py-1 text-xs text-muted-foreground font-medium"
                                    >
                                        {type}
                                    </span>
                                ))}
                                {req.moreCount > 0 && (
                                    <span className="border border-border/50 bg-background/50 rounded-sm px-2.5 py-1 text-xs text-muted-foreground font-medium">
                                        +{req.moreCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
