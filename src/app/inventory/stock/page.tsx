"use client"

import { Button } from "@/components/ui/button"
import { Box, RefreshCw } from "lucide-react"

export default function StockPage() {
    return (
        <div className="flex flex-col gap-6 animate-in-fade">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
                    <p className="text-muted-foreground">Monitor and restock your inventory items.</p>
                </div>
                <Button size="sm" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Update Inventory
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-xl bg-white/50 dark:bg-black/50">
                <Box className="h-12 w-12 text-muted-foreground/20 mb-4" />
                <h2 className="text-xl font-semibold">Stock Shield Active</h2>
                <p className="text-muted-foreground text-sm">All products are currently monitored for low levels.</p>
            </div>
        </div>
    )
}
