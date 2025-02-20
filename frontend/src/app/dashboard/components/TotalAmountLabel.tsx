"use client"

import {formatUSDtoBRL} from "@/src/lib/utils"
import {useEffect, useState} from "react"

interface TotalAmountLabelProps {
    amount: number
}

export default function AmountLabelComponent({amount}: TotalAmountLabelProps) {
    const [fontSize, setFontSize] = useState("")
    const [totalAmount, setTotalAmount] = useState("")

    useEffect(() => {
        const formattedValue = formatUSDtoBRL(amount)
        const length = formattedValue.length

        setTotalAmount(formattedValue)

        if (length <= 10) {
            setFontSize("text-5xl")
        } else if (length <= 14) {
            setFontSize("text-4xl")
        } else if (length <= 18) {
            setFontSize("text-3xl")
        } else {
            setFontSize("text-2xl")
        }
    }, [])

    return (
        <div className="transition-all z-20 w-full py-28 gap-4 absolute top-0 left-0 flex flex-col items-center justify-center px-10">
            <div className="transition-all border-2 rounded border-[var(--light-green)] w-full px-5 py-5">
                <h1 className={`transition-all drop-shadow-lg text-[var(--light-green)] font-bold text-center ${fontSize}`}>
                    {totalAmount}
                </h1>
            </div>
        </div>
    )
}
