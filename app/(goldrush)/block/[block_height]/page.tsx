"use client";

import { ChainsLoading } from "@/components/shared";
import { type BlockPageProps } from "@/utils/types/pages.types";
import { BlockDetails, BlockTransactions } from "@covalenthq/goldrush-kit";

const BlockPage: React.FC<BlockPageProps> = ({
    params: { block_height },
    searchParams: { chain_name },
}) => {
    if (!chain_name) {
        return <ChainsLoading />;
    }

    return (
        <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
            <BlockDetails height={+block_height} chain_name={chain_name} />

            <BlockTransactions
                block_height={+block_height}
                chain_name={chain_name}
            />
        </main>
    );
};

export default BlockPage;
