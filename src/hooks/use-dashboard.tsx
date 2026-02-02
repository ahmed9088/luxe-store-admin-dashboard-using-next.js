"use client"

import * as React from "react"

interface User {
    name: string
    email: string
    avatar: string
}

interface Notification {
    id: string
    title: string
    description: string
    time: string
    unread: boolean
}

interface DashboardContextType {
    user: User
    setUser: (user: User) => void
    notifications: Notification[]
    unreadCount: number
    markAsRead: (id: string) => void
    addNotification: (n: Omit<Notification, "id" | "unread">) => void
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User>({
        name: "Ahmed Saffar",
        email: "ahmed@example.com",
        avatar: "/avatars/ahmed.jpg",
    })

    const [notifications, setNotifications] = React.useState<Notification[]>([
        { id: "1", title: "New Sale", description: "You just made a $49.00 sale!", time: "5m ago", unread: true },
        { id: "2", title: "System Update", description: "v2.0 is now live.", time: "2h ago", unread: true },
        { id: "3", title: "Security Alert", description: "New login from Tokyo.", time: "1d ago", unread: false },
    ])

    const unreadCount = notifications.filter(n => n.unread).length

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n))
    }

    const addNotification = (n: Omit<Notification, "id" | "unread">) => {
        const newN = { ...n, id: Math.random().toString(36).substr(2, 9), unread: true }
        setNotifications(prev => [newN, ...prev])
    }

    return (
        <DashboardContext.Provider value={{ user, setUser, notifications, unreadCount, markAsRead, addNotification }}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    const context = React.useContext(DashboardContext)
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider")
    }
    return context
}
