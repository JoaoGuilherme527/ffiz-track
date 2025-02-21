"use client"

import {memo, useState, useTransition} from "react"
import {addTransactionItem, deleteTransaction, updateTransactionItem} from "@/src/data/actions/auth-actions"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {TransactionItem} from "@/src/types/types"
import TransactionItemComponent from "@/src/app/dashboard/components/TransactionItem"
import TotalAmountLabelComponent from "@/src/app/dashboard/components/TotalAmountLabel"
import Loading from "../../loading"
import AddTransactionButton from "@/src/app/dashboard/components/AddTransactionButton"
import FormModalAddTransactionComponent from "@/src/app/dashboard/components/FormModalAddTransaction"
import FormModalEditTransactionComponent from "../components/FormModalEditTransaction"

function ExpenseRoute() {
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
    const [currentAmount, setCurrentAmount] = useState(0)
    const [pending, startTransition] = useTransition()

    return (
        <div className="flex flex-col items-center justify-center h-full bg-[var(--light-green)] overflow-hidden">
            {pending ? <Loading /> : <></>}
            <TotalAmountLabelComponent type="expense" amount={currentAmount} />
            <div className="z-20 w-full h-[65%] px-10 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-40 ">
                {transactionItems
                    .filter(({type}) => type === "expense")
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
                                        fetchTransactions().then(({sumExpenses}) => setCurrentAmount(sumExpenses))
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
                        addTransactionItem(formData).then((response) => {
                            setTransactionItems([...transactionItems, response])
                        })
                        e.currentTarget.reset()
                    })
                }}
                type="expense"
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

export default memo(ExpenseRoute)
