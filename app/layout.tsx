import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientGoldRushProvider } from "@/utils/store";
import { type LayoutProps } from "@/.next/types/app/layout";
import "@covalenthq/goldrush-kit/styles.css";
import { Navbar } from "../components/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GoldRush Block Explorer",
    description: "GoldRush Block Explorer",
};

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientGoldRushProvider>
                    <Navbar />
                    {children}
                </ClientGoldRushProvider>
            </body>
        </html>
    );
};

export default RootLayout;
