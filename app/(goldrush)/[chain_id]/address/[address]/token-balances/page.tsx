"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import { TokenBalancesList } from "@covalenthq/goldrush-kit";
import kit from "@/goldrush.config";
import { type Chain } from "@covalenthq/client-sdk";
import Link from "next/link";

const AddressTokenBalancesPage: React.FC<AddressPageProps> = ({
    params: { address, chain_id },
}) => {
    return (
        <TokenBalancesList
            address={address}
            chain_names={kit.chains as Chain[]}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            actionable_token={(address) => ({
                parent: Link,
                parentProps: {
                    href: `/${chain_id}/address/${address}`,
                    className: "hover:underline",
                },
            })}
        />
    );
};

export default AddressTokenBalancesPage;
