"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import { AddressActivityList } from "@covalenthq/goldrush-kit";

const AddressActivityPage: React.FC<AddressPageProps> = ({
    params: { address },
}) => {
    return <AddressActivityList address={address} changeSelectedChain />;
};

export default AddressActivityPage;
