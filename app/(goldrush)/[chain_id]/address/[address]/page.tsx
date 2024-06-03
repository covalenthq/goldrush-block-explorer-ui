"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import {
    AddressCard,
    AddressDetails,
    AddressTransactions,
} from "@covalenthq/goldrush-kit";
import Link from "next/link";

const AddressPage: React.FC<AddressPageProps> = ({
    params: { address, chain_id },
}) => {
    return (
        <main className="gbk-flex gbk-flex-col gbk-gap-4">
            <AddressCard address={address} />

            <AddressDetails address={address} chain_name={chain_id} />

            <AddressTransactions
                address={address}
                chain_name={chain_id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_transaction={(tx_hash) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/transaction/${tx_hash}`,
                        className: "hover:underline",
                    },
                })}
            />
        </main>
    );
};

export default AddressPage;
