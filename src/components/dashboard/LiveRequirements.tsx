"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    ArrowRight,
    Clock,
    Calendar,
    ChevronRight,
} from "lucide-react";

const DATA = [
    {
        id: "002",
        status: "LIVE",
        bids: 5,
        project: "Godda Thermal Plant",
        client: "Adani Power",
        location: "Godda",
        duty: "24h",
        date: "01/04",
        types: ["Dumper", "Loader"],
    },
    {
        id: "004",
        status: "LIVE",
        bids: 11,
        project: "Rajmahal OCP",
        client: "ECL",
        location: "Dumka",
        duty: "12h",
        date: "10/03",
        types: ["Trailer", "Poclain"],
    },
    {
        id: "005",
        status: "LIVE",
        bids: 3,
        project: "Mumbai Coastal Road",
        client: "L&T",
        location: "Mumbai",
        duty: "24h",
        date: "15/04",
        types: ["Mixer", "Placer"],
    }
];

export default function LiveRequirements() {
    return (
        <Card className="relative flex min-h-[400px] flex-col border-none bg-card ring-1 ring-border shadow-md overflow-hidden group hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors">
            {/* Top indicator bar using primary color variable */}
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-primary z-20" />

            <CardHeader className="flex flex-row items-center justify-between px-6 py-6 pb-2 relative z-10 flex-shrink-0">
                <div className="space-y-1 mt-0.5">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-destructive"></span>
                        </span>
                        <CardTitle className="text-[16px] font-black tracking-tighter text-foreground leading-none">
                            Live Requirements
                        </CardTitle>
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mt-1">
                        OPEN FOR BIDDING NOW
                    </p>
                </div>
                <Button variant="outline" className="text-foreground hover:text-primary font-black gap-1.5 text-[8.5px] uppercase tracking-[0.1em] bg-muted/10 border-border/10 ring-1 ring-border/5 rounded-lg px-5 h-8 hover:bg-muted-accent transition-all">
                    View All <ArrowRight size={11} className="group-hover:translate-x-0.5 duration-500" />
                </Button>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 px-6 pb-6 flex-grow relative z-0 mt-3 transition-all">
                {DATA.map((req, i) => (
                    <div
                        key={i}
                        className="group/item relative overflow-hidden bg-muted/20 rounded-xl p-4 ring-1 ring-border/15 transition-all duration-300 hover:bg-card hover:ring-border hover:shadow-lg cursor-pointer border-none flex flex-col justify-between"
                    >
                        <div className="flex flex-row items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-[8px] font-mono tracking-tighter text-muted-foreground/20 italic">
                                    #{req.id}
                                </span>
                                <Badge variant="outline" className="h-4 bg-primary/10 text-primary border-none ring-1 ring-primary/20 text-[7px] font-black px-1.5">
                                    {req.status}
                                </Badge>
                            </div>
                            <span className="text-[9px] font-black text-foreground/30">• {req.bids} BIDS</span>
                        </div>

                        <div className="mt-3 relative z-10">
                            <h3 className="text-[15px] font-black tracking-tighter text-foreground group-hover/item:text-primary transition-colors leading-tight truncate">
                                {req.project}
                            </h3>
                            <p className="text-[10px] font-bold text-muted-foreground/40 leading-none mt-1">
                                {req.client}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-4 relative z-10">
                            {req.types.map((type, idx) => (
                                <span key={idx} className="text-[8px] font-black uppercase tracking-tight text-foreground/50 px-1.5 py-0.5 bg-background/50 rounded-md ring-1 ring-border/10">
                                    {type}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-x-4 pt-3 mt-3 border-t border-border/5 relative z-10">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={9} className="text-primary/40" />
                                <span className="text-[8px] font-black text-muted-foreground/50">{req.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={9} className="text-primary/40" />
                                <span className="text-[8px] font-black text-muted-foreground/50">{req.duty}</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 opacity-0 group-hover/item:opacity-20 translate-x-4 group-hover/item:translate-x-0 transition-all duration-500 pointer-events-none">
                            <ChevronRight size={20} className="text-muted-foreground" strokeWidth={4} />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
