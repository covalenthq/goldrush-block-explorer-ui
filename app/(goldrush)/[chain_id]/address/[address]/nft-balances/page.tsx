"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import {
    NFTWalletCollectionDetails,
    NFTWalletCollectionList,
} from "@covalenthq/goldrush-kit";
import Link from "next/link";

const AddressNFTBalancesPage: React.FC<AddressPageProps> = ({
    params: { address, chain_id },
}) => {
    return (
        <>
            <NFTWalletCollectionDetails
                address={address}
                chain_name={chain_id}
            />
            <NFTWalletCollectionList
                address={address}
                chain_name={chain_id}
                actionable_contract={(address) => ({
                    parent: Link,
                    parentProps: {
                        href: `/${chain_id}/address/${address}`,
                        className: "hover:gbk-underline",
                    },
                })}
            />
        </>
    );
};

export default AddressNFTBalancesPage;
