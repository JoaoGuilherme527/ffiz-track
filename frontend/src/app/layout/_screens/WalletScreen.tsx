"use client"

import {useEffect, useState, useTransition} from "react"
import FormModalAddCard from "../_components/_modals/FormModalAddCard"
import {addCardItem, addTransactionItem, deleteCard, updateCardItem} from "@/src/data/actions/auth-actions"
import {CardItem, TransactionItem} from "@/src/types/types"
import {useRouter} from "next/navigation"
import FormModalEditCard from "../_components/_modals/FormModalEditCard"
import Loading from "../../loading"
import CardItemComponent from "../_components/CardItemComponent"
import FormModalAddTransactionComponent from "../_components/_modals/FormModalAddTransaction"
interface TransactionParams {
    cards: CardItem[]
    transactions: TransactionItem[]
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
        <div className="relative flex flex-col items-center justify-start h-dvh dark:bg-gray-900 overflow-hidden overflow-y-scroll">
            {pending ? <Loading /> : <></>}
            <div className={`z-10 w-full gap-5 pb-4 flex max-sm:flex-col bottom-4 md:justify-center items-center p-4`}>
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
                    className={`transition-all active:scale-[0.9] flex items-center justify-center shadow border rounded-xl w-64 min-h-40 bg-linear-to-br from-gray-400 to-gray-800 ${
                        typeof activeIndex === "number" ? "hidden" : ""
                    }`}
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
                        setActiveIndex(null)
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
                onDelete={() => {
                    setIsEditCardModalOpen(false)
                    setActiveIndex(null)
                    startTransition(() => {
                        deleteCard(params.cards[activeIndex as number].id as string).then(() => {
                            router.refresh()
                        })
                    })
                }}
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
                type={(currentCard?.name + " transaction") as string}
            />
        </div>
    )
}
