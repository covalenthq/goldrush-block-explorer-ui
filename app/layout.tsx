import "./globals.css";
import { goldrushConfig } from "@/goldrush.config";
import "@covalenthq/goldrush-kit/styles.css";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
                color={goldrushConfig.theme.colors?.light?.primary || "#00D8D5"}
            />
            <meta
                name="msapplication-TileColor"
                content={
                    goldrushConfig.theme.colors?.dark?.primary || "#FF4C8B"
                }
            />
            <meta
                name="msapplication-config"
                content="/site/browserconfig.xml"
            />
            <meta
                name="theme-color"
                content={
                    goldrushConfig.theme.colors?.light?.foreground || "#FFFFFF"
                }
            />

            {goldrushConfig.gtag_id && (
                <GoogleTagManager gtmId={goldrushConfig.gtag_id} />
            )}

            <body
                className={`${inter.className} gbk-relative gbk-flex gbk-min-h-screen gbk-w-full gbk-flex-col gbk-justify-between`}
            >
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
