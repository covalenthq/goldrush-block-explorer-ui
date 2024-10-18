"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import { AddressTransactions } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const AddressTransactionsPage: React.FC<AddressPageProps> = ({
    params: { address, chain_id },
}) => {
    return (
        <AddressTransactions
            address={address}
            chain_name={chain_id}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            actionable_address={(address) => ({
                parent: Link,
                parentProps: {
                    href: `/${chain_id}/address/${address}`,
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            actionable_transaction={(tx_hash) => ({
                parent: Link,
                parentProps: {
                    href: `/${chain_id}/transaction/${tx_hash}`,
                    className: "hover:gbk-underline",
                },
            })}
        />
    );
};

export default AddressTransactionsPage;
