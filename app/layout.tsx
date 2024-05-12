import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@covalenthq/goldrush-kit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GoldRush Block Explorer",
    description: "GoldRush Block Explorer",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${inter.className} gbk-relative gbk-flex gbk-min-h-screen gbk-w-full gbk-flex-col gbk-justify-between`}
            >
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
