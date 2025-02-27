/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {useState, useTransition} from "react"
import {TransactionItem} from "@/src/types/types"
import Loading from "../../loading"
import TransactionItemComponent from "../components/TransactionItem"
import {addTransactionItem, deleteTransaction, updateTransactionItem} from "@/src/data/actions/auth-actions"
import FormModalAddTransactionComponent from "../components/FormModalAddTransaction"
import FormModalEditTransactionComponent from "../components/FormModalEditTransaction"
import AddTransactionButton from "../components/AddTransactionButton"
import AmountLabelComponent from "../components/TotalAmountLabel"
import {useRouter} from "next/navigation"

interface TransactionParams {
    type: string
    sumProfits: number
    sumExpenses: number
    transactions: TransactionItem[]
}

export default function TransactionScreen({params}: {params: TransactionParams}) {
    const router = useRouter()
    const [isEditTransactionOpen, setIsTransactionOpen] = useState<{status: boolean; data: TransactionItem | null}>({
        status: false,
        data: null,
    })
    const [isEditModalOpen, setIsEditModalOpen] = useState<{status: boolean; data: TransactionItem | null}>({
        status: false,
        data: null,
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pending, startTransition] = useTransition()

    return (
        <>
            {/* Mobile */}
            <div className="flex flex-col items-center justify-center h-dvh bg-white overflow-x-hidden md:hidden">
                {pending ? <Loading /> : <></>}
                <AmountLabelComponent type={params.type} sumProfits={params.sumProfits} sumExpenses={params.sumExpenses} />
                <div className="z-20 w-full h-[65%] px-5 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-40 ">
                    {params.transactions
                        .filter(({type}) => type === params.type)
                        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
                        .map((item, key) => (
                            <TransactionItemComponent
                                key={key}
                                SVGIMG_EDIT={"/edit.svg"}
                                SVGIMG_PLUS={"/plus.svg"}
                                deleteExpense={() => {
                                    setIsTransactionOpen({status: false, data: null})
                                    startTransition(() => {
                                        deleteTransaction(item.id as string).then(() => {
                                            router.refresh()
                                        })
                                    })
                                }}
                                item={item}
                                isEditTransactionOpen={isEditTransactionOpen}
                                setIsTransactionOpen={setIsTransactionOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                            />
                        ))}
                </div>

                <FormModalAddTransactionComponent
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onSubmit={(e) => {
                        startTransition(() => {
                            const formData = new FormData(e.target as HTMLFormElement)
                            addTransactionItem(formData).then(() => {
                                router.refresh()
                            })
                            e.currentTarget.reset()
                        })
                    }}
                    type={params.type}
                />

                <FormModalEditTransactionComponent
                    amount={isEditModalOpen.data?.amount as number}
                    isModalOpen={isEditModalOpen.status}
                    onClose={() => setIsEditModalOpen({data: null, status: false})}
                    onSubmit={(e) => {
                        setIsEditModalOpen({data: null, status: false})
                        startTransition(() => {
                            const formData = new FormData(e.target as HTMLFormElement)
                            updateTransactionItem(formData, isEditModalOpen.data?.id ?? "").then(() => {
                                router.refresh()
                            })
                            e.currentTarget.reset()
                        })
                    }}
                />

                <AddTransactionButton isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>

            {/* Desktop */}
            <div className="bg-white w-full h-full max-sm:hidden">
                {params.transactions
                    .filter(({type}) => type === params.type)
                    .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
                    .map((item, key) => (
                        <TransactionItemComponent
                            key={key}
                            SVGIMG_EDIT={"/edit.svg"}
                            SVGIMG_PLUS={"/plus.svg"}
                            deleteExpense={() => {
                                setIsTransactionOpen({status: false, data: null})
                                startTransition(() => {
                                    deleteTransaction(item.id as string).then(() => {
                                        router.refresh()
                                    })
                                })
                            }}
                            item={item}
                            isEditTransactionOpen={isEditTransactionOpen}
                            setIsTransactionOpen={setIsTransactionOpen}
                            setIsEditModalOpen={setIsEditModalOpen}
                        />
                    ))}
            </div>
        </>
    )
}
