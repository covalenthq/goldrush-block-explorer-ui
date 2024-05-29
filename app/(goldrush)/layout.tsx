"use client";

import { GoldRushProvider } from "@covalenthq/goldrush-kit";
import { Footer, Navbar } from "@/components/shared";
import { useEffect, useState } from "react";
import kit from "@/goldrush.config";

const GoldRushLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isWindowDefined, setIsWindowDefined] = useState<boolean>(
        typeof window !== "undefined"
    );

    useEffect(() => {
        setIsWindowDefined(typeof window !== "undefined");
    }, []);

    if (!isWindowDefined) {
        return null;
    }

    return (
        <GoldRushProvider
            apikey={process.env.NEXT_PUBLIC_COVALENT_API_KEY as string}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newTheme={kit.theme}
        >
            <Navbar />
            <section className="gbk-flex-1 gbk-p-8">{children}</section>
            <Footer />
        </GoldRushProvider>
    );
};

export default GoldRushLayout;
