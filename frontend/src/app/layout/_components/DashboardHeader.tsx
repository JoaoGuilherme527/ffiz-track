"use client"

import DropdownMenuButton from "@/src/components/custom/Dropdown"
import Image from "next/image"
import Link from "next/link"
import {HamburgerMenuIcon, MoonIcon, SunIcon, ReloadIcon} from "@radix-ui/react-icons"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useLayoutEffect, useState} from "react"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {saveItem} from "@/src/lib/utils"
import {Switch} from "radix-ui"

function getRouteName(pathname: string): string {
    const name: {[key: string]: string} = {
        "/layout/transactions/expense": "Expenses",
        "/layout/transactions/profit": "Profits",
        "/layout/dashboard": "Dashboard",
        "/layout/wallet": "Wallet",
    }
    return name[pathname ?? "/layout/dashboard"] ?? "Dashboard"
}

const themeObj: {[key: string]: {mode: "dark" | "light"; color: string}} = {
    dark: {mode: "light", color: "#fff"},
    light: {mode: "dark", color: "#1e2939"},
}

interface ChangeThemeButtonProps {
    setIsTheme: (param: "dark" | "light") => void
    theme: "dark" | "light"
}

const ChangeThemeButton = ({setIsTheme, theme}: ChangeThemeButtonProps) => {
    return (
        <div
            onClick={() => {
                saveItem("theme", themeObj[theme].mode)
                setIsTheme(themeObj[theme].mode)
            }}
            className="cursor-pointer flex items-center"
        >
            <Switch.Root checked={theme === "dark"} className="SwitchRoot" style={{boxShadow: "none"}} id="airplane-mode">
                {theme === "dark" ? (
                    <SunIcon color={themeObj[theme].color} height={12} className="absolute top-[6px] left-[5px]" />
                ) : (
                    <MoonIcon color={themeObj[theme].color} height={12} className="absolute top-[8px] right-[5px]" />
                )}
                <Switch.Thumb
                    className="SwitchThumb"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: theme == "dark" ? "var(--color-gray-700)" : "white",
                    }}
                >
                    {theme === "dark" ? (
                        <MoonIcon color={themeObj[theme].color} height={12} />
                    ) : (
                        <SunIcon color={themeObj[theme].color} height={12} />
                    )}
                </Switch.Thumb>
            </Switch.Root>
        </div>
    )
}

export default function DashboardHeaderComponent() {
    const [currentRouteName, setCurrentRouteName] = useState<string>("Dashboard")
    const pathname = usePathname()
    const {setIsTheme, isTheme} = useGlobalContext()
    const [theme, setTheme] = useState<"dark" | "light">("dark")

    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const newTheme = localStorage.getItem("theme") as "dark" | "light"
            setTheme(newTheme ? newTheme : "dark")
        }
    }, [isTheme])

    useEffect(() => {
        let newRouteName = getRouteName(pathname)
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
                <ChangeThemeButton setIsTheme={setIsTheme} theme={theme} />
                <DropdownMenuButton>
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                        <HamburgerMenuIcon color={themeObj[theme].color} className="p-[8px] rounded w-8 h-8" />
                    </div>
                </DropdownMenuButton>
            </div>
        </div>
    )
}
