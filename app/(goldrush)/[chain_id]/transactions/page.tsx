"use client";

import { type TransactionsPageProps } from "@/utils/types/pages.types";
import { TransactionsList } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const TransactionsPage: React.FC<TransactionsPageProps> = ({
    params: { chain_id },
}) => {
    return (
        <main>
            <TransactionsList
                chain_name={chain_id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_from={(from__address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${from__address}`,
                        className: "hover:underline",
                    },
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_to={(to__address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${to__address}`,
                        className: "hover:underline",
                    },
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_block={(block_height) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/block/${block_height}`,
                        className: "hover:underline",
                    },
                })}
            />
        </main>
    );
};

export default TransactionsPage;
