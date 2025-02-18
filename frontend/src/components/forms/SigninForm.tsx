"use client"

import {loginUserAction} from "@/src/data/actions/auth-actions"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card"
import {Label} from "../ui/label"
import {Input} from "../ui/input"
import {StrapiErrors} from "../custom/StrapiErrors"
import {SubmitButton} from "../custom/SubmitButton"
import {ZodErrors} from "../custom/ZodErros"
import {startTransition, useActionState} from "react"

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
}

export function SigninForm() {
    const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE)
    return (
        <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center">
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
                <Link className="mt-4 text-center text-sm" href={"/"}>
                    {" "}
                    {"<"} Back home
                </Link>

                <Card className="border-none">
                    <CardHeader className="space-y-4 p-0">
                        <CardTitle className="text-3xl font-bold text-[var(--dark-green)]">Sign In</CardTitle>
                        <CardDescription>Enter your details to sign in to your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="text" placeholder="email@gmail.com" />
                            {formState?.zodErrors?.email && <ZodErrors error={formState.zodErrors.email} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="password" />
                            {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full bg-[var(--green)] hover:bg-[var(--dark-green)]" text="Sign In" loadingText="Loading" />
                        {formState?.strapiErrors && <StrapiErrors error={formState.strapiErrors} />}
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?
                    <Link className="underline ml-2" href="signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}
