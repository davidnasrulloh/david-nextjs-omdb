import type { Metadata } from "next";
import "./globals.css";
import ProviderQueryClient from "@/providers/ProviderQueryClient";

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
            <body className="font-aceSans">
                <ProviderQueryClient>{children}</ProviderQueryClient>
            </body>
        </html>
    );
}
