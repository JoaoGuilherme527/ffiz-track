"use client"

import {loginUserAction} from "@/src/data/actions/auth-actions"
import Link from "next/link"
import {StrapiErrors} from "../custom/StrapiErrors"
import {SubmitButton} from "../custom/SubmitButton"
import {ZodErrors} from "../custom/ZodErros"
import {useActionState, useTransition} from "react"
import Image from "next/image"

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
}

export function SigninForm() {
    const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE)
    const [pending, startTransition] = useTransition()
    return (
        <div className="z-10 w-full h-dvh md:bg-gray-100 relative">
            <div className="bg-[url(/background.jpg)] bg-no-repeat bg-center bg-cover blur-md opacity-50 backdrop-blur-xs absolute w-full h-full top-0 left-0 " />
            <form
                method="post"
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    startTransition(() => {
                        formAction(formData)
                    })
                }}
                className="md:flex md:w-full md:justify-center md:scale-75 "
            >
                <div className="relative h-dvh flex flex-col justify-center md:w-1/2 md:rounded-xl md:shadow-xl md:border bg-white z-20">
                    <div className="flex flex-col items-center w-2/3 px-1">
                        <div className="text-green-600 font-bold">LOGIN</div>
                        <div className="text-sm md:text-lg">Sing in your account to continue</div>
                    </div>
                    <div className="flex flex-col items-end py-20 gap-6">
                        <div className="flex flex-col gap-1 w-3/4">
                            <label htmlFor="email" className="text-xl font-bold pl-8">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="your@gmail.com"
                                className="shadow-2xl py-5 pl-8 rounded-full rounded-r-none text-base outline-hidden border-t-2 border-l-2 border-gray-100"
                            />
                            {formState?.zodErrors?.email && <ZodErrors error={formState.zodErrors.email} />}
                        </div>
                        <div className="flex flex-col gap-1 w-3/4">
                            <label htmlFor="password" className="text-xl font-bold pl-8">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                                className="shadow-2xl py-5 pl-8 rounded-full rounded-r-none text-base outline-hidden border-t-2 border-l-2 border-gray-100"
                            />
                            {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl text-white text-center font-bold bg-green-600 shadow-2xl w-3/4 rounded-full rounded-l-none py-3 pl-6">
                            <SubmitButton className="w-full h-full" text="LOGIN" loadingText="Loading" />
                        </div>
                        {formState?.strapiErrors && <StrapiErrors error={formState.strapiErrors} />}
                    </div>
                    <div className="mt-4 text-center text-sm md:text-lg flex gap-2 justify-center py-5">
                        Don&apos;t have an account?
                        <Link className="text-green-600 font-bold" href="signup">
                            REGISTER
                        </Link>
                    </div>

                    <Link className="text-center text-sm mt-2" href={"/"}>
                        Back home
                    </Link>
                </div>
            </form>
        </div>
    )
}
