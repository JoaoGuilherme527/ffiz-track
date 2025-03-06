/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {useTransition} from "react"

interface AuthFormProps {
    children: React.ReactNode
    formAction: (e: FormData) => void
    title: string
    description: string
}

export function AuthForm({children, formAction, description, title}: AuthFormProps) {
    const [pending, startTransition] = useTransition()
    return (
        <form
            method="post"
            onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                startTransition(() => {
                    formAction(formData)
                })
            }}
            className="md:flex md:justify-end md:w-full h-dvh  py-10 relative"
        >
            <div className="flex flex-col justify-center md:w-1/2 md:px-40 px-12 h-full gap-8 md:rounded-xl z-20 ">
                <div className="flex flex-col items-center px-1">
                    <div className="text-gray-600 font-bold">{title}</div>
                    <div className="text-sm md:text-lg">{description}</div>
                </div>
                {children}
            </div>
        </form>
    )
}
