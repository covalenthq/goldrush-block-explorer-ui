import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientGoldRushProvider } from "@/utils/store";
import { type LayoutProps } from "@/.next/types/app/layout";
import "@covalenthq/goldrush-kit/styles.css";
import { Footer, Navbar } from "../components/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GoldRush Block Explorer",
    description: "GoldRush Block Explorer",
};

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${inter.className} gbk-relative gbk-flex gbk-min-h-screen gbk-w-full gbk-flex-col gbk-justify-between`}
            >
                <ClientGoldRushProvider>
                    <Navbar />
                    <section className="gbk-flex-1 gbk-p-8">{children}</section>
                    <Footer />
                </ClientGoldRushProvider>
            </body>
        </html>
    );
};

export default RootLayout;
