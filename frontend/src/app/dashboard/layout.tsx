/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import {checkUserLogged} from "@/src/data/actions/auth-actions"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useLayoutEffect, useState} from "react"
import {useGlobalContext} from "../providers/GlobalProvider"
import HeaderDashboardComponent from "./components/HeaderDashboard"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const {fetchTransactions, isMobile, setIsMobile,transactionItems} = useGlobalContext()
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
            "/dashboard/transactions/expense": "Expenses",
            "/dashboard/transactions/profit": "Profits",
            "/dashboard": "Dashboard",
        }
        return name[pathname ?? "/dashboard"] ?? "Dashboard"
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768)
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
            <div className="flex flex-col h-dvh bg-white overflow-hidden md:hidden">
                <HeaderDashboardComponent routeName={currentRouteName} username={isUser?.username} />
                {/* <div className="w-full h-[30%] absolute top-0 left-0  z-10">
                    <div className="relative w-full h-full bg-[var(--dark-green)]"></div>
                    <div className="">
                        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                            <path
                                d={`M0,100 C300,${pathname.includes("/dashboard/transactions/expense") ? "160" : "60"} 500,${
                                    pathname.includes("/dashboard/transactions/expense") ? "60" : "160"
                                } 500,100 L500,00 L0,0 Z`}
                                className="transition-all duration-500"
                                style={{stroke: "none", fill: "var(--dark-green)"}}
                            ></path>
                        </svg>
                    </div>
                </div> */}
                {children}
                <Navbar />
            </div>

            {/* Desktop */}
            <div className="flex  bg-white overflow-hidden h-dvh max-sm:hidden">
                <Navbar />
                <div className="w-dvw h-dvh overflow-hidden">
                    <HeaderDashboardComponent routeName={currentRouteName} username={isUser?.username} />
                    {children}
                </div>
            </div>
        </div>
    )
}
