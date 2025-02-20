import {useState, useRef} from "react"
import Image from "next/image"
import {formatTime} from "@/src/lib/utils"
import { TransactionItem } from "@/src/types/types"

interface TransactionItemProps {
    item: TransactionItem
    isEditExpenseOpen: {status: boolean; data: TransactionItem | null}
    setIsEditExpenseOpen: (value: {status: boolean; data: TransactionItem | null}) => void
    setIsEditModalExpenseOpen: (value: {status: boolean; data: TransactionItem | null}) => void
    deleteExpense: () => void
    SVGIMG_PLUS: string
    SVGIMG_EDIT: string
}

const formatShortBRL = (number: number): string => {
    if (number >= 1_000_000_000) return `R$ ${(number / 1_000_000_000).toFixed(1)}B`
    if (number >= 1_000_000) return `R$ ${(number / 1_000_000).toFixed(1)}M`
    if (number >= 1_000) return `R$ ${(number / 1_000).toFixed(1)}K`
    return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(number)
}

export default function TransactionItemComponent({
    item,
    isEditExpenseOpen,
    setIsEditExpenseOpen,
    setIsEditModalExpenseOpen,
    deleteExpense,
    SVGIMG_PLUS,
    SVGIMG_EDIT,
}: TransactionItemProps) {
    const [isLongPress, setIsLongPress] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleTouchStart = () => {
        timeoutRef.current = setTimeout(() => {
            setIsLongPress(true)
        }, 500)
    }

    const handleTouchEnd = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsLongPress(false)
    }

    return (
        <div className="w-full relative flex items-center active:scale-y-[0.9] transition-all" key={item.id}>
            <div
                className={`transition-all flex items-center gap-1 w-full bg-white dark:bg-gray-900 rounded-md shadow-xl p-5 z-20 ${
                    isEditExpenseOpen.data?.id === item.id ? "translate-x-[-24%] w-[80%] rounded-r-none" : ""
                }`}
                onClick={() => {
                    if (isEditExpenseOpen.data?.id === item.id) {
                        setIsEditExpenseOpen({status: false, data: null})
                        return
                    } else setIsEditExpenseOpen({status: true, data: item})
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex flex-col w-full flex-1">
                    <h1 className="text-lg text-gray-800 font-semibold">{item.name}</h1>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{formatTime(item.createdAt as string)}</p>
                </div>

                <p className={`text-2xl text-red-300 font-bold truncate max-w-[${isLongPress ? "300px" : "150px"}] cursor-pointer`}>
                    {isLongPress
                        ? new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(item.amount)
                        : formatShortBRL(item.amount)}
                </p>
            </div>

            <div
                className="absolute right-0 bg-red-400 w-[12%] h-full rounded-r-md flex items-center justify-center z-10 active:bg-red-600"
                onClick={deleteExpense}
            >
                <Image alt="delete button" src={SVGIMG_PLUS} className="rotate-45" width={20} height={20} />
            </div>

            <div
                className="absolute right-[12%] bg-blue-400 w-[12%] h-full flex items-center justify-center z-10 active:bg-blue-600"
                onClick={() => {
                    setIsEditExpenseOpen({status: false, data: null})
                    setIsEditModalExpenseOpen({status: true, data: item})
                }}
            >
                <Image alt="edit button" src={SVGIMG_EDIT}  width={20} height={20}/>
            </div>
        </div>
    )
}
