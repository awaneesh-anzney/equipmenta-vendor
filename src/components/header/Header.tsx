'use client';

import { Bell, Settings, Menu, Sun, Moon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const routeTitleMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/requirements': 'Requirements',
    '/mybids': 'My Bids',
    '/workorders': 'Work Orders',
    '/myvehicles': 'My Vehicles',
    '/billing': 'Billing',
};

function getPageTitle(pathname: string) {
    for (const [route, title] of Object.entries(routeTitleMap)) {
        if (pathname === route || pathname.startsWith(route + '/')) return title;
    }
    return 'Vendor Panel';
}

interface HeaderProps {
    onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
    const pathname = usePathname();
    const title = getPageTitle(pathname);
    const { setTheme, resolvedTheme } = useTheme();

    const [dateStr, setDateStr] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setDateStr(
            new Date().toLocaleDateString('en-IN', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })
        );
    }, []);

    const isDark = resolvedTheme === 'dark';

    return (
        <header className="flex h-[64px] shrink-0 items-center border-b border-border bg-card px-6">

            {/* ── Mobile hamburger ── */}
            <button
                className="lg:hidden mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-150"
                onClick={onMenuToggle}
                aria-label="Open menu"
            >
                <Menu size={20} strokeWidth={1.8} />
            </button>

            {/* ── LEFT: Page title ── */}
            <div className="flex flex-col justify-center shrink-0">
                <h1 className="text-[18px] font-bold text-foreground leading-tight">
                    {title}
                </h1>
                <p
                    className="hidden lg:block text-[11px] text-muted-foreground mt-0.5 font-medium"
                    suppressHydrationWarning
                >
                    {dateStr}
                </p>
            </div>

            {/* ── CENTER: Spacer ── */}
            <div className="flex-1" />

            {/* ── RIGHT: Search & Actions ── */}
            <div className="flex items-center gap-3 shrink-0">
                <div className="relative hidden sm:block">
                    <Search
                        size={13}
                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50"
                    />
                    <Input
                        placeholder="Search..."
                        className="h-9 w-52 rounded-lg border border-border/50 bg-muted/30 pl-8 text-[13px] transition-all duration-300 hover:border-primary/40 hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                    />
                </div>

                <div className="flex items-center gap-1">

                    {/* Theme toggle */}
                    <button
                        aria-label="Toggle theme"
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 active:scale-90"
                    >
                        {mounted
                            ? isDark
                                ? <Sun size={18} strokeWidth={1.8} />
                                : <Moon size={18} strokeWidth={1.8} />
                            : <Moon size={18} strokeWidth={1.8} />
                        }
                    </button>

                    {/* Notifications */}
                    <button
                        aria-label="Notifications"
                        className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 active:scale-90"
                    >
                        <Bell size={18} strokeWidth={1.8} />
                        <span className="absolute top-2 right-2 h-[8px] w-[8px] rounded-full bg-destructive border-2 border-card" />
                    </button>

                    {/* Settings */}
                    <button
                        aria-label="Settings"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 active:scale-90 ml-1"
                    >
                        <Settings size={18} strokeWidth={1.8} />
                    </button>
                </div>
            </div>
        </header>
    );
}
