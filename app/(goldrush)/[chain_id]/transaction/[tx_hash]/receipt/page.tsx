"use client";

import { type TransactionPageProps } from "@/utils/types/pages.types";
import { TransactionReceipt } from "@covalenthq/goldrush-kit";

const TransactionReceiptPage: React.FC<TransactionPageProps> = ({
    params: { tx_hash, chain_id },
}) => {
    return <TransactionReceipt chain_name={chain_id} tx_hash={tx_hash} />;
};

export default TransactionReceiptPage;
