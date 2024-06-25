import { type Chain, type ChainID } from "@covalenthq/client-sdk";
import { type GoldRushThemeType } from "@covalenthq/goldrush-kit";

export interface GoldRushConfig {
    theme: Partial<GoldRushThemeType>;
    brand: {
        title: string;
        subtitle: string;
        logo_url: string;
    };
    chains: (Chain | ChainID)[];
    gtag_id?: string | null;
}
