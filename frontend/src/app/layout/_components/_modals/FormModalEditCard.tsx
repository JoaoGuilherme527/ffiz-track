import {FormEvent} from "react"
import {formatUSDtoBRL} from "@/src/lib/utils"
import Image from "next/image"
import {Input} from "@/src/components/ui/input"
import FormModal, {FormModalProps} from "@/src/components/custom/FormModal"
import {CardItem} from "@/src/types/types"
import {deleteCard} from "@/src/data/actions/auth-actions"

export default function FormModalEditCard({
    onClose,
    onSubmit,
    isModalOpen,
    card,
    setIsModalOpen,
    onDelete,
}: {card: CardItem; onDelete: () => void} & FormModalProps) {
    return (
        <FormModal isModalOpen={isModalOpen} onClose={onClose} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen}>
            <div className="flex flex-col gap-5 py-5">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">Name: {card?.name}</label>
                <Input id="name" name="name" type="text" placeholder={card?.name} />
            </div>
            <div className="flex flex-col gap-5 py-5">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                    Limit: {formatUSDtoBRL(card?.limit as number)}
                </label>
                <Input id="limit" name="limit" type="number" placeholder={formatUSDtoBRL(card?.limit as number)} step={"0.01"} />
            </div>
            <div className="flex flex-col gap-5 py-5">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                    Available: {formatUSDtoBRL(card?.available as number)}
                </label>
                <Input
                    id="available"
                    name="available"
                    type="number"
                    placeholder={formatUSDtoBRL(card?.available as number)}
                    step={"0.01"}
                />
            </div>
            <div className="w-full flex justify-center gap-2">
                <div className="text-sm text-white py-2 px-5 rounded font-bold bg-red-700">
                    <button type="button" onClick={() => onDelete()}>
                        Delete Card
                    </button>
                </div>
                <div className="text-sm text-white py-2 px-5 rounded font-bold bg-green-700">
                    <button type="submit">Update Card</button>
                </div>
            </div>
        </FormModal>
    )
}
