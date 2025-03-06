"use client"

import InputForm from "@/src/components/custom/InputForm"
import {StrapiErrors} from "@/src/components/custom/StrapiErrors"
import SubmitButton from "@/src/components/custom/SubmitButton"
import {ZodErrors} from "@/src/components/custom/ZodErros"
import {AuthForm} from "@/src/components/forms/AuthForm"
import {registerUserAction} from "@/src/data/actions/auth-actions"
import Link from "next/link"
import {useActionState, useState} from "react"

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
}

export default function SigUpPage() {
    const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE)
    const [isPassword, setIsPassword] = useState("")
    const [isConfirmPassword, setIsConfirmPassword] = useState("")
    return (
        <AuthForm title="REGISTER" description="Enter your details to create a new account" formAction={formAction}>
            <>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col w-full">
                        <InputForm labelName="Username" name="username" placeholder="username" />
                        {formState?.zodErrors?.username && <ZodErrors error={formState.zodErrors.username} />}
                    </div>
                    <div className="flex flex-col w-full">
                        <InputForm labelName="Email" name="email" placeholder="account@gmail.com" />
                        {formState?.zodErrors?.email && <ZodErrors error={formState.zodErrors.email} />}
                    </div>
                    <div className="flex flex-col w-full">
                        <InputForm
                            labelName="Password"
                            name="password"
                            onChange={(e) => {
                                setIsPassword(e.target.value)
                            }}
                            placeholder="password"
                        />
                        {formState?.zodErrors?.password && <ZodErrors error={formState.zodErrors.password} />}
                    </div>
                    <div className="flex flex-col w-full">
                        <InputForm
                            labelName="Confirm password"
                            name="confirmPassword"
                            onChange={(e) => {
                                setIsConfirmPassword(e.target.value)
                            }}
                            placeholder="confirm password"
                            className={`${isPassword === isConfirmPassword ? "" : "border-red-500"}`}
                        />
                    </div>
                    <SubmitButton text="REGISTER" />
                    {formState?.strapiErrors && <StrapiErrors error={formState.strapiErrors} />}
                </div>
                <div className="flex flex-col items-center px-1">
                    <div className="text-center text-sm md:text-lg flex gap-2 justify-center">
                        Already have an account?
                        <Link className="text-gray-600 font-bold" href="signin">
                            LOGIN
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
