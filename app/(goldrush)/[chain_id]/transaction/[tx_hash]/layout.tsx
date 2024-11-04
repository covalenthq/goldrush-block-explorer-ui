"use client";

import { SubNav } from "@/components/shared";
import { type TransactionLayoutProps } from "@/utils/types/pages.types";
import { TransactionDetails } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const TransactionLayout: React.FC<TransactionLayoutProps> = ({
    children,
    params: { tx_hash, chain_id },
}) => {
    const routes: {
        children: React.ReactNode;
        href: string;
    }[] = [
        {
            children: "Receipt",
            href: "receipt",
        },
        {
            children: "Raw Logs",
            href: "raw-logs",
        },
    ];

    return (
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <TransactionDetails
                chain_name={chain_id}
                tx_hash={tx_hash}
                actionable_from={(from_address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${from_address}`,
                        className: "hover:gbk-underline",
                    },
                })}
                actionable_to={(to_address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${to_address}`,
                        className: "hover:gbk-underline",
                    },
                })}
                actionable_block={(block_height) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/block/${block_height}`,
                        className: "hover:gbk-underline",
                    },
                })}
            />

            <SubNav routes={routes} />

            {children}
        </main>
    );
};

export default TransactionLayout;
