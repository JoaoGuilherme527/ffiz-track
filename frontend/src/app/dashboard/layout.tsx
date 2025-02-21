/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import {checkUserLogged} from "@/src/data/actions/auth-actions"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useGlobalContext} from "../providers/GlobalProvider"
import HeaderDashboardComponent from "./components/HeaderDashboard"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const {fetchTransactions} = useGlobalContext()
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
            "/dashboard/expenses": "Expenses",
            "/dashboard/profits": "Profits",
            "/dashboard": "Dashboard",
        }
        return name[pathname ?? "/dashboard"] ?? "Dashboard"
    }

    useEffect(() => {
        handleUser()
        fetchTransactions()
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
        <div>
            <div className="flex flex-col h-dvh bg-[var(--light-green)] overflow-hidden md:hidden">
                <HeaderDashboardComponent routeName={currentRouteName} username={isUser?.username} />
                <div className="w-full h-[30%] absolute top-0 left-0 bg-red-500 z-10">
                    <div className="relative w-full h-full bg-[var(--dark-green)]"></div>
                    <div className="">
                        <svg viewBox="0 0 700 700" preserveAspectRatio="xMinYMin meet">
                            <path
                                d={`M0,100 C300,${pathname.includes("expenses") ? "160" : "60"} 500,${
                                    pathname.includes("expenses") ? "60" : "160"
                                } 800,100 L800,00 L0,0 Z`}
                                className="transition-all duration-500"
                                style={{stroke: "none", fill: "var(--dark-green)"}}
                            ></path>
                        </svg>
                    </div>
                </div>
                {children}
                <Navbar />
            </div>
            <div className="flex bg-[var(--light-green)] overflow-hidden h-dvh">
                <Navbar />
                <div className="w-dvw h-dvh">
                    <HeaderDashboardComponent routeName={currentRouteName} username={isUser?.username} />
                    {children}
                </div>
            </div>
        </div>
    )
}
