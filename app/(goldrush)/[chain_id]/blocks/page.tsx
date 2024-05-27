"use client";

import { type BlocksPageProps } from "@/utils/types/pages.types";
import { BlocksList } from "@covalenthq/goldrush-kit";

const BlocksPage: React.FC<BlocksPageProps> = ({ params: { chain_id } }) => {
    return (
        <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
            <BlocksList chain_name={chain_id} />
        </main>
    );
};

export default BlocksPage;
