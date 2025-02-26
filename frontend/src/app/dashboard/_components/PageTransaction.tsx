/* eslint-disable react/jsx-no-undef */
"use client"

import {memo, useState, useTransition} from "react"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {TransactionItem} from "@/src/types/types"
import Loading from "../../loading"
import {addTransactionItem, deleteTransaction, updateTransactionItem} from "@/src/data/actions/auth-actions"
import TransactionItemComponent from "./TransactionItem"
import FormModalAddTransactionComponent from "./FormModalAddTransaction"
import FormModalEditTransactionComponent from "./FormModalEditTransaction"
import AddTransactionButton from "./AddTransactionButton"
import AmountLabelComponent from "./TotalAmountLabel"

function PageTransaction({params}: {params: string}) {
    const slug = params
    const {fetchTransactions, setTransactionItems, transactionItems} = useGlobalContext()
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
                <AmountLabelComponent type={slug} />
                <div className="z-20 w-full h-[65%] px-5 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-40 ">
                    {transactionItems
                        .filter(({type}) => type === slug)
                        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
                        .map((item, key) => (
                            <TransactionItemComponent
                                key={key}
                                SVGIMG_EDIT={"/edit.svg"}
                                SVGIMG_PLUS={"/plus.svg"}
                                deleteExpense={() => {
                                    setIsTransactionOpen({status: false, data: null})
                                    startTransition(() => {
                                        deleteTransaction(item.id as string).then(() =>
                                            fetchTransactions()
                                        )
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
                            addTransactionItem(formData)
                                .then((response) => {
                                    setTransactionItems([...transactionItems, response])
                                })
                                .then(() => fetchTransactions())
                            e.currentTarget.reset()
                        })
                    }}
                    type={slug}
                />

                <FormModalEditTransactionComponent
                    amount={isEditModalOpen.data?.amount as number}
                    isModalOpen={isEditModalOpen.status}
                    onClose={() => setIsEditModalOpen({data: null, status: false})}
                    onSubmit={(e) => {
                        setIsEditModalOpen({data: null, status: false})
                        startTransition(() => {
                            const formData = new FormData(e.target as HTMLFormElement)
                            updateTransactionItem(formData, isEditModalOpen.data?.id ?? "")
                                .then((response) => {
                                    if (typeof response !== "string") {
                                        const {id} = response
                                        const expensesFilter = transactionItems.filter((item) => id != item.id)
                                        setTransactionItems(expensesFilter)
                                    }
                                })
                                .then(() => {
                                    fetchTransactions()
                                })
                            e.currentTarget.reset()
                        })
                    }}
                />

                <AddTransactionButton isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>

            {/* Desktop */}
            <div className="bg-white w-full h-full max-sm:hidden">
                {transactionItems
                    .filter(({type}) => type === slug)
                    .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
                    .map((item, key) => (
                        <TransactionItemComponent
                            key={key}
                            SVGIMG_EDIT={"/edit.svg"}
                            SVGIMG_PLUS={"/plus.svg"}
                            deleteExpense={() => {
                                setIsTransactionOpen({status: false, data: null})
                                startTransition(() => {
                                    deleteTransaction(item.id as string).then(() =>
                                        fetchTransactions()
                                    )
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

export default memo(PageTransaction)
