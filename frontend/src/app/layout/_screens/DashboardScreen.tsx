/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {formatShortBRL, formatTime, formatUSDtoBRL, getItem, saveItem} from "@/src/lib/utils"
import Image from "next/image"
import {StaticImport} from "next/dist/shared/lib/get-img-props"
import {Key, useEffect, useState} from "react"
import FormModal from "@/src/components/custom/FormModal"
import {CardItem} from "@/src/types/types"
import {PlusIcon} from "lucide-react"

interface DashboardCardProps {
    src: string | StaticImport
    title: string
    value: string
    description: string
    variant?: boolean
    cards?: CardItem[]
    setIsCard?: (parm: CardItem) => void
    isCard?: CardItem
}

const DashboardCard = ({src, title, value, description, variant, cards, isCard, setIsCard}: DashboardCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSelectCard = (selectedCard: CardItem) => {
        setIsCard && setIsCard(selectedCard)
        saveItem("currentCard", selectedCard.id as string)
        setIsModalOpen(false)
    }

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className={`relative p-4 dark:border-gray-900 border rounded-md flex flex-col items-start justify-evenly flex-1 text-gray-700 shadow-sm transition-all gap-2 max-w-1/2 ${
                    variant && "bg-green-500 dark:bg-green-600"
                } ${setIsCard && "active:scale-[0.9]"}`}
            >
                <div className={`rounded-full ${variant ? "bg-white" : "bg-transparent"}`}>
                    <Image src={src} alt="" width={50} height={50} className="p-2 w-16 h-16" />
                </div>
                <h1 className={`font-normal text-sm dark:text-white ${variant ? "text-gray-200" : "text-gray-600"}`}>{title}</h1>
                <p className={`font-extrabold text-sm dark:text-white ${variant ? "text-gray-200" : "text-gray-600"}`}>{value}</p>
                <p className={`dark:text-white text-xs font-normal ${variant ? "text-gray-100" : "text-gray-600"}`}>{description}</p>

                {cards && cards?.length > 0 && (
                    <div className="absolute top-[10px] right-[10px]">
                        <PlusIcon color="oklch(0.723 0.219 149.579)" />
                    </div>
                )}
            </div>

            {isModalOpen && cards && cards?.length && (
                <FormModal isModalOpen={isModalOpen} onSubmit={() => {}} onClose={() => setIsModalOpen(false)}>
                    <div className="py-4">
                        <h2 className="text-lg font-bold mb-4">Select your card</h2>
                        <ul className="flex flex-col gap-2">
                            {cards.map((card, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200 bg-gray-100"
                                    onClick={() => handleSelectCard(card)}
                                >
                                    {card.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </FormModal>
            )}
        </>
    )
}

export default function DashboardScreen({params}: any) {
    const {sumExpenses, sumProfits, expenses, cards, transactions, profits, balance, mostFrequentCategory, highestSpendingCategory} = params

    const [isCard, setIsCard] = useState<CardItem | null>()

    function handleGetCard() {
        const cardId = getItem("currentCard")
        const card = cards.filter(({id}: {id: string}) => id === cardId)
        setIsCard(card[0])
    }

    useEffect(() => {
        handleGetCard()
    }, [])

    return (
        <>
            {/* Desktop */}
            {/* <div className="w-full h-full flex-col flex max-sm:hidden p-6">
                <div className="flex gap-4">
                    <div className="border-[1px] border-gray-300 p-4 rounded-md flex-1 ">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="rounded-full bg-gray-50">
                                <Image src={"/expense-green.png"} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-gray-300 p-4 rounded-md flex-1 ">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="rounded-full bg-gray-50">
                                <Image src={"/expense-green.png"} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-gray-300 p-4 rounded-md flex-1 ">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="rounded-full bg-gray-50">
                                <Image src={"/expense-green.png"} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Mobile */}
            <div className="z-20 flex flex-col gap-4 p-4 w-full overflow-scroll ">
                <div className="h-52 flex gap-4">
                    <DashboardCard title="TOTAL PROFITS" src="/income-green.png" value={formatUSDtoBRL(sumProfits)} description="" />
                    <DashboardCard
                        title="BALANCE"
                        src="/money-bag-filled-green.png"
                        value={formatUSDtoBRL(balance)}
                        description=""
                        variant
                    />
                </div>
                <div className="h-52 flex gap-4">
                    <DashboardCard title="TOTAL EXPENSES" src="/expense-green.png" value={formatUSDtoBRL(sumExpenses)} description="" />
                    <DashboardCard
                        title="AVAILABLE CREDIT"
                        src="/credit-card-green.png"
                        value={formatUSDtoBRL(isCard?.available ?? 0)}
                        description={formatUSDtoBRL(isCard?.limit ?? 0)}
                        cards={cards}
                        setIsCard={setIsCard}
                    />
                </div>
                <div className="h-52 flex gap-4">
                    <DashboardCard
                        title="MOST FREQUENCY"
                        src="/coins-green.png"
                        value={mostFrequentCategory.category.toUpperCase() as string}
                        description={mostFrequentCategory.amount + " Times"}
                    />
                    <DashboardCard
                        title=" MOST SPENDING"
                        src="/coins-green.png"
                        value={highestSpendingCategory.category.toUpperCase() as string}
                        description={formatUSDtoBRL(highestSpendingCategory.amount)}
                        variant
                    />
                </div>
                <div className=" flex-2 flex flex-col p-4 border-[1px] dark:border-gray-900 rounded-md gap-4 ">
                    <p className={`font-extrabold text-xl dark:text-white text-gray-800 `}>Recent Expenses</p>
                    <div className="flex justify-between gap-4">
                        <div className="pb-10">
                            <div className="relative h-full w-1 bg-gray-100">
                                <div className="absolute bottom-0 h-[90%] w-full bg-green-400"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            {expenses
                                .slice(-expenses.length, 5)
                                .sort(
                                    (a: {transactionDate: string | number | Date}, b: {transactionDate: string | number | Date}) =>
                                        new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
                                )
                                .map(({amount, name, transactionDate}: any, key: Key | null | undefined) => (
                                    <div
                                        key={key}
                                        className="relative  flex dark:bg-gray-800 bg-white dark:border-gray-700 border py-4 px-2 gap-2 rounded"
                                    >
                                        <div className="absolute top-1/2 translate-y-[-50%] left-[-8.4%] bg-green-400 rounded-full w-4 h-4"></div>
                                        <div className="flex flex-col w-full flex-1">
                                            <h1 className="text-lg dark:text-white font-semibold break-words max-w-36">{name}</h1>
                                            <p className="text-xs dark:text-white">{formatTime(transactionDate as string)}</p>
                                        </div>
                                        <p className={`text-base dark:text-white font-bold truncate  cursor-pointer`}>
                                            {formatShortBRL(amount)}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
