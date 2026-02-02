"use client"

import { Button } from "@/components/ui/button"
import { Layers, Plus } from "lucide-react"

export default function CategoriesPage() {
    return (
        <div className="flex flex-col gap-6 animate-in-fade">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">Organize your products into logical groups.</p>
                </div>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Apparel', 'Electronics', 'Accessories', 'Home', 'Office'].map(cat => (
                    <div key={cat} className="p-6 rounded-xl border bg-white/50 dark:bg-black/50 group hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{cat}</h3>
                            <Layers className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-xs text-muted-foreground">12 Products</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
