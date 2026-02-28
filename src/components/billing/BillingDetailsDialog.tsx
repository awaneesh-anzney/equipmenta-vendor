'use client';

import React from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type BillingRecord, formatINR } from '@/data/mockdata';

interface BillingDetailsDialogProps {
    bill: BillingRecord | null;
    open: boolean;
    onClose: () => void;
}

const statusCls: Record<string, string> = {
    PAID: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
    APPROVED: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
    VERIFIED: 'bg-primary/10  text-primary  border-primary/20',
    GENERATED: 'bg-muted/60   text-muted-foreground border-border',
};

function DetailItem({ label, value, valueClass = "" }: { label: string; value: string | number; valueClass?: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[12px] text-muted-foreground">{label}</span>
            <span className={`text-[14px] font-semibold text-foreground ${valueClass}`}>{value}</span>
        </div>
    );
}

export function BillingDetailsDialog({ bill, open, onClose }: BillingDetailsDialogProps) {
    if (!bill) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[500px] bg-card border-border p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-[18px] font-bold text-foreground">
                        Bill Details — {bill.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <DetailItem label="Vendor" value={bill.vendorName} />
                    <DetailItem label="Project" value={bill.projectName} />
                    <DetailItem label="Client" value={bill.clientName} />
                    <DetailItem label="Month" value={bill.month} />
                    <DetailItem label="Total Trips" value={bill.totalTrips > 0 ? bill.totalTrips : '—'} />
                    <DetailItem label="Rate" value={formatINR(bill.rate)} />
                </div>

                <div className="mt-8 space-y-4 rounded-xl border border-border bg-muted/20 p-5">
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="text-muted-foreground">Gross Amount</span>
                        <span className="font-semibold text-foreground">{formatINR(bill.grossAmount)}</span>
                    </div>

                    {bill.penaltyDeduction > 0 && (
                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-muted-foreground">Penalty</span>
                            <span className="font-semibold text-destructive">-{formatINR(bill.penaltyDeduction)}</span>
                        </div>
                    )}

                    {bill.extraShiftBonus > 0 && (
                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-muted-foreground">Extra Shift Bonus</span>
                            <span className="font-semibold text-chart-2">+{formatINR(bill.extraShiftBonus)}</span>
                        </div>
                    )}

                    {bill.dieselDeduction > 0 && (
                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-muted-foreground">Diesel Deduction</span>
                            <span className="font-semibold text-destructive">-{formatINR(bill.dieselDeduction)}</span>
                        </div>
                    )}

                    <Separator className="bg-border/50" />

                    <div className="flex justify-between items-center">
                        <span className="text-[14px] font-bold text-foreground">Net Payable</span>
                        <span className="text-[18px] font-black text-foreground">{formatINR(bill.netAmount)}</span>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] text-muted-foreground">Status</span>
                        <Badge className={`text-[11px] font-bold px-2.5 py-0.5 ${statusCls[bill.status]}`}>
                            {bill.status}
                        </Badge>
                    </div>

                    <Button variant="outline" size="sm" className="h-9 px-4 border-border hover:bg-muted text-[13px]">
                        Download PDF
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
