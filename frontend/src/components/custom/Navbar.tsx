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
    <Link className={`active:scale-[0.9] transition-all text-sm invert ${className ?? ""}`} href={href}>
        <Image className="drop-shadow-lg" src={`/${src}${filled ? "-filled.png" : ".png"}`} alt="" width={iconSize} height={iconSize} />
    </Link>
)

const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="z-30 w-full h-14 md:w-64 md:h-full md:flex-col bg-white md:border-r-[1px] border-t-[1px] border-gray-300 py-4  md:justify-start flex md:items-start md:px-2 md:pt-28 px-10 md:p-10 relative">
            {/* Mobile */}
            <div className="flex items-center justify-between w-full px-5 md:hidden">
                <LinkRouteButtonMobile href={"/dashboard"} src={"money-bag"} path={!pathname.includes("dashboard/")} />
                <LinkRouteButtonMobile href={"/dashboard/transactions/expense"} src={"expense"} path={pathname.includes("/dashboard/transactions/expense")} />
                <LinkRouteButtonMobile href={"/dashboard/transactions/profit"} src={"income"} path={pathname.includes("/dashboard/transactions/profit")} />
                <LinkRouteButtonMobile href={"/dashboard/card "} src={"wallet"} path={pathname.includes("/dashboard/card")} />
                
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
                    href={"/dashboard"}
                    path={!pathname.includes("dashboard/")}
                    src={"/money-bag.png"}
                    src2={"/money-bag-filled-green.png"}
                    name="Dashboard"
                />
                <LinkRouteButton
                    href={"/dashboard/transactions/expense"}
                    path={pathname.includes("transactions/expense")}
                    src={"/expense.png"}
                    src2={"/expense-filled-green.png"}
                    name="Expenses"
                />
                <LinkRouteButton
                    href={"/dashboard/transactions/profit"}
                    path={pathname.includes("transactions/profit")}
                    src={"/income.png"}
                    src2={"/income-filled-green.png"}
                    name="Profits"
                />
                <LinkRouteButton
                    href={"/dashboard/card"}
                    path={pathname.includes("/dashboard/card")}
                    src={"/wallet.png"}
                    src2={"/wallet-filled-green.png"}
                    name="Wallet"
                />
            </div>
        </div>
    )
}

export default Navbar
