export interface AddressPageProps {
    params: {
        address: string;
    };
    searchParams: {
        chain_name: string;
    };
}

export interface BlockPageProps {
    params: {
        block_height: string;
    };
    searchParams: {
        chain_name: string;
    };
}

export interface TransactionPageProps {
    params: {
        tx_hash: string;
    };
    searchParams: {
        chain_name: string;
    };
}
