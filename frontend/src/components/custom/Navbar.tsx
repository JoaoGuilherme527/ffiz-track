"use client"

import {StaticImport} from "next/dist/shared/lib/get-img-props"
import {Url} from "next/dist/shared/lib/router/router"
import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"

interface LinkRouteButtonProps {
    className?: string | undefined
    src: string | StaticImport
    iconSize?: number
    href: Url
    filled: boolean
}

const LinkRouteButton = ({className, iconSize = 32, src, href, filled}: LinkRouteButtonProps) => (
    <Link className={`active:scale-[0.8] transition-all text-sm invert ${className ?? ""}`} href={href}>
        <Image className="drop-shadow-lg" src={`/${src}${filled ? "-filled.png" : ".png"}`} alt="" width={iconSize} height={iconSize} />
    </Link>
)

const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="z-30 w-full h-14 md:w-64 md:h-full md:flex-col bg-[var(--darkest-green)] flex items-center justify-between px-10 md:p-10">
            <LinkRouteButton href={"/dashboard"} src={"money-bag"} filled={!pathname.includes("dashboard/")} />
            <LinkRouteButton href={"/dashboard/expenses"} src={"expense"} filled={pathname.includes("expenses")} />
            <LinkRouteButton href={"/dashboard/profits"} src={"income"} filled={pathname.includes("profits")} />
        </div>
    )
}

export default Navbar
