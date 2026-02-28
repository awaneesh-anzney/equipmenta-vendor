'use client';

import React from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { type Requirement } from '@/data/mockdata';

/* ── Detail Item helper ───────────────────────────────────────── */
function DetailItem({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-[13px] font-semibold text-foreground">{value ?? '—'}</span>
        </div>
    );
}

interface FullDetailsDialogProps {
    req: Requirement;
    open: boolean;
    onClose: () => void;
}

export function FullDetailsDialog({ req, open, onClose }: FullDetailsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[560px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-foreground text-base">
                        {req.id} — {req.projectName}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-x-3 gap-y-4 mt-1">
                    <DetailItem label="Client" value={req.clientName} />
                    <DetailItem label="Location" value={req.siteLocation} />
                    <DetailItem label="Material" value={req.materialType} />
                    <DetailItem label="Start" value={req.startDate} />
                    <DetailItem label="End" value={req.endDate} />
                    <DetailItem label="Duty" value={req.dutyHours} />
                    <DetailItem label="Diesel By" value={req.dieselBy} />
                    <DetailItem label="Payment" value={req.paymentCycle} />
                    <DetailItem label="Penalty" value={req.penaltyRule} />
                    <DetailItem label="Reporting" value={req.reportingTime} />
                    <DetailItem label="Replacement" value={req.replacementRequired ? 'Yes' : 'No'} />
                    <DetailItem label="Total Bids" value={String(req.bidsCount)} />
                </div>

                <Separator className="my-1 bg-border" />

                <p className="text-sm font-bold text-foreground">Equipment Required</p>
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            {['Category', 'Capacity', 'Required', 'Allocated', 'Rate Type'].map(h => (
                                <TableHead key={h} className="text-muted-foreground text-xs h-9 px-3">{h}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {req.items.map((item) => (
                            <TableRow key={item.id} className="border-border transition-colors duration-150 cursor-default hover:bg-[color-mix(in_oklch,var(--primary)_5%,transparent)]">
                                <TableCell className="py-2.5 px-3 font-medium text-foreground">{item.vehicleCategory}</TableCell>
                                <TableCell className="py-2.5 px-3 text-muted-foreground">{item.capacity}</TableCell>
                                <TableCell className="py-2.5 px-3 text-muted-foreground">{item.quantityRequired}</TableCell>
                                <TableCell className="py-2.5 px-3 text-muted-foreground">{item.quantityAllocated}</TableCell>
                                <TableCell className="py-2.5 px-3 text-muted-foreground">{item.rateType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}
