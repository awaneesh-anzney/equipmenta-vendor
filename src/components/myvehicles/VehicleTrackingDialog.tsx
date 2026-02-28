'use client';

import React from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { type Vehicle } from '@/data/mockdata';
import { MapPin, Navigation, Info, Activity } from 'lucide-react';

interface VehicleTrackingDialogProps {
    vehicle: Vehicle | null;
    open: boolean;
    onClose: () => void;
}

const statusCls: Record<string, string> = {
    ACTIVE: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
    STANDBY: 'bg-primary/10  text-primary  border-primary/20',
    PENDING: 'bg-chart-1/15 text-chart-1 border-chart-1/20',
    BREAKDOWN: 'bg-destructive/15 text-destructive border-destructive/20',
    REJECTED: 'bg-destructive/15 text-destructive border-destructive/20',
};

export function VehicleTrackingDialog({ vehicle, open, onClose }: VehicleTrackingDialogProps) {
    if (!vehicle) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[600px] bg-card border-border p-0 overflow-hidden">
                <div className="p-6 pb-4 border-b border-border">
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-[18px] font-bold text-foreground flex items-center gap-2">
                                Tracking — {vehicle.vehicleNumber}
                                <Badge className={`text-[10px] px-2 py-0 ${statusCls[vehicle.status]}`}>
                                    {vehicle.status}
                                </Badge>
                            </DialogTitle>
                            <p className="text-[12px] text-muted-foreground">
                                {vehicle.category} · {vehicle.capacity}
                            </p>
                        </div>
                    </DialogHeader>
                </div>

                <div className="relative aspect-video w-full bg-muted overflow-hidden group">
                    <img
                        src="/dummy_fleet_map.png"
                        alt="Vehicle's current location on map"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="flex-1 rounded-xl bg-background/80 backdrop-blur-md border border-white/10 p-3 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                        <Navigation size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-medium text-muted-foreground leading-none">Last Location</span>
                                        <span className="text-[13px] font-bold text-foreground mt-1">Rajmahal OCP, Dumka</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[11px] font-medium text-muted-foreground leading-none">Status</span>
                                    <span className="text-[13px] font-bold text-chart-2 mt-1 flex items-center gap-1.5">
                                        <Activity size={12} strokeWidth={3} className="animate-pulse" /> Moving (42 km/h)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dummy Map Pin (Visual Only) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            {/* Pulsing effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-primary/40 animate-ping" />
                            <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-primary shadow-2xl border-2 border-white">
                                <MapPin size={20} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-2 gap-6 bg-muted/20">
                    <div className="space-y-1">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Driver Info</span>
                        <p className="text-[14px] font-semibold text-foreground flex items-center gap-2">
                            👤 {vehicle.driverName || 'Not Assigned'}
                        </p>
                        <p className="text-[12px] text-muted-foreground">DL: {vehicle.driverLicense || 'N/A'}</p>
                    </div>

                    <div className="space-y-1 flex flex-col items-end text-right">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Project Assignment</span>
                        <p className="text-[14px] font-semibold text-chart-2 flex items-center gap-2">
                            📍 {vehicle.assignedProject || 'Available on Standby'}
                        </p>
                        <p className="text-[12px] text-muted-foreground">Updated 10 mins ago</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
