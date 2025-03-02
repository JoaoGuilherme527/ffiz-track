/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"

import {startTransition, useActionState, useState} from "react"
import {ZodErrors} from "../custom/ZodErros"
import {registerUserAction} from "@/src/data/actions/auth-actions"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card"
import {Label} from "../ui/label"
import {Input} from "../ui/input"
import {StrapiErrors} from "../custom/StrapiErrors"
import {SubmitButton} from "../custom/SubmitButton"

const INITIAL_STATE = {
    data: null,
    zodErros: null,
    message: null,
}

export function SignupForm() {
    const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE)
    const [isPassword, setIsPassword] = useState("")
    const [isConfirmPassword, setIsConfirmPassword] = useState("")

    return (
        <div className="relative w-full h-dvh md:bg-gray-100">
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
                <div className="relative h-dvh flex flex-col justify-between md:w-1/2 md:rounded-xl md:shadow-xl md:border bg-white gap-5 py-10">
                    <div className="flex flex-col items-center w-3/4 md:w-2/3 px-1">
                        <div className="text-green-600 font-bold text-4xl">REGISTER</div>
                        <div className="text-sm md:text-base">Enter your details to create a new account</div>
                    </div>
                    <div className="flex flex-col items-end py-2 gap-4">
                        <div className="flex flex-col gap-1 w-3/4 md:w-2/3">
                            <label htmlFor="username" className="text-lg font-bold pl-8">
                                Username
                            </label>
                            <input
                                className="shadow-2xl py-4 pl-8 rounded-full rounded-r-none text-base outline-hidden border-t-2 border-l-2 border-gray-100"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username"
                            />
                            {formState?.zodErrors?.username && <ZodErrors error={formState.zodErrors.username} />}
                        </div>
                        <div className="flex flex-col gap-1 w-3/4 md:w-2/3">
                            <label htmlFor="email" className="text-lg font-bold pl-8">
                                Email
                            </label>
                            <input
                                className="shadow-2xl py-4 pl-8 rounded-full rounded-r-none text-base outline-hidden border-t-2 border-l-2 border-gray-100"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                            />
                            {formState?.zodErrors?.email && <ZodErrors error={formState.zodErrors.email} />}
                        </div>

                        <div className="flex flex-col gap-1 w-3/4 md:w-2/3">
                            <label htmlFor="password" className="text-lg font-bold pl-8">
                                Password
                            </label>
                            <input
                                onChange={(e) => {
                                    setIsPassword(e.target.value)
                                }}
                                className="shadow-2xl py-4 pl-8 rounded-full rounded-r-none text-base outline-hidden border-t-2 border-l-2 border-gray-100"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                        </div>
                        <div className="flex flex-col gap-1 w-3/4 md:w-2/3">
                            <label htmlFor="confirmPassword" className="text-lg font-bold pl-8">
                                Confirm password
                            </label>
                            <input
                                onChange={(e) => {
                                    setIsConfirmPassword(e.target.value)
                                }}
                                className={`shadow-2xl py-4 pl-8 rounded-full rounded-r-none text-base outline-hidden border-t-2 border-l-2 border-gray-100 ${
                                    isPassword === isConfirmPassword ? "" : "outline-red-500"
                                }`}
                                id="confirmPassword"
                                type="password"
                                placeholder="confirm password"
                            />
                            {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                        </div>
                    </div>
                    <div className={`flex flex-col ${isPassword === isConfirmPassword ? "" : "pointer-events-none opacity-[0.5]"}`}>
                        <div className="text-xl text-white text-center font-bold bg-green-600 shadow-2xl w-3/4 rounded-full rounded-l-none py-3 pl-6">
                            <SubmitButton
                                className="bg-transparent"
                                text="REGISTER"
                                loadingText="Loading"
                            />
                        </div>
                        {formState?.strapiErrors && <StrapiErrors error={formState.strapiErrors} />}
                    </div>
                    <div className="flex flex-col gap-0">
                        <div className="text-center text-sm md:text-lg flex gap-2 justify-center py-2">
                            Have an account?
                            <Link className="text-green-600 font-bold" href="signin">
                                LOGIN
                            </Link>
                        </div>
                        <Link className="text-center text-sm mt-2" href={"/"}>
                            Back home
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
