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
} from "lucide-react"

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Subscriptions"
          value="+2350"
          description="+180.1% from last month"
          icon={<Users className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Sales"
          value="+12,234"
          description="+19% from last month"
          icon={<CreditCard className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Active Now"
          value="+573"
          description="+201 since last hour"
          icon={<Activity className="h-4 w-4" />}
          trend="down"
        />
      </div>

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
                  <CardTitle className="text-base font-semibold">Goal Progress</CardTitle>
                  <CardDescription>Target vs Actual</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pt-2">
                  <div className="relative h-32 w-32 mb-4">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="text-muted stroke-current" strokeWidth="8" fill="transparent" cx="50" cy="50" r="40" />
                      <circle className="text-primary stroke-current" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="75.36" strokeLinecap="round" fill="transparent" cx="50" cy="50" r="40" transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">70%</span>
                    </div>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Actual Revenue</span>
                      <span className="font-bold">$70,000</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Monthly Goal</span>
                      <span className="font-bold">$100,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>Monthly active users vs new signups</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed mt-4">
                <div className="text-muted-foreground flex flex-col items-center gap-2">
                  <Activity className="h-8 w-8 opacity-20" />
                  <span>Interactive Growth Chart</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3 shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Sales by region</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed mt-4">
                <div className="text-muted-foreground flex flex-col items-center gap-2">
                  <Users className="h-8 w-8 opacity-20" />
                  <span>Regional Sales Heatmap</span>
                </div>
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

function StatsCard({ title, value, description, icon, trend }: { title: string, value: string, description: string, icon: React.ReactNode, trend: 'up' | 'down' }) {
  return (
    <Card className="shadow-none border-none bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
