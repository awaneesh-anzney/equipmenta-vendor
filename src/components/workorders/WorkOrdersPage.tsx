import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockVendorWorkOrders } from '@/data/mockdata';

const statusCls: Record<string, string> = {
    PENDING: 'bg-chart-1/15 text-chart-1 border-chart-1/20',
    ACCEPTED: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
    ACTIVE: 'bg-chart-2/15 text-chart-2 border-chart-2/20',
    EXPIRED: 'bg-muted/60    text-muted-foreground border-border',
};

export default function WorkOrdersPage() {
    return (
        <div className="w-full">
            <div className="mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Work Orders</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Your active and historical work assignments
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {mockVendorWorkOrders.map((wo) => (
                    <Card key={wo.id} className="gap-0 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 cursor-default">
                        <CardContent className="px-4 sm:px-5 py-4">
                            {/* Top — stacks nicely since flex-wrap */}
                            <div className="mb-3.5 flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <Badge variant="secondary" className="mb-1.5 text-xs font-semibold">
                                        {wo.id}
                                    </Badge>
                                    <h3 className="text-[15px] sm:text-[16px] font-bold text-foreground leading-tight">
                                        {wo.projectName}
                                    </h3>
                                    <p className="text-[12.5px] sm:text-[13px] text-muted-foreground">
                                        {wo.clientName} · {wo.siteLocation}
                                    </p>
                                </div>
                                <Badge className={`shrink-0 text-xs font-semibold ${statusCls[wo.status]}`}>
                                    {wo.status}
                                </Badge>
                            </div>

                            <Separator className="mb-3 bg-border" />

                            {/* Detail row — wraps nicely on small screens */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
                                {[
                                    { label: 'Equipment', val: `${wo.vehicleCategory} ×${wo.quantity}` },
                                    { label: 'Rate', val: `₹${wo.rate.toLocaleString('en-IN')} / ${wo.rateType.split(' ')[1]}` },
                                    { label: 'Validity', val: wo.validity },
                                    { label: 'Payment', val: wo.paymentCycle },
                                    { label: 'Penalty', val: wo.penaltyClause },
                                ].map(({ label, val }) => (
                                    <div key={label} className="flex flex-col gap-0.5">
                                        <span className="text-[11px] text-muted-foreground">{label}</span>
                                        <span className="text-[12.5px] sm:text-[13px] font-semibold text-foreground">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
