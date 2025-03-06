"use client"

import {Loader2} from "lucide-react"
import {useFormStatus} from "react-dom"

export default function SubmitButton({text}: {text: string}) {
    const {pending} = useFormStatus()
    return (
        <div className={` bg-gray-600 cursor-pointer py-3 w-full rounded shadow text-center text-2xl text-white `}>
            {pending ? (
                <div className="flex gap-4 justify-center items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p>Loading</p>
                </div>
            ) : (
                <button style={{width: "100%", height: "100%"}} type="submit">
                    {text}
                </button>
            )}
        </div>
    )
}
