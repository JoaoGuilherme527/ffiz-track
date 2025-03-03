"use client"

import {formatUSDtoBRL} from "@/src/lib/utils"

interface TotalAmountLabelProps {
    type: string
    sumProfits: number
    sumExpenses: number
}

export default function AmountLabelComponent({type, sumExpenses, sumProfits}: TotalAmountLabelProps) {
    const formattedValue = formatUSDtoBRL(type === "expense" ? sumExpenses : sumProfits)
    const length = formattedValue.length
    const getLength = () => {
        if (length <= 10) {
            return "text-4xl"
        } else if (length <= 14) {
            return "text-3xl"
        } else if (length <= 18) {
            return "text-2xl"
        } else {
            return "text-xl"
        }
    }

    return (
        <div className="transition-all z-20 w-full py-20 gap-4 absolute top-0 left-0 flex flex-col items-center justify-center px-10 ">
            <div className={`transition-all border-[1px] rounded flex flex-col dark:bg-gray-800 dark:border-gray-950 w-full px-4 py-2 gap-5`}>
                <div className="text-base dark:text-white text-gray-800">Total amount</div>
                <h1
                    className={`transition-all ${
                        type === "expense" ? "text-red-400" : "text-green-500"
                    } font-bold text-right ${getLength()}`}
                >
                    {formattedValue}
                </h1>
            </div>
        </div>
    )
}
