/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import {checkUserLogged} from "@/src/data/actions/auth-actions"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import DashboardHeaderComponent from "./_components/DashboardHeader"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const [isUser, setIsUser] = useState<any>()
    const router = useRouter()
    const [currentRouteName, setCurrentRouteName] = useState("Dashboard")

    async function handleUser() {
        const user = await checkUserLogged()
        if (!user.data) {
            router.push("/signin")
        }
        setIsUser(user.data)
    }

    function getRouteName(): string {
        const name: {[key: string]: string} = {
            "/layout/transactions/expense": "Expenses",
            "/layout/transactions/profit": "Profits",
            "/layout/dashboard": "Dashboard",
            "/layout/wallet": "Wallet",
        }
        return name[pathname ?? "/dashboard"] ?? "Dashboard"
    }

    useEffect(() => {
        handleUser()
        const newRouteName = getRouteName()
        setCurrentRouteName("")
        let index = 0
        const interval = setInterval(() => {
            setCurrentRouteName(newRouteName.slice(0, index + 1))
            index++
            if (index === newRouteName.length) clearInterval(interval)
        }, 35)
        return () => clearInterval(interval)
    }, [pathname])

    return (
        <div className="overflow-hidden">
            {/* Mobile */}
            <div className="flex flex-col h-dvh bg-gray-900 justify-between overflow-hidden md:hidden">
                <DashboardHeaderComponent routeName={currentRouteName} username={isUser?.username} />
                {children}
                <Navbar />
            </div>

            {/* Desktop */}
            <div className="flex  bg-white overflow-hidden h-dvh max-sm:hidden">
                <Navbar />
                <div className="w-dvw h-dvh overflow-hidden">
                    <DashboardHeaderComponent routeName={currentRouteName} username={isUser?.username} />
                    {children}
                </div>
            </div>
        </div>
    )
}
