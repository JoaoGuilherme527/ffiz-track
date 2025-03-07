import {FormEvent} from "react"
import {formatUSDtoBRL} from "@/src/lib/utils"
import Image from "next/image"
import {Input} from "@/src/components/ui/input"
import FormModal, {FormModalProps} from "@/src/components/forms/FormModal"

export default function FormModalEditTransactionComponent({
    onClose,
    onSubmit,
    isModalOpen,
    amount,
    setIsModalOpen,
}: {amount: number} & FormModalProps) {
    return (
        <FormModal isModalOpen={isModalOpen} onClose={onClose} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen}>
            <div className="flex flex-col gap-5 py-5">
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
