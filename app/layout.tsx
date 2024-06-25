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
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/site/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/site/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/site/favicon-16x16.png"
            />
            <link rel="manifest" href="/site/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/site/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#FF4C8B" />
            <meta
                name="msapplication-config"
                content="/site/browserconfig.xml"
            />
            <meta name="theme-color" content="#FFFFFF" />
            <body
                className={`${inter.className} gbk-relative gbk-flex gbk-min-h-screen gbk-w-full gbk-flex-col gbk-justify-between`}
            >
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
