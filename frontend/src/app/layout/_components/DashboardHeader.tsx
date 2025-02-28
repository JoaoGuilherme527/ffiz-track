import DropdownMenuButton from "@/src/components/custom/Dropdown"
import Image from "next/image"
import Link from "next/link"

interface DashboardHeaderProps {
    routeName: string
    username: string
}

export default function DashboardHeaderComponent({routeName, username}: DashboardHeaderProps) {
    return (
        <div className="z-40 w-full h-[7%] md:h-[10%] md:w-full bg-white shadow-sm md:shadow-none md:border-b-[1px]  flex justify-between items-center p-4 relative md:justify-end border-b-[1px] border-gray-300 ">
            <Link href={"/"} className="active:scale-[0.9] transition-all text-gray-500 text-sm flex items-center justify-center md:hidden">
                <Image width={40} height={40} className=" bg-white p-[1px] rounded " src="/favicon.svg" alt="logo Icon" />
                FFizTrack
            </Link>
            <h1
                className={`text-gray-500 text-base drop-shadow-md transition-all  duration-500  absolute left-2/4 translate-x-[-50%] md:text-3xl`}
            >
                {routeName}
            </h1>
            <DropdownMenuButton>
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <p className="text-gray-500 text-sm md:text-2xl ">{username}</p>
                    <div className="w-7 h-7 md:h-10 md:w-10 rounded-full bg-gray-300"></div>
                </div>
            </DropdownMenuButton>
        </div>
    )
}
