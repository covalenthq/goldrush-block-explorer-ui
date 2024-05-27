import { type Chain, type ChainID } from "@covalenthq/client-sdk";

export interface GoldRushConfig {
    theme: unknown;
    brand: {
        title: string;
        subtitle: string;
        logo_url: string;
    };
    chains: (Chain | ChainID)[];
}
