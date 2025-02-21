/* eslint-disable @typescript-eslint/no-unused-vars */
// import Navbar from "@/src/components/custom/Navbar";

"use client"

import TransactionItemComponent from "@/src/app/dashboard/components/TransactionItem"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {useState, useTransition} from "react"
import {TransactionItem} from "@/src/types/types"
import {addTransactionItem, deleteTransaction, updateTransactionItem} from "@/src/data/actions/auth-actions"
import Loading from "../../loading"
import TotalAmountLabelComponent from "@/src/app/dashboard/components/TotalAmountLabel"
import AddTransactionButton from "../components/AddTransactionButton"
import FormModalAddTransactionComponent from "../components/FormModalAddTransaction"
import FormModalEditTransactionComponent from "../components/FormModalEditTransaction"

export default function ProfitsRoute() {
    const {fetchTransactions, transactionItems, currentProfits, setTransactionItems} = useGlobalContext()
    const [isEditTransactionOpen, setIsTransactionOpen] = useState<{status: boolean; data: TransactionItem | null}>({
        status: false,
        data: null,
    })
    const [isEditModalOpen, setIsEditModalOpen] = useState<{status: boolean; data: TransactionItem | null}>({
        status: false,
        data: null,
    })
    const [pending, startTransition] = useTransition()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center h-full bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden">
            {pending ? <Loading /> : <></>}
            <TotalAmountLabelComponent type="profit" />

            <div className="z-20 w-full h-[65%] px-10 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-40 ">
                {transactionItems
                    .filter(({type}) => type === "profit")
                    .map((item, key) => (
                        <TransactionItemComponent
                            key={key}
                            SVGIMG_EDIT={"/edit.svg"}
                            SVGIMG_PLUS={"/plus.svg"}
                            deleteExpense={() => {
                                setIsEditModalOpen({status: false, data: null})
                                startTransition(() => {
                                    deleteTransaction(item.id as string).then(() => fetchTransactions())
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
                type="profit"
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
    )
}
