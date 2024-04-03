"use client";

import { GoldRushProvider } from "@covalenthq/goldrush-kit";

export const ClientGoldRushProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <GoldRushProvider
            apikey={process.env.NEXT_PUBLIC_COVALENT_API_KEY as string}
        >
            {children}
        </GoldRushProvider>
    );
};
