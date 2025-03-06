import Image from "next/image"

export default function AuthLayout({children}: {readonly children: React.ReactNode}) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="z-10 w-full h-dvh bg-gray-100 md:bg-linear-to-r from-gray-800 from-50% to-gray-white to-50%">
                <Image
                    src={"/logo_white.png"}
                    style={{
                        position: "absolute",
                        left: "180px",
                        top: "160px",
                        width: "calc(100vw - 50% - 400px)",
                        height: "calc(100vh - 360px)",
                        opacity: 0.1,
                    }}
                    width={1000}
                    height={1000}
                    alt=""
                />
                {children}
            </div>
        </div>
    )
}
