'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockVendorVehicles, type Vehicle } from '@/data/mockdata';
import { AddVehicleDialog } from './AddVehicleDialog';
import { VehicleTrackingDialog } from './VehicleTrackingDialog';

const statusCls: Record<string, string> = {
    ACTIVE: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
    STANDBY: 'bg-primary/10  text-primary  border-primary/20',
    PENDING: 'bg-chart-1/15 text-chart-1 border-chart-1/20',
    BREAKDOWN: 'bg-destructive/15 text-destructive border-destructive/20',
    REJECTED: 'bg-destructive/15 text-destructive border-destructive/20',
};

const categoryIcon: Record<string, string> = {
    'Hyva': '🚛', 'Dumper': '🚛', 'Tipper': '🚛',
    'Water Tanker': '🚰', 'Trailer': '🚂',
    'Excavator': '🦾', 'Poclain': '🦾',
};

function getIcon(category: string): string {
    return categoryIcon[category] ?? '🚜';
}

export default function MyVehiclesPage() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    const handleAddVehicle = (data: any) => {
        console.log('Vehicle Added:', data);
        // Here you would normally update your state or call an API
    };

    return (
        <div className="w-full">
            {/* Header row */}
            <div className="mb-5 flex flex-wrap items-start sm:items-end justify-between gap-3">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">My Vehicles</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your fleet and deployment status
                    </p>
                </div>
                <Button
                    className="shrink-0"
                    style={{ background: 'var(--sidebar-primary)', color: 'var(--sidebar-primary-foreground)' }}
                    onClick={() => setIsAddOpen(true)}
                >
                    + Add Vehicle
                </Button>
            </div>

            {/* Grid — 1 col mobile, 2 col sm, 3 col lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                {mockVendorVehicles.map((v) => (
                    <Card
                        key={v.id}
                        className="gap-0 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 cursor-pointer"
                        onClick={() => setSelectedVehicle(v)}
                    >
                        <CardContent className="p-4">
                            {/* Top row */}
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-2xl">{getIcon(v.category)}</span>
                                <Badge className={`text-xs font-semibold ${statusCls[v.status]}`}>
                                    {v.status}
                                </Badge>
                            </div>

                            <p className="mb-0.5 font-mono text-[13.5px] sm:text-[14px] font-bold text-foreground">
                                {v.vehicleNumber}
                            </p>
                            <p className="mb-1 text-[13px] text-muted-foreground">{v.category}</p>
                            <div className="mb-2 flex gap-1.5 text-xs text-muted-foreground">
                                <span>{v.capacity}</span>
                            </div>

                            {v.driverName && (
                                <p className="mb-1 text-[12px] text-muted-foreground truncate">
                                    👤 {v.driverName}
                                </p>
                            )}
                            {v.assignedProject && (
                                <p className="mb-1.5 text-[11.5px] font-medium text-chart-2 truncate">
                                    📍 {v.assignedProject}
                                </p>
                            )}

                            <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                                <span>Fitness: {v.fitnessExpiry}</span>
                                <span>Insurance: {v.insuranceExpiry}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AddVehicleDialog
                open={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSubmit={handleAddVehicle}
            />

            <VehicleTrackingDialog
                vehicle={selectedVehicle}
                open={!!selectedVehicle}
                onClose={() => setSelectedVehicle(null)}
            />
        </div>
    );
}
