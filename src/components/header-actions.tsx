"use client"

import * as React from "react"
import { Bell, User as UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/hooks/use-dashboard"

export function NotificationCenter() {
    const { notifications, unreadCount, markAsRead } = useDashboard()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h4 className="text-sm font-semibold">Notifications</h4>
                    <Badge variant="secondary" className="text-[10px]">{unreadCount} New</Badge>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">No notifications</div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={cn(
                                    "p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors",
                                    n.unread && "bg-muted/20"
                                )}
                                onClick={() => markAsRead(n.id)}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <p className={cn("text-xs font-medium", n.unread && "text-primary")}>{n.title}</p>
                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1">{n.description}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs">View all</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export function UserProfileMenu() {
    const { user, setUser } = useDashboard()
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState(user.name)
    const [email, setEmail] = React.useState(user.email)

    const handleSave = () => {
        setUser({ ...user, name, email })
        setOpen(false)
        import("sonner").then(({ toast }) => {
            toast.success("Profile updated successfully", {
                description: "Your changes have been saved across the dashboard."
            })
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8 border-2 border-primary/10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onSelect={() => setOpen(true)}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onSelect={() => setOpen(true)}>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Profile Settings</DialogTitle>
                    <DialogDescription>
                        Update your account details and preferences here.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
