/* eslint-disable @typescript-eslint/no-unused-vars */
import type {Metadata} from "next"
import {Inter, Comfortaa} from "next/font/google"
import "./globals.css"
import {GlobalProvider} from "./providers/GlobalProvider"

const inter = Inter({
    subsets: ["latin"],
})

const test = Comfortaa({
    weight: "400",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "FFizTrack",
    description: "App para controle de gastos",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="png" href="%PUBLIC_URL%/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#001700" />
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.svg" />
                <meta name="viewport" content="width=device-width, user-scalable=no" />
            </head>
            <body className={`${test} antialiased`}>
                <GlobalProvider>{children}</GlobalProvider>
            </body>
        </html>
    )
}
