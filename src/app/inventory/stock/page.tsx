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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Search,
    RefreshCw,
    AlertTriangle,
    ArrowUpDown,
    CheckCircle2,
    Package,
    Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const stockData = [
    { id: "STK001", name: "Midnight Silk Dress", category: "Apparel", stock: 12, threshold: 20, status: "Low Stock" },
    { id: "STK002", name: "Luxe Gold Watch", category: "Accessories", stock: 85, threshold: 15, status: "In Stock" },
    { id: "STK003", name: "Velvet Evening Gown", category: "Apparel", stock: 5, threshold: 10, status: "Critical" },
    { id: "STK004", name: "Diamond Stud Earrings", category: "Jewelry", stock: 24, threshold: 10, status: "In Stock" },
    { id: "STK005", name: "Suede Ankle Boots", category: "Footwear", stock: 45, threshold: 15, status: "In Stock" },
    { id: "STK006", name: "Cashmere Scarf", category: "Accessories", stock: 8, threshold: 12, status: "Low Stock" },
]

export default function StockPage() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [items, setItems] = React.useState(stockData)

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleRestock = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, stock: item.stock + 50, status: "In Stock" } : item
        ))
    }

    return (
        <div className="flex flex-col gap-6 animate-in-fade">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Stock Inventory</h1>
                    <p className="text-muted-foreground">Manage stock levels and threshold alerts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setItems(stockData)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Data
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="glass border-white/20 dark:border-white/10 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{items.filter(i => i.status === "Critical").length}</div>
                        <p className="text-xs text-muted-foreground">Immediate action required</p>
                    </CardContent>
                </Card>
                <Card className="glass border-white/20 dark:border-white/10 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{items.filter(i => i.status === "Low Stock").length}</div>
                        <p className="text-xs text-muted-foreground">Items below threshold</p>
                    </CardContent>
                </Card>
                <Card className="glass border-white/20 dark:border-white/10 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$124,592</div>
                        <p className="text-xs text-muted-foreground">Estimated inventory value</p>
                    </CardContent>
                </Card>
            </div>

            <div className="glass border-white/20 dark:border-white/10 rounded-xl shadow-xl overflow-hidden p-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 bg-background/50 border-white/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Sort
                        </Button>
                        <Button size="sm" className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30">
                            <Sparkles className="mr-2 h-3 w-3" />
                            Smart Sync
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border border-white/10">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Stock Level</TableHead>
                                <TableHead className="text-center">Restock Score</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={item.id}
                                        className="group hover:bg-muted/50 transition-colors"
                                    >
                                        <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-background/80">{item.category}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                <span className={item.stock <= item.threshold ? "text-rose-500 font-bold" : ""}>
                                                    {item.stock} units
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">Min: {item.threshold}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(100, (item.threshold / (item.stock || 1)) * 100)}%` }}
                                                        className={`h-full ${item.stock <= item.threshold ? "bg-rose-500" : "bg-emerald-500"}`}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.status === "In Stock" && (
                                                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                                    Healthy
                                                </Badge>
                                            )}
                                            {item.status === "Low Stock" && (
                                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
                                                    <AlertTriangle className="mr-1 h-3 w-3" />
                                                    Warning
                                                </Badge>
                                            )}
                                            {item.status === "Critical" && (
                                                <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 animate-pulse">
                                                    <AlertTriangle className="mr-1 h-3 w-3" />
                                                    Critical
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRestock(item.id)}
                                            >
                                                Restock
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
