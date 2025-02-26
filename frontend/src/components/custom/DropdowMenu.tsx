import * as React from "react"
import {DropdownMenu} from "radix-ui"
import Image from "next/image"
import { logoutAction } from "@/src/data/actions/auth-actions"

interface DropdowProps {
    children: React.ReactNode
}

const Dropdown = ({children}: DropdowProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-50 bg-white rounded-lg shadow-2xl transition-all mt-2 max-sm:w-32 md:w-44 mr-2 border" sideOffset={5}>
                    <DropdownMenu.Item className="flex gap-4 p-2 cursor-pointer bg-gree" onClick={logoutAction}>
                        <Image src={"/logout.png"} alt="" width={20} height={20} />
                        <p className="text-sm font-bold ">Logout</p>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className=""></DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default Dropdown
