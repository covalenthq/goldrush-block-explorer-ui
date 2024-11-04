import { type Chain } from "@covalenthq/client-sdk";
import { type GoldRushThemeType } from "@covalenthq/goldrush-kit";

export interface GoldRushConfig {
    theme: Partial<GoldRushThemeType>;
    brand: {
        title: string;
        subtitle: string;
        logo_url: string;
    };
    chains: Chain[];
    gtag_id?: string | null;
}

export interface SubNavProps {
    routes: {
        children: React.ReactNode;
        href: string;
    }[];
}
