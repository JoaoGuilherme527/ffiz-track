/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import {checkUserLogged, getExpenses} from "@/src/data/actions/auth-actions"
import {ExpenseItem} from "@/src/types/types"
import Image from "next/image"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {ReactNode, useEffect, useState} from "react"
import {useGlobalContext} from "../providers/GlobalProvider"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const {fetchExpenses} = useGlobalContext()
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
            "/dashboard/earnings": "Earnings",
            "/dashboard": "Dashboard",
        }
        return name[pathname ?? "/dashboard"] ?? "Dashboard"
    }

    useEffect(() => {
        handleUser()
        fetchExpenses()
    }, [pathname])

    useEffect(() => {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden">
            <div className="z-40 absolute top-0 w-full h-[7%] bg-[var(--dark-green)] shadow-md flex justify-between items-center p-4">
                <Link href={"/"} className="active:scale-[0.9] transition-all">
                    <Image width={40} height={40} className=" bg-white p-[1px] rounded " src="/favicon.svg" alt="logo Icon" />
                </Link>
                <h1 className={`text-white text-base drop-shadow-md transition-all  duration-500  absolute left-2/4 translate-x-[-50%]`}>
                    {currentRouteName}
                </h1>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-white text-sm">{isUser?.username ?? ""}</p>
                    <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
            </div>
            <div className="w-full h-[30%] absolute top-0 left-0 bg-red-500 z-10">
                <div className="relative w-full h-full bg-[var(--green)]"></div>
                <div className="container ">
                    <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                        <path
                            d={`M0,100 C150,${pathname.includes("expenses") ? "160" : "60"} 300,${
                                pathname.includes("expenses") ? "60" : "160"
                            } 500,100 L500,00 L0,0 Z`}
                            className="transition-all duration-500"
                            style={{stroke: "none", fill: "var(--green)"}}
                        ></path>
                    </svg>
                </div>
            </div>
            {children}
            <Navbar />
        </div>
    )
}
