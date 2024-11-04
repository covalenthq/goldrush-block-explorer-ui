"use client";

import { type BlocksPageProps } from "@/utils/types/pages.types";
import { BlocksList } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const BlocksPage: React.FC<BlocksPageProps> = ({ params: { chain_id } }) => {
    return (
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <BlocksList
                chain_name={chain_id}
                actionable_block={(block) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/block/${block}`,
                        className: "hover:gbk-underline",
                    },
                })}
            />
        </main>
    );
};

export default BlocksPage;
