"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Bell,
    Search,
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
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <div className="w-64 h-9 pl-8 pr-2 flex items-center justify-between text-sm text-muted-foreground bg-muted/50 border border-transparent rounded-md transition-all group-hover:bg-muted group-hover:border-input">
                    <span>Search anything...</span>
                    <kbd className="h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 flex transition-colors group-hover:border-primary/50 group-hover:text-primary">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => onSelect("/")}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard Overview</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/customers")}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Customer List</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/products")}>
                            <Package className="mr-2 h-4 w-4" />
                            <span>Product Inventory</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => onSelect("/")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile Settings</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/")}>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notification Preferences</span>
                        </CommandItem>
                        <CommandItem onSelect={() => onSelect("/")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>General Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
