"use client";

import { type TransactionPageProps } from "@/utils/types/pages.types";
import { type Chain } from "@covalenthq/client-sdk";
import { TransactionReceiptView } from "@covalenthq/goldrush-kit";

const TransactionPage: React.FC<TransactionPageProps> = ({
    params: { tx_hash },
    searchParams: { chain_name },
}) => {
    return (
        <main className="mx-auto w-11/12 p-10">
            <TransactionReceiptView
                chain_name={chain_name as Chain}
                tx_hash={tx_hash}
            />

            <a
                href="https://etherscan.io/tx/0xe930f96c5f7b65f7e3f06fc8ccada03268fbd1afc0f69868fdbd20c49590c422"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 block text-center underline"
            >
                Reference to Etherscan
            </a>
        </main>
    );
};

export default TransactionPage;
