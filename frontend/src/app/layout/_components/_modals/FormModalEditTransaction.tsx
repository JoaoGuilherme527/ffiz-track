import {FormEvent} from "react"
import {formatUSDtoBRL} from "@/src/lib/utils"
import Image from "next/image"
import {Input} from "@/src/components/ui/input"
import FormModal, {FormModalProps} from "@/src/components/forms/FormModal"
import {TransactionItem} from "@/src/types/types"

//"name", "amount", "transactionDate", "type", "category", "frequency"

export default function FormModalEditTransactionComponent({
    onClose,
    onSubmit,
    isModalOpen,
    amount,
    name,
    frequency,
    transactionDate,
    type,
    category,
    setIsModalOpen,
}: TransactionItem & FormModalProps) {
    return (
        <FormModal isModalOpen={isModalOpen} onClose={onClose} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen}>
            <div className="flex flex-col gap-2 ">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">Name: {name}</label>
                <Input id="name" name="name" type="text" placeholder={name} />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                    Current amount: {formatUSDtoBRL(amount as number)}
                </label>
                <Input required id="amount" name="amount" type="number" placeholder={formatUSDtoBRL(amount as number)} step={"0.01"} />
            </div>
            <div className="w-full flex justify-center">
                <div className="text-sm text-white py-2 px-10 rounded font-bold bg-green-700">
                    <button type="submit">Update Expense</button>
                </div>
            </div>
        </FormModal>
    )
}
