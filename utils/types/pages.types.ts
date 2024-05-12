import { type Chain } from "@covalenthq/client-sdk";

export interface AddressPageProps {
    params: {
        address: string;
    };
    searchParams: {
        chain_name: Chain;
    };
}

export interface BlockPageProps {
    params: {
        block_height: string;
    };
    searchParams: {
        chain_name: Chain;
    };
}

export interface TransactionPageProps {
    params: {
        tx_hash: string;
    };
    searchParams: {
        chain_name: Chain;
    };
}
