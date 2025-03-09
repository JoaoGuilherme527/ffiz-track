import {formatDate, formatShortBRL, formatTime, formatUSDtoBRL} from "@/src/lib/utils"
import {CardItem, TransactionItem} from "@/src/types/types"
import {EnvelopeClosedIcon, PlusIcon} from "@radix-ui/react-icons"
import {motion} from "framer-motion"
import Image from "next/image"
import {useMemo} from "react"

interface CardItemComponentProps {
    card: CardItem
    index: number
    activeIndex: number | null
    setActiveIndex: (param: number | null) => void
    transactions: TransactionItem[]
    setCurrentCard: (card: CardItem | null) => void
    setIsEditOpen: () => void
    setIsAddTransactionModalOpen: (param: boolean) => void
}

const getContrastColor = (bgColor: string): string => {
    const hex = bgColor.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? "#000" : "#fff"
}

export default function CardItemComponent({
    card,
    index,
    activeIndex,
    setActiveIndex,
    transactions,
    setIsEditOpen,
    setCurrentCard,
    setIsAddTransactionModalOpen,
}: CardItemComponentProps) {
    const textColor = getContrastColor(card.color ?? "#99a1af")

    const isPaymentDay = useMemo(() => {
        const today = new Date().toISOString().split("T")[0]
        return today === card.expirationDate
    }, [card.expirationDate])

    return (
        <motion.div
            key={index}
            initial={{width: "100%", height: 200}}
            animate={activeIndex === index ? {width: "100%", height: 300, borderRadius: "none"} : {width: "100%", height: 200}}
            transition={{duration: 0.05}}
            className={`relative flex flex-col gap-4 dark:border-gray-700 border p-4 pb-4 rounded-xl shadow-md overflow-hidden ${
                activeIndex !== null && activeIndex !== index ? "hidden" : activeIndex === index ? "z-40" : "z-0"
            }`}
            style={{
                background: `linear-gradient(to bottom right, ${card.color ?? "#99a1af"}, ${card.color}90 )`,
                color: textColor,
            }}
        >
            <motion.div
                initial={{translateX: "-100px", opacity: 0}}
                animate={activeIndex === index ? {translateX: "0px", opacity: 1} : {}}
                exit={{translateX: "-100px", opacity: 0}}
                className="absolute flex gap-2 top-[10px] right-[10px]"
                transition={{duration: 0.2}}
            >
                <div className="w-20 h-10 p-2 text-sm rounded flex items-center justify-center cursor-pointer" onClick={setIsEditOpen}>
                    <p style={{color: textColor}}>Edit card</p>
                </div>
                <div
                    className="w-10 h-10 p-2 bg-white rounded flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveIndex(null)}
                >
                    <EnvelopeClosedIcon width={40} height={40} />
                </div>
            </motion.div>

            {activeIndex !== index && (
                <div
                    onClick={() => {
                        setActiveIndex(index)
                        setCurrentCard(card)
                    }}
                    className="absolute top-0 left-0 w-full h-full z-60"
                ></div>
            )}

            <div className="flex flex-col gap-10">
                <div className="text-lg font-semibold w-1/2">{card.name}</div>
                <div className="gap-8 flex flex-col">
                    <div className="text-sm gap-2 flex flex-col">
                        <p>
                            <span className="opacity-80">Limit:</span>{" "}
                            <span className="font-medium ml-1">{formatUSDtoBRL(card.limit)}</span>
                        </p>
                        <div className="flex justify-between items-center">
                            <p>
                                <span className="opacity-80">Available:</span>{" "}
                                <span className="font-medium ml-1">{formatUSDtoBRL(card.available)}</span>
                            </p>
                            <p className="text-xs">
                                <span className="opacity-80">Expiration:</span>
                                <span className="font-medium ml-1">{formatDate(card.expirationDate)}</span>
                            </p>
                        </div>
                    </div>
                    <div className="relative w-full min-h-2 dark:border border-y-gray-200 shadow border rounded-full bg-white bg-opacity-20 overflow-hidden">
                        <div
                            className="h-2 rounded-full rounded-r-none"
                            style={{width: `${((card.limit - card.available) * 100) / card.limit}%`, background: card.color}}
                        />
                    </div>
                </div>
            </div>

            {activeIndex === index && (
                <div className="w-full flex flex-col gap-2 overflow-y-scroll py-4">
                    {transactions
                        .filter(({type}) => type === card.name.trim())
                        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
                        .map((item, key) => (
                            <div
                                key={key}
                                style={{background: card.color + "80", borderColor: textColor}}
                                className="flex w-full border rounded p-2"
                            >
                                <div className="flex flex-col w-full flex-1">
                                    <h1 style={{color: textColor}} className="text-lg font-semibold">
                                        {item.name}
                                    </h1>
                                    <p style={{color: textColor}} className="text-xs">
                                        {formatTime(item.transactionDate)}
                                    </p>
                                </div>
                                <p style={{color: textColor}} className="text-2xl font-bold truncate max-w-[150px] cursor-pointer">
                                    {formatShortBRL(item.amount)}
                                </p>
                            </div>
                        ))}
                    <div
                        style={{background: card.color + "80", borderColor: textColor}}
                        className="flex w-full border rounded p-2 items-center justify-center"
                        onClick={() => setIsAddTransactionModalOpen(true)}
                    >
                        <PlusIcon color={textColor} className="w-10 h-8" />
                    </div>
                </div>
            )}
        </motion.div>
    )
}
