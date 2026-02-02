import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxe Admin Dashboard",
  description: "Advanced enterprise management dashboard",
};

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { SearchCommand } from "@/components/search-command"
import { NotificationCenter, UserProfileMenu } from "@/components/header-actions"
import * as React from "react"
import { Toaster } from "@/components/ui/sonner"
import { DashboardProvider } from "@/hooks/use-dashboard"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md bg-white/70 dark:bg-black/70 sticky top-0 z-10 transition-colors">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">
                          Dashboard
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Overview</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex items-center gap-4">
                  <SearchCommand />
                  <NotificationCenter />
                  <UserProfileMenu />
                </div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-6 bg-zinc-50/50 dark:bg-zinc-950/50 min-h-[calc(100vh-4rem)]">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster position="top-right" richColors />
        </DashboardProvider>
      </body>
    </html>
  );
}
