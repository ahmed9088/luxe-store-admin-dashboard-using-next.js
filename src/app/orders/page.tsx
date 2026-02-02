"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus } from "lucide-react"

export default function OrdersPage() {
    return (
        <div className="flex flex-col gap-6 animate-in-fade">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">Manage and track your customer orders.</p>
                </div>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Order
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-xl bg-white/50 dark:bg-black/50">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/20 mb-4" />
                <h2 className="text-xl font-semibold">No Orders Found</h2>
                <p className="text-muted-foreground text-sm">Start by creating your first sales order.</p>
            </div>
        </div>
    )
}
