"use client"

import InputForm from "@/src/components/custom/InputForm"
import {StrapiErrors} from "@/src/components/custom/StrapiErrors"
import SubmitButton from "@/src/components/custom/SubmitButton"
import {ZodErrors} from "@/src/components/custom/ZodErros"
import {AuthForm} from "@/src/components/forms/AuthForm"
import {loginUserAction} from "@/src/data/actions/auth-actions"
import Link from "next/link"
import {useActionState} from "react"

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
}

export default function SigInPage() {
    const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE)
    return (
        <AuthForm title="LOGIN" description="Sign in your account to continue " formAction={formAction}>
            <>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col w-full">
                        <InputForm labelName="Email" name="email" type="text" placeholder="account@gmail.com" />
                        {formState?.zodErrors?.email && <ZodErrors error={formState.zodErrors.email} />}
                    </div>
                    <div className="flex flex-col w-full">
                        <InputForm labelName="Password" name="password" placeholder="password" />
                        {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                    </div>
                    <SubmitButton text="LOGIN" />
                    {formState?.strapiErrors && <StrapiErrors error={formState.strapiErrors} />}
                </div>
                <div className="flex flex-col items-center px-1">
                    <div className="text-center text-sm md:text-lg flex gap-2 justify-center">
                        Don&apos;t have an account?
                        <Link className="text-gray-600 font-bold" href="signup">
                            REGISTER
                        </Link>
                    </div>

                    <Link className="text-center text-sm" href={"/"}>
                        Back home
                    </Link>
                </div>
            </>
        </AuthForm>
    )
}
