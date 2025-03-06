"use client"

import DropdownMenuButton from "@/src/components/custom/Dropdown"
import Image from "next/image"
import Link from "next/link"
import {HamburgerMenuIcon, MoonIcon, SunIcon, ReloadIcon} from "@radix-ui/react-icons"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {saveItem} from "@/src/lib/utils"

function getRouteName(pathname: string): string {
    const name: {[key: string]: string} = {
        "/layout/transactions/expense": "Expenses",
        "/layout/transactions/profit": "Profits",
        "/layout/dashboard": "Dashboard",
        "/layout/wallet": "Wallet",
    }
    return name[pathname ?? "/layout/dashboard"] ?? "Dashboard"
}

const ChangeThemeButton = () => {
    const {setIsTheme, isTheme} = useGlobalContext()
    return (
        <div
            onClick={() => {
                if (isTheme === "dark") {
                    saveItem("theme", "light")
                    setIsTheme("light")
                } else {
                    saveItem("theme", "dark")
                    setIsTheme("dark")
                }
            }}
            className="cursor-pointer"
        >
            {isTheme === "dark" ? <SunIcon color={`#fff`} /> : <MoonIcon color={`#1e2939a0`} />}
        </div>
    )
}

export default function DashboardHeaderComponent() {
    const [currentRouteName, setCurrentRouteName] = useState<string>("Dashboard")
    const pathname = usePathname()
    function haldeRouteChange(pathname: string) {
        let newRouteName = getRouteName(pathname)
        setCurrentRouteName("")
        let index = 0
        const interval = setInterval(() => {
            setCurrentRouteName(newRouteName.slice(0, index + 1))
            index++
            if (index === newRouteName.length) clearInterval(interval)
        }, 35)
        return clearInterval(interval)
    }
    useEffect(() => {
        return () => haldeRouteChange(pathname)
    }, [pathname])

    return (
        <div className="z-40 w-full h-[7%] md:h-[10%] md:w-full bg-white dark:bg-gray-950  shadow-xs md:shadow-none md:border-b-[1px]  flex justify-between items-center p-4 relative md:justify-end border-b-[1px] dark:border-gray-900 dark:border ">
            <Link
                href={"/"}
                className="active:scale-[0.9] transition-all text-gray-950 dark:text-gray-200 text-sm flex items-center justify-center md:hidden gap-2"
            >
                <Image width={100} height={100} className="bg-white p-[4px] rounded w-8 h-8" src="/Logo.png" alt="logo Icon" />
                <span>FFizTrack</span>
            </Link>
            <h1
                className={`text-gray-950 dark:text-gray-200 text-base drop-shadow-md transition-all  duration-500  absolute left-2/4 translate-x-[-50%] md:text-3xl`}
            >
                {currentRouteName}
            </h1>
            <div className="flex gap-4 items-center">
                <ChangeThemeButton />
                <DropdownMenuButton>
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                        <HamburgerMenuIcon className="bg-white p-[8px] rounded w-8 h-8" />
                    </div>
                </DropdownMenuButton>
            </div>
        </div>
    )
}
