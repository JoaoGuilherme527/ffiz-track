import {useState, useRef} from "react"
import Image from "next/image"
import {formatShortBRL, formatTime} from "@/src/lib/utils"
import {TransactionItem} from "@/src/types/types"

interface TransactionItemProps {
    item: TransactionItem
    isEditTransactionOpen: {status: boolean; data: TransactionItem | null}
    setIsTransactionOpen: (value: {status: boolean; data: TransactionItem | null}) => void
    setIsEditModalOpen: (value: {status: boolean; data: TransactionItem | null}) => void
    deleteExpense: () => void
    SVGIMG_PLUS: string
    SVGIMG_EDIT: string
}

export default function TransactionItemComponent({
    item,
    isEditTransactionOpen,
    setIsTransactionOpen,
    setIsEditModalOpen,
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
                className={`transition-all flex items-center gap-1 w-full dark:bg-gray-800 dark:border-gray-950 bg-white border-[1px] rounded-md shadow-sm p-5 z-20 ${
                    isEditTransactionOpen.data?.id === item.id ? "translate-x-[-24%] w-[80%] rounded-r-none" : ""
                }`}
                onClick={() => {
                    if (isEditTransactionOpen.data?.id === item.id) {
                        setIsTransactionOpen({status: false, data: null})
                    } else setIsTransactionOpen({status: true, data: item})
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex flex-col w-full flex-1">
                    <h1 className="text-lg text-gray-800 dark:text-gray-300 font-semibold">{item.name}</h1>
                    <p className="text-xs text-gray-800 dark:text-gray-300">{formatTime(item.transactionDate as string)}</p>
                </div>

                <p
                    className={`${item.type == "profit" ? "text-green-500" : "text-red-400"} text-2xl  font-bold truncate max-w-[${
                        isLongPress ? "300px" : "150px"
                    }] cursor-pointer`}
                >
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
                    setIsTransactionOpen({status: false, data: null})
                    setIsEditModalOpen({status: true, data: item})
                }}
            >
                <Image alt="edit button" src={SVGIMG_EDIT} width={20} height={20} />
            </div>
        </div>
    )
}
