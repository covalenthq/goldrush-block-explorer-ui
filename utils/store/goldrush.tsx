"use client";

import { useEffect, useState } from "react";
import { GoldRushProvider } from "@covalenthq/goldrush-kit";
import kit from "@/goldrush.config";

export const ClientGoldRushProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
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
            {children}
        </GoldRushProvider>
    );
};
