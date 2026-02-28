'use client';

import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface AddVehicleDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const CATEGORIES = ['Hyva', 'Dumper', 'Tipper', 'Water Tanker', 'Trailer', 'Excavator', 'Poclain'];

export function AddVehicleDialog({ open, onClose, onSubmit }: AddVehicleDialogProps) {
    const [form, setForm] = useState({
        vehicleNumber: '',
        category: '',
        capacity: '',
        driverName: '',
        fitnessExpiry: '',
        insuranceExpiry: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
        setForm({
            vehicleNumber: '',
            category: '',
            capacity: '',
            driverName: '',
            fitnessExpiry: '',
            insuranceExpiry: '',
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[440px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-foreground text-base">
                        Add New Vehicle
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-foreground text-[12.5px]">Vehicle Number</Label>
                        <Input
                            placeholder="e.g. JH-01-AB-1234"
                            value={form.vehicleNumber}
                            onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })}
                            className="bg-background border-input text-foreground h-9"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Category</Label>
                            <Select
                                value={form.category}
                                onValueChange={(v) => setForm({ ...form, category: v })}
                                required
                            >
                                <SelectTrigger className="bg-background border-input text-foreground h-9">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border text-foreground">
                                    {CATEGORIES.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Capacity</Label>
                            <Input
                                placeholder="e.g. 20 Ton"
                                value={form.capacity}
                                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                                className="bg-background border-input text-foreground h-9"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="text-foreground text-[12.5px]">Driver Name</Label>
                        <Input
                            placeholder="Full Name"
                            value={form.driverName}
                            onChange={(e) => setForm({ ...form, driverName: e.target.value })}
                            className="bg-background border-input text-foreground h-9"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Fitness Expiry</Label>
                            <Input
                                type="date"
                                value={form.fitnessExpiry}
                                onChange={(e) => setForm({ ...form, fitnessExpiry: e.target.value })}
                                className="bg-background border-input text-foreground h-9"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-foreground text-[12.5px]">Insurance Expiry</Label>
                            <Input
                                type="date"
                                value={form.insuranceExpiry}
                                onChange={(e) => setForm({ ...form, insuranceExpiry: e.target.value })}
                                className="bg-background border-input text-foreground h-9"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-bold mt-2"
                        style={{ background: 'var(--sidebar-primary)', color: 'var(--sidebar-primary-foreground)' }}
                    >
                        Save Vehicle
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
