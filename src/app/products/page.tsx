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
    MoreHorizontal,
    Search,
    Plus,
    Package,
    ArrowUpDown,
    Filter,
    PackageCheck,
    PackageX,
    AlertTriangle
} from "lucide-react"
import { toast } from "sonner"

const products = [
    { id: "1", name: "Premium Hoodie", sku: "PH-001", category: "Apparel", price: "$59.00", stock: 124, status: "In Stock" },
    { id: "2", name: "Modern Desk Lamp", sku: "ML-042", category: "Home", price: "$89.00", stock: 12, status: "Low Stock" },
    { id: "3", name: "Ergonomic Mouse", sku: "EM-992", category: "Electronics", price: "$129.00", stock: 0, status: "Out of Stock" },
    { id: "4", name: "Minimalist Watch", sku: "MW-101", category: "Accessories", price: "$199.00", stock: 56, status: "In Stock" },
    { id: "5", name: "Canvas Backpack", sku: "CB-202", category: "Accessories", price: "$79.00", stock: 5, status: "Low Stock" },
]

export default function ProductsPage() {
    const [productList, setProductList] = React.useState(products)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredProducts = productList.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "In Stock": return <PackageCheck className="h-3.5 w-3.5 text-emerald-500" />
            case "Low Stock": return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            case "Out of Stock": return <PackageX className="h-3.5 w-3.5 text-destructive" />
            default: return null
        }
    }

    return (
        <div className="flex flex-col gap-6 animate-in-fade">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                    <p className="text-muted-foreground">Manage your product catalog and stock levels.</p>
                </div>
                <Button size="sm" onClick={() => toast.success("Opening product editor...")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products by name or SKU..."
                            className="pl-8 bg-white/50 dark:bg-black/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border bg-white/50 dark:bg-black/50 backdrop-blur-sm overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((p) => (
                                <TableRow key={p.id} className="group hover:bg-muted/20">
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground uppercase">{p.sku}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">{p.stock}</TableCell>
                                    <TableCell className="text-sm">{p.price}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            {getStatusIcon(p.status)}
                                            <span className="text-[11px] font-medium">{p.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => toast.info(`Editing ${p.name}`)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toast.info(`Duplicate ${p.name}`)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
