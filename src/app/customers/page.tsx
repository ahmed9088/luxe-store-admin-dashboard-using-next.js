"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import {
    MoreHorizontal,
    Search,
    Plus,
    Download,
    Filter,
    ArrowUpDown
} from "lucide-react"

const initialCustomers = [
    { id: "1", name: "Sarah Chen", email: "sarah@techflow.io", status: "Active", orders: 24, spent: "$3,450", lastSeen: "2 mins ago", initials: "SC", avatar: "/avatars/sarah.jpg" },
    { id: "2", name: "Alex Rivers", email: "alex.r@prism.com", status: "Inactive", orders: 12, spent: "$1,890", lastSeen: "4 hours ago", initials: "AR", avatar: "/avatars/alex.jpg" },
    { id: "3", name: "Mina Koda", email: "mina@koda.design", status: "Active", orders: 45, spent: "$7,210", lastSeen: "Yesterday", initials: "MK", avatar: "/avatars/mina.jpg" },
    { id: "4", name: "James Wilson", email: "j.wilson@corp.net", status: "Active", orders: 8, spent: "$940", lastSeen: "3 days ago", initials: "JW", avatar: "/avatars/james.jpg" },
    { id: "5", name: "Elena Rossi", email: "elena@fashion.it", status: "Banned", orders: 0, spent: "$0", lastSeen: "1 week ago", initials: "ER", avatar: "/avatars/elena.jpg" },
]

export default function CustomersPage() {
    const [customerList, setCustomerList] = React.useState(initialCustomers)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isAddOpen, setIsAddOpen] = React.useState(false)
    const [newCustomer, setNewCustomer] = React.useState({ name: "", email: "" })

    const filteredCustomers = customerList.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddCustomer = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCustomer.name || !newCustomer.email) return

        const id = (customerList.length + 1).toString()
        const initials = newCustomer.name.split(" ").map(n => n[0]).join("").toUpperCase()

        setCustomerList(prev => [{
            id,
            ...newCustomer,
            status: "Active",
            orders: 0,
            spent: "$0.00",
            lastSeen: "Just now",
            initials,
            avatar: ""
        }, ...prev])

        setIsAddOpen(false)
        setNewCustomer({ name: "", email: "" })

        import("sonner").then(({ toast }) => {
            toast.success("Customer added successfully", {
                description: `${newCustomer.name} has been added to your list.`
            })
        })
    }

    const handleDelete = (id: string, name: string) => {
        setCustomerList(prev => prev.filter(c => c.id !== id))
        import("sonner").then(({ toast }) => {
            toast.error(`Customer deleted`, {
                description: `${name} has been removed from the database.`
            })
        })
    }

    const handleAction = (name: string, action: string) => {
        import("sonner").then(({ toast }) => {
            toast.info(`${action} for ${name}`, {
                description: "Viewing requested information."
            })
        })
    }

    return (
        <div className="flex flex-col gap-6 animate-in-fade">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground">
                        Manage your customer base and view their activity.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button size="sm" onClick={() => setIsAddOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Customer
                    </Button>
                </div>
            </div>

            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="sm:max-w-[425px]">
                    <form onSubmit={handleAddCustomer}>
                        <SheetHeader>
                            <SheetTitle>Add Customer</SheetTitle>
                            <SheetDescription>
                                Create a new customer profile. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Sarah Chen"
                                    value={newCustomer.name}
                                    onChange={e => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="sarah@example.com"
                                    value={newCustomer.email}
                                    onChange={e => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit" className="w-full font-bold">Save Customer</Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search customers..."
                            className="pl-8 bg-white/50 dark:bg-black/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm" className="h-9">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Sort
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border bg-white/50 dark:bg-black/50 backdrop-blur-sm overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="w-[300px]">Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Spent</TableHead>
                                <TableHead>Last Activity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No customers match your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id} className="group transition-colors hover:bg-muted/20">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                                                    <AvatarImage src={customer.avatar} alt={customer.name} />
                                                    <AvatarFallback>{customer.initials}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{customer.name}</span>
                                                    <span className="text-xs text-muted-foreground">{customer.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    customer.status === "Active" ? "default" :
                                                        customer.status === "Inactive" ? "outline" :
                                                            "destructive"
                                                }
                                                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                                            >
                                                {customer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium text-sm">{customer.orders}</TableCell>
                                        <TableCell className="font-medium text-sm">{customer.spent}</TableCell>
                                        <TableCell className="text-muted-foreground text-[11px] whitespace-nowrap">{customer.lastSeen}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44">
                                                    <DropdownMenuLabel className="text-xs">Quick Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleAction(customer.name, "Viewing Profile")}>
                                                        View details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleAction(customer.name, "Viewing Orders")}>
                                                        View orders
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                                        onClick={() => handleDelete(customer.id, customer.name)}
                                                    >
                                                        Delete customer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
