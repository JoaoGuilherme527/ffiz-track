import React from "react"
import {DropdownMenu} from "radix-ui"
import Image from "next/image"
import { logoutAction } from "@/src/data/actions/auth-actions"
interface DropdownMenuButtonProps {
    children: React.ReactNode
}

export default function DropdownMenuButton({children}: DropdownMenuButtonProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-50 bg-white border rounded-md mt-2 mr-4 shadow-xl">
                    <DropdownMenu.Item onClick={logoutAction} className="flex justify-between gap-4 items-center opacity-40 px-4 py-2"> 
                        <Image alt="" width={20} height={20} src={"/logout.png"} className="" />
                        <p className="text-base font-bold">Logout</p>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
