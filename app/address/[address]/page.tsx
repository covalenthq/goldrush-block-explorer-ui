"use client";

import { MissingChain } from "@/components/shared";
import { type AddressPageProps } from "@/utils/types/pages.types";
import { type Chain } from "@covalenthq/client-sdk";
import {
    AddressDetailsView,
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
                <main className="mx-auto w-11/12 p-10">
                    <AddressDetailsView
                        address={address}
                        chain_name={chain_name as Chain}
                        show_chain_selector={false}
                    />

                    <AddressTransactions
                        address={address}
                        chain_name={chain_name as Chain}
                    />

                    <a
                        href="https://etherscan.io/address/0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 block text-center underline"
                    >
                        Reference to Etherscan
                    </a>
                </main>
            )}
        </Suspense>
    );
};

export default AddressPage;
