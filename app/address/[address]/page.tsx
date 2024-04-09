"use client";

import { MissingChain } from "@/components/shared";
import { type AddressPageProps } from "@/utils/types/pages.types";
import { type Chain } from "@covalenthq/client-sdk";
import { AddressDetailsView, TransactionsList } from "@covalenthq/goldrush-kit";

const AddressPage: React.FC<AddressPageProps> = ({
    params: { address },
    searchParams: { chain_name },
}) => {
    if (!chain_name) {
        return <MissingChain />;
    }

    return (
        <main className="mx-auto w-11/12 p-10">
            <AddressDetailsView
                address={address}
                chain_name={chain_name as Chain}
                show_chain_selector={false}
            />

            <TransactionsList
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
    );
};

export default AddressPage;
