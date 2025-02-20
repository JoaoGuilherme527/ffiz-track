import Image from "next/image"
import Link from "next/link"

interface HeaderDashboardProps {
    routeName: string
    username: string
}

export default function HeaderDashboardComponent({routeName, username}: HeaderDashboardProps) {
    return (
        <div className="z-40 absolute top-0 w-full h-[7%] bg-[var(--dark-green)] shadow-md flex justify-between items-center p-4">
            <Link href={"/"} className="active:scale-[0.9] transition-all">
                <Image width={40} height={40} className=" bg-white p-[1px] rounded " src="/favicon.svg" alt="logo Icon" />
            </Link>
            <h1 className={`text-white text-base drop-shadow-md transition-all  duration-500  absolute left-2/4 translate-x-[-50%]`}>
                {routeName}
            </h1>
            <div className="flex items-center justify-center gap-2">
                <p className="text-white text-sm">{username}</p>
                <div className="w-8 h-8 rounded-full bg-white"></div>
            </div>
        </div>
    )
}
