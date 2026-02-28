'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Send } from 'lucide-react';
import {
    mockRequirements,
    type Requirement,
    type RequirementItem,
} from '@/data/mockdata';
import { FullDetailsDialog } from './FullDetailsDialog';
import { BidDialog } from './BidDialog';

export default function RequirementsPage() {
    const [detailsReq, setDetailsReq] = useState<Requirement | null>(null);
    const [bidState, setBidState] = useState<{ req: Requirement; item: RequirementItem } | null>(null);

    // Show only LIVE requirements for bidding
    const liveRequirements = mockRequirements.filter(r => r.status === 'LIVE');

    return (
        <div className="w-full">
            <div className="mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Available Requirements</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Browse and bid on open requirements
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {liveRequirements.map((req) => (
                    <div
                        key={req.id}
                        className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40"
                    >
                        {/* Top row */}
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs font-semibold tracking-wide">
                                    {req.id}
                                </Badge>
                                <Badge className="bg-green-500/15 text-green-700 border-green-200 text-xs font-bold">
                                    {req.status}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    {req.bidsCount} bids
                                </Badge>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5 text-muted-foreground border-border bg-background hover:bg-muted"
                                onClick={() => setDetailsReq(req)}
                            >
                                <Eye size={14} /> Full Details
                            </Button>
                        </div>

                        <h3 className="text-[17px] font-bold text-foreground">{req.projectName}</h3>
                        <p className="mb-2.5 text-[13px] text-muted-foreground">
                            {req.clientName} — {req.siteLocation}
                        </p>
                        <p className="mb-2 text-[12px] font-semibold text-muted-foreground">⚙ Equipment Required</p>

                        {/* Item rows */}
                        <div className="mb-4 flex flex-col gap-1.5">
                            {req.items.map((item) => {
                                const open = item.quantityRequired - item.quantityAllocated;
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition-colors duration-150 cursor-default hover:bg-[color-mix(in_oklch,var(--primary)_5%,transparent)]"
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[13.5px] font-semibold text-foreground">
                                                {item.vehicleCategory}
                                            </span>
                                            <Badge variant="secondary" className="text-xs font-normal">{item.capacity}</Badge>
                                            <Badge variant="secondary" className="text-xs font-normal">×{item.quantityRequired} total</Badge>
                                            {open > 0 && (
                                                <Badge className="text-xs font-normal bg-green-500/10 text-green-700 border-green-200">
                                                    {open} open
                                                </Badge>
                                            )}
                                            <Badge variant="secondary" className="text-xs font-normal">{item.rateType}</Badge>
                                        </div>
                                        <Button
                                            size="sm"
                                            disabled={open === 0}
                                            className="font-bold gap-1.5 disabled:opacity-40"
                                            style={{ background: 'var(--sidebar-primary)', color: 'var(--sidebar-primary-foreground)' }}
                                            onClick={() => setBidState({ req, item })}
                                        >
                                            <Send size={13} /> Bid
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <Separator className="mb-3.5 bg-border" />
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {[
                                { label: 'From', value: req.startDate },
                                { label: 'To', value: req.endDate },
                                { label: 'Payment', value: req.paymentCycle },
                                { label: 'Diesel', value: req.dieselBy },
                                { label: 'Duty', value: req.dutyHours },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex flex-col gap-0.5">
                                    <span className="text-[11px] text-muted-foreground">{label}</span>
                                    <span className="text-[12.5px] font-semibold text-foreground">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialogs */}
            {detailsReq && (
                <FullDetailsDialog
                    req={detailsReq}
                    open={!!detailsReq}
                    onClose={() => setDetailsReq(null)}
                />
            )}
            {bidState && (
                <BidDialog
                    req={bidState.req}
                    item={bidState.item}
                    open={!!bidState}
                    onClose={() => setBidState(null)}
                    onSubmit={(d) => console.log('Bid submitted:', d)}
                />
            )}
        </div>
    );
}
