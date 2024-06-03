"use client";

import { type TransactionPageProps } from "@/utils/types/pages.types";
import {
    TransactionDetails,
    TransactionReceipt,
} from "@covalenthq/goldrush-kit";
import Link from "next/link";

const TransactionPage: React.FC<TransactionPageProps> = ({
    params: { tx_hash, chain_id },
}) => {
    return (
        <main className="gbk-flex gbk-flex-col gbk-gap-4">
            <TransactionDetails
                chain_name={chain_id}
                tx_hash={tx_hash}
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
            <TransactionReceipt
                chain_name={"eth-mainnet"}
                tx_hash={tx_hash}
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

export default TransactionPage;
