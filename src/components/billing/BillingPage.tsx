import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { mockVendorBilling, computeBillingSummary, formatINR } from '@/data/mockdata';

const statusCls: Record<string, string> = {
    PAID: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
    APPROVED: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
    VERIFIED: 'bg-primary/10  text-primary  border-primary/20',
    GENERATED: 'bg-muted/60   text-muted-foreground border-border',
};

export default function BillingPage() {
    const { total, received, outstanding } = computeBillingSummary(mockVendorBilling);

    const summary = [
        { label: 'Total Billed', value: formatINR(total), cls: '' },
        { label: 'Received', value: formatINR(received), cls: 'border-chart-2/30 bg-chart-2/5' },
        { label: 'Outstanding', value: formatINR(outstanding), cls: 'border-chart-1/30 bg-chart-1/5' },
    ];

    return (
        <div className="w-full">
            <div className="mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Billing</h2>
                <p className="mt-1 text-sm text-muted-foreground">View and manage your invoices</p>
            </div>

            {/* Summary — 1-col mobile, 3-col sm+ */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                {summary.map((s) => (
                    <Card key={s.label} className={`gap-0 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 cursor-default ${s.cls}`}>
                        <CardContent className="p-4">
                            <span className="block mb-1.5 text-xs font-medium text-muted-foreground">
                                {s.label}
                            </span>
                            <span className="block text-[22px] sm:text-[24px] font-extrabold text-foreground">
                                {s.value}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Table — horizontal scroll on mobile */}
            <Card className="overflow-hidden py-0 gap-0">
                <div className="overflow-x-auto">
                    <Table className="min-w-[720px]">
                        <TableHeader>
                            <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
                                {['Bill ID', 'Month', 'Project', 'Client', 'Trips', 'Gross', 'Deductions', 'Net Amount', 'Status', 'Action'].map(h => (
                                    <TableHead key={h} className="text-muted-foreground text-xs font-semibold h-10 px-3 whitespace-nowrap">
                                        {h}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockVendorBilling.map((b) => (
                                <TableRow key={b.id} className="border-border transition-colors duration-150 cursor-default hover:bg-[color-mix(in_oklch,var(--primary)_5%,transparent)]">
                                    <TableCell className="py-3 px-3 font-semibold text-muted-foreground text-[12.5px] whitespace-nowrap">
                                        {b.id}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 text-foreground text-[12.5px] whitespace-nowrap">
                                        {b.month}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 text-foreground text-[12.5px]">
                                        {b.projectName}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 text-foreground text-[12.5px] whitespace-nowrap">
                                        {b.clientName}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 text-foreground text-[12.5px] whitespace-nowrap">
                                        {b.totalTrips > 0 ? b.totalTrips : '—'}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 text-foreground text-[12.5px] whitespace-nowrap">
                                        {formatINR(b.grossAmount)}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 text-destructive text-[12.5px] whitespace-nowrap">
                                        {b.penaltyDeduction > 0 ? `-${formatINR(b.penaltyDeduction)}` : '—'}
                                    </TableCell>
                                    <TableCell className="py-3 px-3 font-bold text-foreground text-[12.5px] whitespace-nowrap">
                                        {formatINR(b.netAmount)}
                                    </TableCell>
                                    <TableCell className="py-3 px-3">
                                        <Badge className={`text-xs font-semibold whitespace-nowrap ${statusCls[b.status]}`}>
                                            {b.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3 px-3">
                                        <Button variant="outline" size="xs" className="border-border text-muted-foreground whitespace-nowrap hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors duration-150">
                                            ⬇ PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
