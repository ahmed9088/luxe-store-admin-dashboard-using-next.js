"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Activity, DollarSign, TrendingUp } from "lucide-react"

interface Sale {
    id: string
    customer: string
    amount: string
    item: string
    time: string
    type: "sale" | "refund" | "subscription"
}

export function LiveSalesFeed() {
    const [sales, setSales] = React.useState<Sale[]>([
        { id: "1", customer: "Sarah Chen", amount: "+$49.00", item: "Premium Hoodie", time: "Just now", type: "sale" },
        { id: "2", customer: "Jackson Lee", amount: "+$12.00", item: "Sticker Pack", time: "2m ago", type: "sale" },
        { id: "3", customer: "Alex Rivers", amount: "-$89.00", item: "Desk Lamp", time: "5m ago", type: "refund" },
        { id: "4", customer: "Mina Koda", amount: "+$199.00", item: "Luxe Watch", time: "12m ago", type: "subscription" },
    ])

    // Simulate real-time updates
    React.useEffect(() => {
        const names = ["James W.", "Elena R.", "William K.", "Sofia D.", "Tom H."]
        const items = ["Backpack", "Cap", "Poster", "Notebook", "Keyring"]

        const interval = setInterval(() => {
            const newSale: Sale = {
                id: Math.random().toString(36).substr(2, 9),
                customer: names[Math.floor(Math.random() * names.length)],
                amount: `+$${(Math.random() * 50 + 10).toFixed(2)}`,
                item: items[Math.floor(Math.random() * items.length)],
                time: "Just now",
                type: "sale"
            }

            setSales(prev => [newSale, ...prev.slice(0, 9)])
        }, 15000) // New sale every 15 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary animate-pulse" />
                    <h3 className="text-sm font-semibold">Live Activity</h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span>+12% vs last hour</span>
                </div>
            </div>
            <div className="space-y-3">
                {sales.map((sale) => (
                    <div
                        key={sale.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-white/40 dark:bg-black/40 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-sm animate-in-fade"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                                sale.type === "sale" ? "bg-emerald-500/10 text-emerald-600" :
                                    sale.type === "refund" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                            )}>
                                {sale.type === "sale" ? <DollarSign className="h-4 w-4" /> : sale.customer[0]}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold">{sale.customer}</span>
                                <span className="text-[10px] text-muted-foreground">{sale.item}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={cn(
                                "text-xs font-bold",
                                sale.type === "sale" ? "text-emerald-600" :
                                    sale.type === "refund" ? "text-destructive" : "text-primary"
                            )}>
                                {sale.amount}
                            </span>
                            <span className="text-[9px] text-muted-foreground">{sale.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
