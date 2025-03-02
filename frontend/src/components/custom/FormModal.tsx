import {FormEvent} from "react"
import Image from "next/image"

export interface FormModalProps {
    isModalOpen: boolean
    setIsModalOpen?: (param: boolean) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onClose: () => void
    children?: React.ReactNode
}

export default function FormModal({isModalOpen, onSubmit, setIsModalOpen, onClose, children}: FormModalProps) {
    return (
        <div
            className={`transition-all  w-dvw h-full z-60 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center bottom-0 ${
                isModalOpen ? "bg-[#0003] h-dvh bottom-0 " : "bg-[#0000] pointer-events-none h-0 "
            }`}
        >
            <form
                method="post"
                className={`transition-all flex flex-col w-[90%] rounded-md gap-2 shadow-2xl bg-white px-10 pt-1 pb-5 ${
                    isModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } `}
                onSubmit={(e) => {
                    e.preventDefault()
                    setIsModalOpen ? setIsModalOpen(false) : ""
                    onSubmit(e)
                }}
            >
                <div
                    className="absolute top-[-2px] right-[-2px] w-8 h-8 p-1 bg-red-400 rounded flex items-center justify-center"
                    onClick={onClose}
                >
                    <Image alt="delete button" src={"/plus.svg"} className={"rotate-45"} width={20} height={20} />
                </div>
                {children}
            </form>
        </div>
    )
}
