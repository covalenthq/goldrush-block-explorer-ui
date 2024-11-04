"use client";

import { SubNav } from "@/components/shared";
import { type AddressLayoutProps } from "@/utils/types/pages.types";
import { AddressCard, AddressDetails } from "@covalenthq/goldrush-kit";

const AddressLayout: React.FC<AddressLayoutProps> = ({
    children,
    params: { address, chain_id },
}) => {
    const routes: {
        children: React.ReactNode;
        href: string;
    }[] = [
        {
            children: "Transactions",
            href: "transactions",
        },
        {
            children: "Activity",
            href: "activity",
        },
        {
            children: "Token Balances",
            href: "token-balances",
        },
        {
            children: "NFT Balances",
            href: "nft-balances",
        },
        {
            children: "NFT Collection",
            href: "nft-collection",
        },
    ];

    return (
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <AddressCard address={address} avatar={{}} />

            <AddressDetails address={address} chain_name={chain_id} />

            <SubNav routes={routes} />

            {children}
        </main>
    );
};

export default AddressLayout;
