"use client"

import {useState, useTransition} from "react"
import FormModalAddCard from "../_components/FormModalAddCard"
import {addCardItem, addTransactionItem, updateCardItem} from "@/src/data/actions/auth-actions"
import {CardItem, TransactionItem} from "@/src/types/types"
import {useRouter} from "next/navigation"
import {formatShortBRL, formatTime, formatUSDtoBRL} from "@/src/lib/utils"
import {motion} from "framer-motion"
import Image from "next/image"
import FormModalEditCard from "../_components/FormModalEditCard"
import FormModalAddTransactionComponent from "../_components/FormModalAddTransaction"
interface TransactionParams {
    cards: CardItem[]
    transactions: TransactionItem[]
}

interface CardItemComponentProps {
    card: CardItem
    activeIndex: number | null
    setActiveIndex: (param: number | null) => void
    transactions: TransactionItem[]
    setCurrentCard: (card: CardItem | null) => void
    setIsEditOpen: () => void
    setIsAddTransactionModalOpen: (param: boolean) => void
}

const getContrastColor = (bgColor: string) => {
    const hex = bgColor.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    return brightness > 128 ? "#000" : "#fff"
}

const CardItemComponent = ({
    card,
    index,
    activeIndex,
    setActiveIndex,
    transactions,
    setIsEditOpen,
    setCurrentCard,
    setIsAddTransactionModalOpen,
}: CardItemComponentProps & {index: number}) => {
    const textColor = getContrastColor(card.color ?? "#99a1af ")

    return (
        <motion.div
            key={index}
            initial={{width: 320, height: 200}}
            animate={
                activeIndex === index
                    ? {
                          width: 350,
                          height: 500,
                      }
                    : {width: 320, height: 200}
            }
            transition={{duration: 0.2, ease: "easeOut"}}
            className={`relative flex flex-col justify-between gap-10 border-gray-800 p-4 rounded-xl shadow-md overflow-x-hidden${
                activeIndex === index ? "z-40 gap-5" : "z-0 "
            }`}
            style={{
                background: `linear-gradient(to bottom right, ${card.color ?? "#99a1af "}, ${card.color}90 )`,
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
                <div
                    className=" z-50 w-10 h-10 p-1 bg-transparent rounded flex items-center justify-center cursor-pointer"
                    onClick={() => setIsAddTransactionModalOpen(true)}
                >
                    <Image alt="delete button" src={"/plus.svg"} width={40} height={40} />
                </div>
                <div
                    className=" z-50  w-10 h-10 p-1 bg-transparent rounded flex items-center justify-center cursor-pointer active:scale-[0.9]"
                    onClick={setIsEditOpen}
                >
                    <Image alt="delete button" src={"/edit.svg"} width={40} height={40} />
                </div>
                <div
                    className=" z-50 w-10 h-10 p-1 bg-transparent rounded flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveIndex(null)}
                >
                    <Image alt="delete button" src={"/close.svg"} className={"invert"} width={40} height={40} />
                </div>
            </motion.div>
            {activeIndex === index ? (
                <></>
            ) : (
                <div
                    onClick={() => {
                        setActiveIndex(index)
                        setCurrentCard(card)
                    }}
                    className="absolute top-0 left-0 w-full h-full z-60"
                ></div>
            )}

            <div className="text-lg font-semibold w-1/2">{card.name}</div>

            <div className="text-sm space-y-1">
                <p>
                    <span className="opacity-80">Limit:</span>
                    <span className="font-medium ml-1">{formatUSDtoBRL(card.limit)}</span>
                </p>
                <p>
                    <span className="opacity-80">Available:</span>
                    <span className="font-medium ml-1">{formatUSDtoBRL(card.available)}</span>
                </p>
            </div>

            <div className="w-full min-h-2 border rounded-full bg-white bg-opacity-20 overflow-hidden">
                <div
                    className="h-2 rounded-full rounded-r-none"
                    style={{
                        width: `${(card.available / card.limit) * 100}%`,
                        background: card.color,
                    }}
                />
            </div>
            {activeIndex === index ? (
                <div className="w-full h-full flex flex-col gap-2">
                    {transactions
                        .filter(({type}) => type === card.name)
                        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
                        .map((item, key) => (
                            <div
                                key={key}
                                style={{background: card.color + "80", borderColor: textColor}}
                                className={`flex w-full border  rounded p-2`}
                            >
                                <div className="flex flex-col w-full flex-1">
                                    <h1 style={{color: textColor}} className="text-lg font-semibold">
                                        {item.name}
                                    </h1>
                                    <p style={{color: textColor}} className="text-xs ">
                                        {formatTime(item.transactionDate as string)}
                                    </p>
                                </div>

                                <p style={{color: textColor}} className={`text-2xl  font-bold truncate max-w-[150px] cursor-pointer`}>
                                    {formatShortBRL(item.amount)}
                                </p>
                            </div>
                        ))}
                </div>
            ) : (
                <></>
            )}
        </motion.div>
    )
}

export default function WalletScreen({params}: {params: TransactionParams}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pending, startTransition] = useTransition()
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [currentCard, setCurrentCard] = useState<CardItem | null>(null)
    const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false)
    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false)

    const router = useRouter()
    return (
        <div className="relative flex flex-col items-center justify-center h-dvh bg-gray-900 overflow-hidden ">
            <div className="transition-all z-10 w-full  gap-4 py-6 flex flex-col bottom-4 items-center overflow-x-hidden overflow-y-scroll ">
                {params.cards
                    .map((item, index) => (
                        <CardItemComponent
                            transactions={params.transactions}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            setCurrentCard={setCurrentCard}
                            setIsAddTransactionModalOpen={setIsAddTransactionModalOpen}
                            setIsEditOpen={() => setIsEditCardModalOpen(!isEditCardModalOpen)}
                            card={item}
                            index={index}
                            key={index}
                        />
                    ))
                    .reverse()}

                <div
                    onClick={() => setIsModalOpen(true)}
                    className="transition-all active:scale-[0.9] flex items-center justify-center shadow border rounded-xl w-64 min-h-40 bg-linear-to-br from-gray-400 to-gray-800"
                >
                    <p className="font-thin text-6xl text-white drop-shadow-lg ">+</p>
                </div>
            </div>
            <FormModalAddCard
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(e) => {
                    startTransition(() => {
                        const formData = new FormData(e.target as HTMLFormElement)
                        addCardItem(formData).then(() => {
                            router.refresh()
                        })
                        e.currentTarget.reset()
                    })
                }}
            />
            <FormModalEditCard
                isModalOpen={isEditCardModalOpen}
                card={currentCard as CardItem}
                onClose={() => setIsEditCardModalOpen(false)}
                onSubmit={(e) => {
                    setIsEditCardModalOpen(false)
                    startTransition(() => {
                        const formData = new FormData(e.target as HTMLFormElement)
                        updateCardItem(formData, currentCard?.id as string).then(() => {
                            router.refresh()
                        })
                        e.currentTarget.reset()
                    })
                }}
            />
            <FormModalAddTransactionComponent
                isModalOpen={isAddTransactionModalOpen}
                setIsModalOpen={setIsAddTransactionModalOpen}
                onClose={() => setIsAddTransactionModalOpen(false)}
                onSubmit={(e) => {
                    startTransition(() => {
                        const formData = new FormData(e.target as HTMLFormElement)
                        addTransactionItem(formData).then(() => {
                            router.refresh()
                        })
                        e.currentTarget.reset()
                    })
                }}
                type={currentCard?.name + " transaction" as string}
            />
        </div>
    )
}
