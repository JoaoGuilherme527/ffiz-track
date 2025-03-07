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

const LinkRouteButtonMobile = ({className, iconSize = 32, src, src2, href, path, name}: LinkRouteButtonProps) => {
    return (
        <Link
            href={href}
            className={`active:scale-[0.9]  transition-all  flex flex-col p-2 items-center justify-center ${className ?? ""}`}
        >
            <Image
                className={`drop-shadow-lg dark:invert dark:opacity-100 opacity-60`}
                src={path ? (src2 as string) : src}
                alt=""
                width={iconSize}
                height={iconSize}
            />
            <p className={`dark:text-white text-gray-600 text-sm ${path ? "font-bold" : ""}`}>{name}</p>
        </Link>
    )
}

const LinkRouteButton = ({className, iconSize = 24, src, href, path, name, src2}: LinkRouteButtonProps) => (
    <Link
        href={href}
        className={`transition-all hover:opacity-50 w-full flex items-center gap-2 p-2 py-[14px] ${
            path ? "dark:bg-gray-800 bg-gray-50  " : ""
        } ${className}`}
    >
        <Image width={iconSize} height={iconSize} alt="" src={path ? (src2 as string) : src} className={`transition-all`} />
        <p className={`transition-all text-base ${path ? "text-green-400 font-semibold" : "text-gray-400 "}`}>{name}</p>
    </Link>
)

const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="z-30 w-full h-16 md:w-64 md:h-[100%] md:flex-col dark:bg-gray-950 md:border-r-[1px] border-t-[1px] dark:border-gray-900 md:justify-start flex md:items-start md:px-2 md:pt-28 px-2 md:p-10 relative">
            {/* Mobile */}
            <div className="flex items-center justify-evenly w-full md:hidden py-2">
                <LinkRouteButtonMobile
                    src={"/money-bag.png"}
                    src2={"/money-bag-filled.png"}
                    href={"/layout/dashboard"}
                    name={"Dashboard"}
                    path={pathname.includes("/layout/dashboard")}
                />
                <LinkRouteButtonMobile
                    src={"/expense.png"}
                    src2={"/expense-filled.png"}
                    href={"/layout/transactions/expense"}
                    name={"Expenses"}
                    path={pathname.includes("/layout/transactions/expense")}
                />
                <LinkRouteButtonMobile
                    src={"/income.png"}
                    src2={"/income-filled.png"}
                    href={"/layout/transactions/profit"}
                    name={"Profits"}
                    path={pathname.includes("/layout/transactions/profit")}
                />
                <LinkRouteButtonMobile
                    src={"/wallet.png"}
                    src2={"/wallet-filled.png"}
                    href={"/layout/wallet"}
                    name={"Wallet"}
                    path={pathname.includes("/layout/wallet")}
                />
            </div>

            {/* Desktop */}
            <div className="max-sm:hidden w-full">
                <div className="absolute top-4 left-1/2 translate-x-[-50%]">
                    <Link
                        href={"/"}
                        className="active:scale-[0.9] transition-all dark:text-gray-300 text-sm flex flex-col items-center justify-center gap-2"
                    >
                        <Image width={40} height={40} className=" bg-white p-[1px] rounded " src="/favicon.svg" alt="logo Icon" />
                        <h1 className="">FFizTrack</h1>
                    </Link>
                </div>

                <LinkRouteButton
                    href={"/layout/dashboard"}
                    path={pathname.includes("/layout/dashboard")}
                    src={"/money-bag-gray.png"}
                    src2={"/money-bag-filled-green.png"}
                    name="Dashboard"
                />
                <LinkRouteButton
                    href={"/layout/transactions/expense"}
                    path={pathname.includes("/transactions/expense")}
                    src={"/expense-gray.png"}
                    src2={"/expense-filled-green.png"}
                    name="Expenses"
                />
                <LinkRouteButton
                    href={"/layout/transactions/profit"}
                    path={pathname.includes("/transactions/profit")}
                    src={"/income-gray.png"}
                    src2={"/income-filled-green.png"}
                    name="Profits"
                />
                <LinkRouteButton
                    href={"/layout/wallet"}
                    path={pathname.includes("/wallet")}
                    src={"/wallet-gray.png"}
                    src2={"/wallet-filled-green.png"}
                    name="Wallet"
                />
            </div>
        </div>
    )
}

export default Navbar
