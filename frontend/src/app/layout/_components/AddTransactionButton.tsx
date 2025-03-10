import Image from "next/image"

interface AddTransactionButtonProps {
    isModalOpen: boolean
    setIsModalOpen: (param: boolean) => void
}

export default function AddTransactionButton({isModalOpen, setIsModalOpen}: AddTransactionButtonProps) {
    return (
        <div
            className={`z-40 absolute bottom-[20px] left-[50%] translate-x-[-50%] rounded-full bg-green-700 shadow-lg w-14 h-14 justify-center items-center flex text-white active:scale-[0.7] transition-all ${
                isModalOpen ? "rotate-2 bg-red-300" : "rotate-0"
            }`}
            onClick={() => setIsModalOpen(!isModalOpen)}
        >
            <Image alt="add button" src={"/plus.svg"} className={`${isModalOpen ? "rotate-45" : "rotate-0"}`} width={30} height={30} />
        </div>
    )
}
