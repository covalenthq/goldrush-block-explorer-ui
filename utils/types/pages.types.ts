import { type Chain } from "@covalenthq/client-sdk";

export interface HomePageProps {
    params: {
        chain_id: Chain;
    };
}

export interface AddressPageProps {
    params: {
        address: string;
        chain_id: Chain;
    };
}

export interface BlockPageProps {
    params: {
        block_height: string;
        chain_id: Chain;
    };
}

export interface TransactionPageProps {
    params: {
        tx_hash: string;
        chain_id: Chain;
    };
}
