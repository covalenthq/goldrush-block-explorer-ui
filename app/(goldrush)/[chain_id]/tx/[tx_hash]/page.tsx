"use client";

import { type TransactionPageProps } from "@/utils/types/pages.types";
import {
    TransactionDetails,
    TransactionReceipt,
} from "@covalenthq/goldrush-kit";

const TransactionPage: React.FC<TransactionPageProps> = ({
    params: { tx_hash, chain_id },
}) => {
    return (
        <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
            <TransactionDetails chain_name={chain_id} tx_hash={tx_hash} />
            <TransactionReceipt chain_name={chain_id} tx_hash={tx_hash} />
        </main>
    );
};

export default TransactionPage;
