import { type Chain } from "@covalenthq/client-sdk";

export interface HomePageProps {
    params: {
        chain_id: Chain;
    };
}

export interface AddressLayoutProps {
    children: React.ReactNode;
    params: {
        address: string;
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

export interface BlocksPageProps {
    params: {
        chain_id: Chain;
    };
}

export interface TransactionLayoutProps {
    children: React.ReactNode;
    params: {
        tx_hash: string;
        chain_id: Chain;
    };
}

export interface TransactionPageProps {
    params: {
        tx_hash: string;
        chain_id: Chain;
    };
}

export interface TransactionsPageProps {
    params: {
        tx_hash: string;
        chain_id: Chain;
    };
}
