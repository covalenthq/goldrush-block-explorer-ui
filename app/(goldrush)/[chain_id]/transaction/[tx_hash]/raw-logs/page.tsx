"use client";

import { type TransactionPageProps } from "@/utils/types/pages.types";
import { TransactionRawLogs } from "@covalenthq/goldrush-kit";

const TransactionRawLogsPage: React.FC<TransactionPageProps> = ({
    params: { tx_hash, chain_id },
}) => {
    return <TransactionRawLogs chain_name={chain_id} tx_hash={tx_hash} />;
};

export default TransactionRawLogsPage;
