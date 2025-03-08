import {FormEvent} from "react"
import {formatTime, formatUSDtoBRL} from "@/src/lib/utils"
import Image from "next/image"
import {Input} from "@/src/components/ui/input"
import FormModal, {FormModalProps} from "@/src/components/forms/FormModal"
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
            <div className="flex flex-col gap-2 ">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">Name: {card?.name}</label>
                <Input id="name" name="name" type="text" placeholder={card?.name} />
            </div>
            <div className="flex flex-col gap-2 ">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                    Limit: {formatUSDtoBRL(card?.limit as number)}
                </label>
                <Input id="limit" name="limit" type="number" placeholder={formatUSDtoBRL(card?.limit as number)} step={"0.01"} />
            </div>
            <div className="flex flex-col gap-2 ">
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
            <div className="flex flex-col gap-2 ">
                <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                    Expiration date: {formatTime(card?.expirationDate).slice(0, 5)}
                </label>
                <Input id="expirationDate" name="expirationDate" type="date" placeholder={card?.expirationDate} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="color" className="text-sm text-gray-700 flex items-center gap-3">
                    Card color:
                </label>
                <Input id="color" defaultValue={card?.color} name="color" type="color" placeholder="color of your card" />
            </div>
            <div className="w-full flex gap-4 py-4 ">
                <div className="text-sm max-sm:text-xs items-center flex text-white py-2 px-5 rounded font-bold bg-red-700 flex-1 text-center">
                    <button type="button" onClick={() => onDelete()}>
                        Delete Card
                    </button>
                </div>
                <div className="text-sm md:text-xs items-center flex text-white py-2 px-5 rounded font-bold bg-green-700 flex-1 text-center">
                    <button type="submit">Update Card</button>
                </div>
                <div className="text-sm md:text-xs items-center flex text-white py-2 px-5 rounded font-bold bg-blue-700 flex-1 text-center">
                    <button type="submit">Invoice paid</button>
                </div>
            </div>
        </FormModal>
    )
}
