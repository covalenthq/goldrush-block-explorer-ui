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
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <TransactionDetails
                chain_name={chain_id}
                tx_hash={tx_hash}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_from={(from_address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${from_address}`,
                        className: "hover:gbk-underline",
                    },
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_to={(to_address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${to_address}`,
                        className: "hover:gbk-underline",
                    },
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_block={(block_height) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/block/${block_height}`,
                        className: "hover:gbk-underline",
                    },
                })}
            />
            <TransactionReceipt
                chain_name={"eth-mainnet"}
                tx_hash={tx_hash}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_from={(from_address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${from_address}`,
                        className: "hover:gbk-underline",
                    },
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_to={(to_address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${to_address}`,
                        className: "hover:gbk-underline",
                    },
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_block={(block_height) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/block/${block_height}`,
                        className: "hover:gbk-underline",
                    },
                })}
            />
        </main>
    );
};

export default TransactionPage;
