"use client"

import {StaticImport} from "next/dist/shared/lib/get-img-props"
import {Url} from "next/dist/shared/lib/router/router"
import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"

interface LinkRouteButtonProps {
    className?: string | undefined
    src: string | StaticImport
    src2?: string | StaticImport
    iconSize?: number
    name?: string
    href: Url
    path: boolean
}

const LinkRouteButtonMobile = ({className, iconSize = 32, src, href, path}: LinkRouteButtonProps) => (
    <Link className={`active:scale-[0.8] transition-all text-sm invert ${className ?? ""}`} href={href}>
        <Image
            className="opacity-50 drop-shadow-lg invert"
            src={`/${src}${path ? "-filled.png" : ".png"}`}
            alt=""
            width={iconSize}
            height={iconSize}
        />
    </Link>
)

const LinkRouteButton = ({className, iconSize = 24, src, href, path, name, src2}: LinkRouteButtonProps) => (
    <Link href={href} className={`transition-all w-full flex items-center gap-2 p-2 py-[14px] ${path ? "bg-gray-50" : ""} ${className}`}>
        <Image
            width={iconSize}
            height={iconSize}
            alt=""
            src={path ? (src2 as string) : src}
            className={`transition-all ${path ? "" : "opacity-40"}`}
        />
        <p className={`transition-all text-base font-semibold  ${path ? "text-green-400" : "text-gray-400"}`}>{name}</p>
    </Link>
)

const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="z-30 w-full h-14 md:w-64 md:h-full md:flex-col bg-white md:border-r-[1px] border-t-[1px] border-gray-300 py-4  md:justify-start flex md:items-start md:px-2 md:pt-28 px-10 md:p-10 relative">
            {/* Mobile */}
            <div className="flex items-center justify-between w-full px-10 md:hidden">
                <LinkRouteButtonMobile href={"/layout/dashboard"} src={"money-bag"} path={pathname.includes("/layout/dashboard")} />
                <LinkRouteButtonMobile
                    href={"/layout/transactions/expense"}
                    src={"expense"}
                    path={pathname.includes("/layout/transactions/expense")}
                />
                <LinkRouteButtonMobile
                    href={"/layout/transactions/profit"}
                    src={"income"}
                    path={pathname.includes("/layout/transactions/profit")}
                />
            </div>

            {/* Desktop */}
            <div className="max-sm:hidden w-full">
                <div className="absolute top-4 left-1/2 translate-x-[-50%]">
                    <Link
                        href={"/"}
                        className="active:scale-[0.9] transition-all text-gray-500 text-sm flex flex-col items-center justify-center "
                    >
                        <Image width={40} height={40} className=" bg-white p-[1px] rounded " src="/favicon.svg" alt="logo Icon" />
                        <h1 className="">FFizTrack</h1>
                    </Link>
                </div>

                <LinkRouteButton
                    href={"/layout/dashboard"}
                    path={pathname.includes("/layout/dashboard")}
                    src={"/money-bag.png"}
                    src2={"/money-bag-filled-green.png"}
                    name="Dashboard"
                />
                <LinkRouteButton
                    href={"/layout/transactions/expense"}
                    path={pathname.includes("/transactions/expense")}
                    src={"/expense.png"}
                    src2={"/expense-filled-green.png"}
                    name="Expenses"
                />
                <LinkRouteButton
                    href={"/layout/transactions/profit"}
                    path={pathname.includes("/transactions/profit")}
                    src={"/income.png"}
                    src2={"/income-filled-green.png"}
                    name="Profits"
                />
            </div>
        </div>
    )
}

export default Navbar
