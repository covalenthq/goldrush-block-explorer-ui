"use client";

import { type AddressPageProps } from "@/utils/types/pages.types";
import {
    AddressCard,
    AddressDetails,
    AddressTransactions,
} from "@covalenthq/goldrush-kit";

const AddressPage: React.FC<AddressPageProps> = ({
    params: { address, chain_id },
}) => {
    return (
        <main className="gbk-mx-auto gbk-flex gbk-w-11/12 gbk-flex-col gbk-gap-4 gbk-p-10">
            <AddressCard address={address} />

            <AddressDetails address={address} chain_name={chain_id} />

            <AddressTransactions address={address} chain_name={chain_id} />
        </main>
    );
};

export default AddressPage;
