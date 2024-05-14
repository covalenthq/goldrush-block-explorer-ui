import { type Chain } from "@covalenthq/client-sdk";

export interface GRKKitType {
    theme: unknown;
    brand: {
        title: string;
        subtitle: string;
        logo_url: string;
    };
    chains: Chain[];
}
