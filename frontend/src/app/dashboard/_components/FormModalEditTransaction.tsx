import {FormEvent} from "react"
import {formatUSDtoBRL} from "@/src/lib/utils"
import Image from "next/image"
import {Input} from "@/src/components/ui/input"

interface EditExpenseModalProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onClose: () => void
    isModalOpen: boolean
    amount: number
}

export default function FormModalEditTransactionComponent({onClose, onSubmit, isModalOpen, amount}: EditExpenseModalProps) {
    return (
        <div
            className={`transition-all w-dvw h-dvh  z-40 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center bottom-[0]  ${
                isModalOpen ? "bg-[#0003] " : "bg-[#0000] pointer-events-none"
            }`}
        >
            <form
                method="post"
                className={`relative transition-all flex flex-col gap-5 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-2 pb-5 ${
                    isModalOpen ? "translate-y-0 opacity-1" : "translate-y-full opacity-0"
                } `}
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(e)
                }}
            >
                <div className="flex flex-col gap-5">
                    <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                        Current amount: {formatUSDtoBRL(amount as number)}
                        <div className="w-8 h-8 p-1 bg-red-400 rounded flex items-center justify-center" onClick={onClose}>
                            <Image alt="delete button" src={"/plus.svg"} className={"rotate-45"} width={20} height={20} />
                        </div>
                    </label>
                    <Input required id="amount" name="amount" type="number" placeholder={formatUSDtoBRL(amount as number)} step={"0.01"} />
                </div>
                <div className="w-full flex justify-center">
                    <button type="submit" className="text-sm text-white py-2 px-10 rounded font-bold bg-[var(--dark-green)]">
                        Update Expense
                    </button>
                </div>
            </form>
        </div>
    )
}
