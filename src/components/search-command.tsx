"use client"

import * as React from "react"
import {
    Settings,
    User,
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Bell,
    Search,
    Plus,
    FileText,
    PieChart,
    Truck,
    ShieldCheck,
} from "lucide-react"

import { useRouter } from "next/navigation"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

export function SearchCommand() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const onSelect = (path: string) => {
        setOpen(false)
        router.push(path)
    }

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="relative hidden md:block cursor-pointer group"
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:scale-110" />
                <div className="w-64 h-10 pl-10 pr-3 flex items-center justify-between text-sm text-muted-foreground bg-muted/30 hover:bg-muted/50 border border-white/10 rounded-full transition-all">
                    <span>Search anything...</span>
                    <kbd className="h-5 select-none items-center gap-1 rounded bg-background/50 px-1.5 font-mono text-[10px] font-medium opacity-100 flex border border-white/20">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="max-h-[400px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Quick Actions">
                        <CommandItem onSelect={() => onSelect("/products")}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Create New Product</span>
                            <CommandShortcut>⌘N</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/orders")}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            <span>View All Orders</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/inventory/stock")}>
                            <Truck className="mr-2 h-4 w-4" />
                            <span>Check Stock Levels</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={() => onSelect("/")}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard Overview</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/customers")}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Manage Customers</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/invoices")}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Billing & Invoices</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/?tab=analytics")}>
                            <PieChart className="mr-2 h-4 w-4" />
                            <span>Performance Analytics</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="System">
                        <CommandItem onSelect={() => onSelect("/")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Security & Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/")}>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Administrative Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/")}>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            <span>System Health</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
