export default function WalletScreen({params}: any) {
    return (
        <div className="flex flex-col h-full items-center p-10">
            <button className="transition-all active:rotate-180 flex items-center justify-center border rounded-md w-64 h-40 bg-gradient-to-br from-gray-400 to-gray-200">
                <p className="font-thin text-6xl text-white drop-shadow-lg">+</p>
            </button>
        </div>
    )
}
