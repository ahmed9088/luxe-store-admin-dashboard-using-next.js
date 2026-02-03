"use client"

import Link from "next/link"
import * as React from "react"
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Users,
    LayoutDashboard,
    ShoppingCart,
    Package,
    BarChart3,
    Bell,
    Search,
    ChevronRight,
    LogOut,
    User as UserIcon,
    CreditCard,
    Sparkles,
    BadgeCheck,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const data = {
    user: {
        name: "Ahmed Saffar",
        email: "ahmed@example.com",
        avatar: "/avatars/ahmed.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                { title: "Overview", url: "/" },
                { title: "Analytics", url: "/?tab=analytics" },
                { title: "Reports", url: "/?tab=reports" },
            ],
        },
        {
            title: "Sales",
            url: "/orders",
            icon: ShoppingCart,
            items: [
                { title: "Orders", url: "/orders" },
                { title: "Invoices", url: "/invoices" },
                { title: "Customers", url: "/customers" },
            ],
        },
        {
            title: "Inventory",
            url: "/products",
            icon: Package,
            items: [
                { title: "Products", url: "/products" },
                { title: "Categories", url: "/inventory/categories" },
                { title: "Stock", url: "/inventory/stock" },
            ],
        },
        {
            title: "Marketing",
            url: "#",
            icon: Sparkles,
            items: [
                { title: "Campaigns", url: "#" },
                { title: "Promotions", url: "#" },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

import { useDashboard } from "@/hooks/use-dashboard"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useDashboard()

    return (
        <Sidebar variant="inset" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg gradient-gold text-black shadow-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                                    <span className="truncate font-bold text-gradient text-lg">LUXE</span>
                                    <span className="truncate text-[10px] tracking-tighter opacity-70">ADMIN ENTERPRISE v2.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>Help & Support</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="sm" asChild>
                                <Link href="#">
                                    <LifeBuoy />
                                    <span>Support Center</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="sm" asChild>
                                <Link href="#">
                                    <Send />
                                    <span>Send Feedback</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">{user.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <span className="truncate text-xs">{user.email}</span>
                                    </div>
                                    <ChevronRight className="ml-auto size-4 rotate-90" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="rounded-lg">{user.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user.name}</span>
                                            <span className="truncate text-xs">{user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck className="mr-2 size-4" />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 size-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell className="mr-2 size-4" />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 size-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
