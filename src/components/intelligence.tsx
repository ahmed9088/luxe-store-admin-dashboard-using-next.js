"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const insights = [
    {
        id: 1,
        title: "Growth Opportunity",
        description: "Apparel sales are up 22% in the North American region. Consider increasing 'Midnight Silk Dress' inventory.",
        type: "positive",
        icon: TrendingUp,
        impact: "High"
    },
    {
        id: 2,
        title: "Stock Velocity Alert",
        description: "Velocity for 'Luxe Gold Watch' has increased by 40%. Critical stock levels expected in 4 days.",
        type: "warning",
        icon: Zap,
        impact: "Medium"
    },
    {
        id: 3,
        title: "Market Anomaly",
        description: "Unusual traffic spike from direct referrals detected. Marketing campaign ROI currently at 8.4x.",
        type: "info",
        icon: Sparkles,
        impact: "High"
    }
]

export function AIIntelligence() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <AnimatePresence>
                {insights.map((insight, idx) => (
                    <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="relative group lg:block"
                    >
                        <Card className="glass border-white/10 overflow-hidden h-full">
                            <div className={`absolute top-0 left-0 w-1 h-full ${insight.type === "positive" ? "bg-emerald-500" :
                                    insight.type === "warning" ? "bg-amber-500" : "bg-primary"
                                }`} />
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-bold flex items-center">
                                    <insight.icon className={`mr-2 h-4 w-4 ${insight.type === "positive" ? "text-emerald-500" :
                                            insight.type === "warning" ? "text-amber-500" : "text-primary"
                                        }`} />
                                    {insight.title}
                                </CardTitle>
                                <Badge variant="outline" className="text-[10px] font-mono opacity-60">
                                    {insight.impact} Impact
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {insight.description}
                                </p>
                            </CardContent>
                            <div className="absolute bottom-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                <insight.icon className="h-12 w-12" />
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export function LiveSalesTicker() {
    const [sales, setSales] = React.useState([
        { id: 1, items: "2x Gold Watches", value: "$1,890", time: "Just now", city: "London" },
        { id: 2, items: "Silk Scarf", value: "$240", time: "2m ago", city: "Paris" },
        { id: 3, items: "Velvet Gown", value: "$4,100", time: "5m ago", city: "NYC" },
    ])

    React.useEffect(() => {
        const cities = ["Tokyo", "Milan", "Dubai", "Seoul", "Berlin"]
        const items = ["Diamond Ring", "Leather Bag", "Suede Boots", "Pearl Necklace"]

        const interval = setInterval(() => {
            const newSale = {
                id: Date.now(),
                items: items[Math.floor(Math.random() * items.length)],
                value: "$" + (Math.floor(Math.random() * 5000) + 500).toLocaleString(),
                time: "Just now",
                city: cities[Math.floor(Math.random() * cities.length)]
            }
            setSales(prev => [newSale, ...prev.slice(0, 4)])
        }, 8000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="glass border-white/10 h-[400px] overflow-hidden flex flex-col">
            <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                    Live Transaction Stream
                    <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
                <div className="p-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {sales.map((sale) => (
                            <motion.div
                                key={sale.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 group hover:bg-white/[0.08] transition-colors"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-gradient">{sale.items}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{sale.city}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-mono font-bold">{sale.value}</div>
                                    <div className="text-[10px] text-muted-foreground">{sale.time}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
            <div className="p-3 bg-muted/30 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">System connected • Encrypted Node @ 0x4f</p>
            </div>
        </Card>
    )
}
