"use client"

import {formatUSDtoBRL} from "@/src/lib/utils"
import {useEffect, useState} from "react"
import {useGlobalContext} from "../../providers/GlobalProvider"

interface TotalAmountLabelProps {
    type: string
    amount?: number
}

export default function AmountLabelComponent({type}: TotalAmountLabelProps) {
    const {currentExpense, currentProfits, transactionItems} = useGlobalContext()
    const [fontSize, setFontSize] = useState("text-4xl")
    const [totalAmount, setTotalAmount] = useState("R$ 0,00")

    useEffect(() => {
        const sum = transactionItems
            .filter((item) => type == item.type)
            .map(({amount}) => amount)
            .reduce((acc, crr) => acc + crr, 0)

        // const formattedValue = amount ? formatUSDtoBRL(amount) : formatUSDtoBRL(type === "expense" ? currentExpense : currentProfits)

        const formattedValue = formatUSDtoBRL(sum)

        const length = formattedValue.length

        setTotalAmount(formattedValue)

        if (length <= 10) {
            setFontSize("text-4xl")
        } else if (length <= 14) {
            setFontSize("text-3xl")
        } else if (length <= 18) {
            setFontSize("text-2xl")
        } else {
            setFontSize("text-xl")
        }
    }, [currentExpense, currentProfits])

    return (
        <div className="transition-all z-20 w-full py-28 gap-4 absolute top-0 left-0 flex flex-col items-center justify-center px-10 ">
            <div className={`transition-all border-[1px] rounded flex flex-col border-gray-300 w-full px-4 py-2 gap-5`}>
                <div className="text-base">Total amount</div>
                <h1
                    className={`transition-all ${type === "expense" ? "text-red-400" : "text-green-500"} font-bold text-right ${fontSize}`}
                >
                    {totalAmount}
                </h1>
            </div>
        </div>
    )
}
