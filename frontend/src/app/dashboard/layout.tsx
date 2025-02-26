/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {checkUserLogged} from "@/src/data/actions/auth-actions"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useGlobalContext} from "../providers/GlobalProvider"
import HeaderDashboardComponent from "./_components/HeaderDashboard"
import Navbar from "@/src/components/custom/Navbar"

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
        <div className="flex flex-col h-dvh bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden ">
            <HeaderDashboardComponent routeName={currentRouteName} username={isUser?.username} />
            <div className="w-full h-[30%] absolute top-0 left-0 bg-red-500 z-10">
                <div className="relative w-full h-full bg-[var(--dark-green)]"></div>
                <div className="container ">
                    <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                        <path
                            d={`M0,100 C150,${pathname.includes("expenses") ? "160" : "60"} 300,${
                                pathname.includes("expenses") ? "60" : "160"
                            } 500,100 L500,00 L0,0 Z`}
                            className="transition-all duration-500"
                            style={{stroke: "none", fill: "var(--dark-green)"}}
                        ></path>
                    </svg>
                </div>
            </div>
            {children}
            <Navbar />
        </div>
    )
}
