"use client";

import { MissingChain } from "@/components/shared";
import { type BlockPageProps } from "@/utils/types/pages.types";
import { type Chain } from "@covalenthq/client-sdk";
import { BlockDetails } from "@covalenthq/goldrush-kit";

const BlockPage: React.FC<BlockPageProps> = ({
    params: { block_height },
    searchParams: { chain_name },
}) => {
    if (!chain_name) {
        return <MissingChain />;
    }

    return (
        <main className="mx-auto w-11/12 p-10">
            <BlockDetails
                chain_name={chain_name as Chain}
                height={+block_height}
            />

            <a
                href="https://etherscan.io/block/19575675"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 block text-center underline"
            >
                Reference to Etherscan
            </a>
        </main>
    );
};

export default BlockPage;
