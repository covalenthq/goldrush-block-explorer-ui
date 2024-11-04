"use client";

import { type TransactionPageProps } from "@/utils/types/pages.types";
import { redirect } from "next/navigation";

const TransactionPage: React.FC<TransactionPageProps> = ({
    params: { tx_hash, chain_id },
}) => {
    redirect(`/${chain_id}/transaction/${tx_hash}/receipt`);
};

export default TransactionPage;
