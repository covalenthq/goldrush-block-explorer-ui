"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import { NFTCollectionTokensList } from "@covalenthq/goldrush-kit";
import Link from "next/link";

const AddressNFTCollectionPage: React.FC<AddressPageProps> = ({
    params: { address, chain_id },
}) => {
    return (
        <NFTCollectionTokensList
            collection_address={address}
            chain_name={chain_id}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            actionable_contract={(address) => ({
                parent: Link,
                parentProps: {
                    href: `/${chain_id}/address/${address}`,
                    className: "hover:gbk-underline",
                },
            })}
        />
    );
};

export default AddressNFTCollectionPage;
