'use client';

import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Send } from 'lucide-react';
import {
    type Requirement,
    type RequirementItem,
    RATE_TYPE_OPTIONS,
} from '@/data/mockdata';

export interface BidFormData {
    vehiclesOffered: string;
    rate: string;
    rateType: string;
    joiningTime: string;
    vehicleAge: string;
    remarks: string;
}

interface BidDialogProps {
    req: Requirement;
    item: RequirementItem;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: BidFormData) => void;
}

export function BidDialog({ req, item, open, onClose, onSubmit }: BidDialogProps) {
    const [form, setForm] = useState<BidFormData>({
        vehiclesOffered: '',
        rate: '',
        rateType: item.rateType,
        joiningTime: '',
        vehicleAge: '',
        remarks: '',
    });

    const setField = (k: keyof BidFormData) => (v: string) =>
        setForm(f => ({ ...f, [k]: v }));
    const handleInput = (k: keyof BidFormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    const openSlots = item.quantityRequired - item.quantityAllocated;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[440px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-foreground text-base">
                        Submit Bid — {req.id}
                    </DialogTitle>
                </DialogHeader>

                {/* Context */}
                <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
                    <p className="font-bold text-foreground">{req.projectName} — {req.clientName}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{req.siteLocation}</p>
                    <p className="mt-1.5 text-xs font-semibold" style={{ color: 'var(--sidebar-primary)' }}>
                        {item.vehicleCategory} · {item.capacity} · {openSlots} open slots
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Vehicles offering */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-foreground text-[12.5px]">Units Offering</Label>
                        <Select
                            value={form.vehiclesOffered}
                            onValueChange={setField('vehiclesOffered')}
                            required
                        >
                            <SelectTrigger className="bg-background border-input text-foreground h-9">
                                <SelectValue placeholder={`Max ${openSlots}`} />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border text-foreground">
                                {Array.from({ length: openSlots }, (_, i) => i + 1).map(n => (
                                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Rate + Rate Type */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Rate (₹)</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 1850"
                                value={form.rate}
                                onChange={handleInput('rate')}
                                className="bg-background border-input text-foreground h-9"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Rate Type</Label>
                            <Select value={form.rateType} onValueChange={setField('rateType')}>
                                <SelectTrigger className="bg-background border-input text-foreground h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border text-foreground">
                                    {RATE_TYPE_OPTIONS.map(o => (
                                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Joining Time + Vehicle Age */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Joining (days)</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 2"
                                value={form.joiningTime}
                                onChange={handleInput('joiningTime')}
                                className="bg-background border-input text-foreground h-9"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Vehicle Age (Year)</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 2022"
                                value={form.vehicleAge}
                                onChange={handleInput('vehicleAge')}
                                className="bg-background border-input text-foreground h-9"
                                required
                            />
                        </div>
                    </div>

                    {/* Remarks */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-foreground text-[12.5px]">Remarks</Label>
                        <Textarea
                            placeholder="Any additional info..."
                            value={form.remarks}
                            onChange={handleInput('remarks')}
                            rows={2}
                            className="bg-background border-input text-foreground placeholder:text-muted-foreground resize-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-bold"
                        style={{ background: 'var(--sidebar-primary)', color: 'var(--sidebar-primary-foreground)' }}
                    >
                        <Send size={15} /> Submit Bid
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
