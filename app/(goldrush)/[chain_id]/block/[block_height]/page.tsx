"use client";

import { type BlockPageProps } from "@/utils/types/pages.types";
import { BlockDetails } from "@covalenthq/goldrush-kit";

const BlockPage: React.FC<BlockPageProps> = ({
    params: { block_height, chain_id },
}) => {
    return (
        <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
            <BlockDetails height={+block_height} chain_name={chain_id} />

            {/* <BlockTransactions
                block_height={+block_height}
                chain_name={chain_id}
            /> */}
        </main>
    );
};

export default BlockPage;
