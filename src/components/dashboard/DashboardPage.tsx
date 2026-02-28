import { Card, CardContent } from '@/components/ui/card';
import { vendorDashboardStats, formatINR, currentVendor } from '@/data/mockdata';

const stats = [
    {
        label: 'Active Bids',
        value: String(vendorDashboardStats.activeBids),
        desc: `${vendorDashboardStats.openBids} open / awaiting`,
        barColor: 'var(--sidebar-primary)',
    },
    {
        label: 'Work Orders',
        value: String(vendorDashboardStats.activeOrders),
        desc: 'Currently running',
        barColor: 'oklch(0.696 0.17 162.48)',
    },
    {
        label: 'Vehicles Deployed',
        value: String(vendorDashboardStats.vehiclesDeployed),
        desc: 'On active sites',
        barColor: 'oklch(0.488 0.243 264.376)',
    },
    {
        label: 'Total Earnings',
        value: formatINR(vendorDashboardStats.totalEarnings),
        desc: 'All time',
        barColor: 'oklch(0.6 0.118 184.704)',
    },
];

const activity = [
    { icon: '✈', text: 'Bid submitted on REQ-002 (Dumper × 8)', time: '2 hrs ago', bg: 'bg-primary/10', iconColor: 'text-primary' },
    { icon: '📋', text: 'Work Order WO-006 status updated to PENDING', time: '1 day ago', bg: 'bg-chart-2/10', iconColor: 'text-chart-2' },
    { icon: '🚛', text: 'Vehicle JH-06-OP-1122 deployed to Rajmahal OCP', time: '2 days ago', bg: 'bg-chart-1/10', iconColor: 'text-chart-1' },
    { icon: '💰', text: 'Payment ₹9,01,500 received — BILL-001 (Jan 2026)', time: '5 days ago', bg: 'bg-chart-4/10', iconColor: 'text-chart-4' },
];

export default function DashboardPage() {
    return (
        <div className="w-full">
            {/* Welcome */}
            <div className="mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    Welcome back, {currentVendor.name} 👋
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {currentVendor.company} — here&apos;s a snapshot of your activity
                </p>
            </div>

            {/* Stats grid — 2 col on mobile, 4 on desktop */}
            <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
                {stats.map((s) => (
                    <Card
                        key={s.label}
                        className="relative overflow-hidden gap-3 py-5 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div
                            className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl"
                            style={{ background: s.barColor }}
                        />
                        <CardContent className="px-4 sm:px-5">
                            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{s.label}</p>
                            <p className="mb-1 text-[22px] sm:text-[26px] font-extrabold leading-none text-foreground">
                                {s.value}
                            </p>
                            <p className="text-[11px] sm:text-[11.5px] text-muted-foreground">{s.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <p className="mb-3 text-[15px] font-bold text-foreground">Recent Activity</p>
            <div className="flex flex-col gap-2">
                {activity.map((a, i) => (
                    <Card key={i} className="py-0 gap-0 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-default">
                        <CardContent className="flex items-center gap-3 px-3 sm:px-4 py-3">
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base ${a.bg} ${a.iconColor}`}
                            >
                                {a.icon}
                            </span>
                            <span className="flex-1 text-[12.5px] sm:text-[13.5px] text-foreground leading-snug">
                                {a.text}
                            </span>
                            <span className="hidden sm:block whitespace-nowrap text-[11.5px] text-muted-foreground">
                                {a.time}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
