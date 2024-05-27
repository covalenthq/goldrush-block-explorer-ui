"use client";

import { type BlockPageProps } from "@/utils/types/pages.types";
import { BlockDetails, BlockTransactions } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const BlockPage: React.FC<BlockPageProps> = ({
    params: { block_height, chain_id },
}) => {
    return (
        <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
            <BlockDetails height={+block_height} chain_name={chain_id} />

            <BlockTransactions
                block_height={+block_height}
                chain_name={chain_id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                actionable_transaction={(tx_hash) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/transaction/${tx_hash}`,
                        className: "hover:underline",
                    },
                })}
            />
        </main>
    );
};

export default BlockPage;
