"use client"

import { DashboardCharts } from "@/components/dashboard-charts"
import { LiveSalesFeed } from "@/components/live-sales-feed"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSearchParams, useRouter } from "next/navigation"
import * as React from "react"
import { Suspense } from "react"
import {
  CalendarIcon,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  PieChart as PieChartIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentTab = searchParams.get("tab") || "overview"

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 md:h-auto md:w-auto md:px-3">
            <Download className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Download</span>
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
          index={0}
        />
        <StatsCard
          title="Subscriptions"
          value="+2350"
          description="+180.1% from last month"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          index={1}
        />
        <StatsCard
          title="Sales"
          value="+12,234"
          description="+19% from last month"
          icon={<CreditCard className="h-4 w-4" />}
          trend="up"
          index={2}
        />
        <StatsCard
          title="Active Now"
          value="+573"
          description="+201 since last hour"
          icon={<Activity className="h-4 w-4" />}
          trend="down"
          index={3}
        />
      </motion.div>

      <Tabs
        value={currentTab}
        onValueChange={(val) => router.push(`/?tab=${val}`)}
        className="space-y-4"
      >
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4 outline-none">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 glass border-white/20 dark:border-white/10 shadow-xl overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div>
                  <CardTitle className="text-xl font-bold">Revenue Insight</CardTitle>
                  <CardDescription>Real-time analytics across all channels</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2 py-1">
                    <Activity className="mr-1 h-3 w-3 animate-pulse" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="h-[450px]">
                <DashboardCharts />
              </CardContent>
            </Card>

            <div className="lg:col-span-3 space-y-4">
              <Card className="glass border-white/20 dark:border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Live Activity</CardTitle>
                  <CardDescription>Real-time telemetry stream</CardDescription>
                </CardHeader>
                <CardContent>
                  <LiveSalesFeed />
                </CardContent>
              </Card>

              <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Category Sales</CardTitle>
                  <CardDescription>Distribution by department</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] pb-4">
                  <CategoryDistribution />
                </CardContent>
              </Card>

              <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Goal Progress</CardTitle>
                  <CardDescription>Target vs Actual</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pt-2">
                  <div className="relative h-28 w-28 mb-4">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="text-muted stroke-current" strokeWidth="8" fill="transparent" cx="50" cy="50" r="40" />
                      <motion.circle
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 75.36 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-primary stroke-current"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeLinecap="round"
                        fill="transparent"
                        cx="50"
                        cy="50"
                        r="40"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">70%</span>
                    </div>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Actual Revenue</span>
                      <span className="font-bold">$70k</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Monthly Goal</span>
                      <span className="font-bold">$100k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4 pt-4 outline-none">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 glass border-white/20 dark:border-white/10 shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold">User Growth</CardTitle>
                <CardDescription>New signups vs active users (L6M)</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <UserGrowthChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 glass border-white/20 dark:border-white/10 shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Regional Sales</CardTitle>
                <CardDescription>Top performing territories</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <RegionalHeatmap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard title="Q4 Financial Summary" date="Jan 15, 2026" type="Financial" />
            <ReportCard title="Inventory Audit" date="Jan 12, 2026" type="Operations" />
            <ReportCard title="Marketing ROI Analysis" date="Jan 05, 2026" type="Marketing" />
            <ReportCard title="Customer Satisfaction" date="Dec 28, 2025" type="Support" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({ title, value, description, icon, trend, index }: { title: string, value: string, description: string, icon: React.ReactNode, trend: 'up' | 'down', index: number }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm h-full overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          {React.cloneElement(icon as any, { className: "h-24 w-24 -mr-8 -mt-8" })}
        </div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-1 mt-1">
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-rose-500" />
            )}
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CategoryDistribution() {
  const data = [
    { name: "Apparel", value: 400 },
    { name: "Electronics", value: 300 },
    { name: "Home", value: 300 },
    { name: "Others", value: 200 },
  ]

  const COLORS = ["oklch(0.646 0.222 41.116)", "oklch(0.6 0.118 184.704)", "oklch(0.398 0.07 227.392)", "oklch(0.828 0.189 84.429)"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <RechartsTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background/80 backdrop-blur-md border border-border p-2 rounded-lg shadow-xl text-[10px]">
                  <p className="font-bold">{payload[0].name}</p>
                  <p className="text-muted-foreground">{payload[0].value} Sales</p>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

function ReportCard({ title, date, type }: { title: string, date: string, type: string }) {
  return (
    <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/80 transition-colors cursor-pointer group">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </div>
        <Badge variant="outline" className="text-[10px]">{type}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-xs text-muted-foreground">
          <Download className="mr-2 h-3 w-3" />
          Download PDF (2.4MB)
        </div>
      </CardContent>
    </Card>
  )
}

function UserGrowthChart() {
  const data = [
    { month: "Jan", users: 1200, signups: 400 },
    { month: "Feb", users: 2100, signups: 700 },
    { month: "Mar", users: 1800, signups: 500 },
    { month: "Apr", users: 2400, signups: 900 },
    { month: "May", users: 2800, signups: 1100 },
    { month: "Jun", users: 3200, signups: 1300 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.646 0.222 41.116)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.646 0.222 41.116)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.6 0.118 184.704)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.6 0.118 184.704)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <RechartsTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background/80 backdrop-blur-md border border-border p-3 rounded-xl shadow-2xl text-xs space-y-1">
                  <p className="font-bold border-b pb-1 mb-1">{payload[0].payload.month}</p>
                  <p className="text-emerald-500 flex justify-between gap-4">Active Users: <span className="font-mono">{payload[0].value}</span></p>
                  <p className="text-primary flex justify-between gap-4">New Signups: <span className="font-mono">{payload[1].value}</span></p>
                </div>
              )
            }
            return null
          }}
        />
        <Area type="monotone" dataKey="users" stroke="oklch(0.646 0.222 41.116)" fill="url(#userGrad)" strokeWidth={2} />
        <Area type="monotone" dataKey="signups" stroke="oklch(0.6 0.118 184.704)" fill="url(#signupGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function RegionalHeatmap() {
  const data = [
    { region: "North Am.", sales: 4500 },
    { region: "Europe", sales: 3200 },
    { region: "Asia", sales: 2800 },
    { region: "Others", sales: 1200 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid horizontal={false} strokeDasharray="3 3" opacity={0.1} />
        <XAxis type="number" hide />
        <YAxis dataKey="region" type="category" tickLine={false} axisLine={false} fontSize={12} width={80} />
        <RechartsTooltip
          cursor={{ fill: 'transparent' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background/80 backdrop-blur-md border border-border p-2 rounded-lg shadow-xl text-xs">
                  <p className="font-bold">{payload[0].value} Sales</p>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="sales" fill="oklch(0.205 0 0)" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`oklch(0.205 0 0 / ${1 - index * 0.2})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
