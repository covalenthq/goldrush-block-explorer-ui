"use client";

import { type TransactionsPageProps } from "@/utils/types/pages.types";
import { TransactionsList } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const TransactionsPage: React.FC<TransactionsPageProps> = ({
    params: { chain_id },
}) => {
    return (
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <TransactionsList
                chain_name={chain_id}
                actionable_address={(address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${address}`,
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
                actionable_transaction={(tx_hash) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/transaction/${tx_hash}`,
                        className: "hover:gbk-underline",
                    },
                })}
            />
        </main>
    );
};

export default TransactionsPage;
