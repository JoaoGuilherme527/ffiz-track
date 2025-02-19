"use client"

import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="z-30 absolute bottom-0 w-full h-20 bg-[var(--green)] flex items-center justify-center px-10 gap-32">
            <Link
                className={`active:scale-[0.9] transition-all text-sm p-3 rounded-full bg-red-200 ${pathname.includes("expenses") ? "opacity-0 pointer-events-none" : ""}`}
                href={"/dashboard/expenses"}
            >
                <Image className="drop-shadow-lg" src={"/expense.png"} alt="" width={40} height={40} />
            </Link>
            <Link
                className={`active:scale-[0.9] transition-all text-sm p-3 rounded-full bg-[var(--light-green)] ${
                    pathname.includes("earnings") ? "opacity-0 pointer-events-none" : ""
                }`}
                href={"/dashboard/earnings"}
            >
                <Image className="drop-shadow-lg" src={"/income.png"} alt="" width={40} height={40} />
            </Link>
        </div>
    )
}

export default Navbar
