"use client"

import { TrendingUp, Users, DollarSign, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Jan", revenue: 4500, sales: 2400 },
    { month: "Feb", revenue: 5200, sales: 1398 },
    { month: "Mar", revenue: 4800, sales: 9800 },
    { month: "Apr", revenue: 6100, sales: 3908 },
    { month: "May", revenue: 5900, sales: 4800 },
    { month: "Jun", revenue: 7200, sales: 3800 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
    sales: {
        label: "Sales",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function DashboardCharts() {
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Revenue Growth</CardTitle>
                    <CardDescription>Monthly revenue analysis for 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                fontSize={12}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                                fontSize={12}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-revenue)"
                                fill="url(#fillRevenue)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Up 12.5% this month <TrendingUp className="h-4 w-4" />
                    </div>
                </CardFooter>
            </Card>

            <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Sales Distribution</CardTitle>
                    <CardDescription>Comparison of revenue vs sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                fontSize={12}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Consistent performance across regions <Activity className="h-4 w-4" />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
