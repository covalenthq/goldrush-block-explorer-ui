"use client";

import { AddressCard, AddressDetails } from "@covalenthq/goldrush-kit";
import { type AddressLayoutProps } from "@/utils/types/pages.types";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const AddressLayout: React.FC<AddressLayoutProps> = ({
    children,
    params: { address, chain_id },
}) => {
    const path = usePathname().split("/").slice(-1)[0];

    const routes = useMemo<
        {
            children: React.ReactNode;
            href: string;
        }[]
    >(
        () => [
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
        ],
        []
    );

    return (
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <AddressCard address={address} avatar={{}} />

            <AddressDetails address={address} chain_name={chain_id} />

            <nav className="flex gap-4 gbk-my-4">
                {routes.map(({ children, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`gbk-transition-all hover:gbk-underline ${
                            path === href
                                ? "text-primary-light dark:text-primary-dark gbk-underline"
                                : "text-secondary-light dark:text-secondary-dark"
                        }`}
                    >
                        {children}
                    </Link>
                ))}
            </nav>

            {children}
        </main>
    );
};

export default AddressLayout;
