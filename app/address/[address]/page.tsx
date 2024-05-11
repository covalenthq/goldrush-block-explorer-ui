"use client";

import { MissingChain } from "@/components/shared";
import { type AddressPageProps } from "@/utils/types/pages.types";
import {
    AccountCard,
    AddressDetails,
    AddressTransactions,
} from "@covalenthq/goldrush-kit";
import { Suspense } from "react";

const AddressPage: React.FC<AddressPageProps> = ({
    params: { address },
    searchParams: { chain_name },
}) => {
    return (
        <Suspense>
            {!chain_name ? (
                <MissingChain />
            ) : (
                <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
                    <AccountCard address={address} />

                    <AddressDetails address={address} chain_name={chain_name} />

                    <AddressTransactions
                        address={address}
                        chain_name={chain_name}
                    />
                </main>
            )}
        </Suspense>
    );
};

export default AddressPage;
