import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ProviderQueryClient from "@/hooks/ProviderQueryClient";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Olympic - David",
    description: "Techincal Test",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ProviderQueryClient>{children}</ProviderQueryClient>
            </body>
        </html>
    );
}
