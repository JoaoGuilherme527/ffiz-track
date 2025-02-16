/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"

import {startTransition, useActionState} from "react"
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
    console.log(formState, "client")

    return (
        <div className="">
            <form
                method="post"
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    startTransition(() => {
                        formAction(formData)
                    })
                }}
            >
                <Link className="mt-4 text-center text-sm" href={"/"}> {"<"}  Back home</Link>
                <Card className="border-none">
                    <CardHeader className="space-y-1 p-0">
                        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                        <CardDescription>Enter your details to create a new account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" type="text" placeholder="username" />
                            {formState?.zodErrors?.username && <ZodErrors error={formState.zodErrors.username} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="name@example.com" />
                            {formState?.zodErrors?.email && <ZodErrors error={formState.zodErrors.email} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="password" />
                            {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input className="outline-none" id="confirmPassword" type="password" placeholder="confirm password" />
                            {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
                        {formState?.strapiErrors && <StrapiErrors error={formState.strapiErrors} />}
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Have an account?
                    <Link className="underline ml-2" href="signin">
                        Sing In
                    </Link>
                </div>
            </form>
        </div>
    )
}
