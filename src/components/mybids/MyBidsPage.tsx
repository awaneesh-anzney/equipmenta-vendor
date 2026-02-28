import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { mockVendorBids, getRequirementById } from '@/data/mockdata';

const statusCls: Record<string, string> = {
    ACTIVE: 'bg-chart-1/15 text-chart-1 border-chart-1/20',
    ACCEPTED: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
    REJECTED: 'bg-destructive/15 text-destructive border-destructive/20',
    PARTIAL: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
};

export default function MyBidsPage() {
    return (
        <div className="w-full">
            <div className="mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">My Bids</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Track all your submitted bids and their status
                </p>
            </div>

            {/* Table wrapped in overflow-x-auto for horizontal scroll on mobile */}
            <Card className="overflow-hidden py-0 gap-0 transition-all duration-300 hover:shadow-md hover:border-primary/40">
                <div className="overflow-x-auto">
                    <Table className="min-w-[640px]">
                        <TableHeader>
                            <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
                                {['Bid ID', 'Requirement', 'Project', 'Equipment', 'Qty', 'Rate', 'Date', 'Status'].map(h => (
                                    <TableHead key={h} className="text-muted-foreground text-xs font-semibold h-10 px-4 whitespace-nowrap">
                                        {h}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockVendorBids.map((b) => {
                                const req = getRequirementById(b.requirementId);
                                return (
                                    <TableRow key={b.id} className="border-border transition-colors duration-150 cursor-default hover:bg-[color-mix(in_oklch,var(--primary)_5%,transparent)]">
                                        <TableCell className="py-3.5 px-4 font-semibold text-muted-foreground text-[13px] whitespace-nowrap">
                                            {b.id}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4 text-foreground text-[13px] whitespace-nowrap font-medium">
                                            {b.requirementId}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4 text-foreground text-[13px]">
                                            {req?.projectName ?? '—'}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4 text-foreground text-[13px] whitespace-nowrap">
                                            {b.vehicleCategory}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4 text-foreground text-[13px] whitespace-nowrap">
                                            ×{b.vehiclesOffering}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4 text-foreground text-[13px] font-medium whitespace-nowrap">
                                            ₹{b.rate.toLocaleString('en-IN')}/{b.rateType.split(' ')[1]}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4 text-muted-foreground text-[13px] whitespace-nowrap">
                                            {b.createdAt}
                                        </TableCell>
                                        <TableCell className="py-3.5 px-4">
                                            <Badge className={`text-xs font-semibold whitespace-nowrap ${statusCls[b.status]}`}>
                                                {b.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
