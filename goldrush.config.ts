import { type GoldRushConfig } from "./utils/types/shared.types";

export const goldrushConfig: GoldRushConfig = {
    brand: {
        title: "GoldRush",
        subtitle: "Block Explorer",
        logo_url: "",
    },
    theme: {
        borderRadius: 8,
        colors: {
            dark: {
                primary: "#EA46CB",
                background: "#0F172A",
                foreground: "#FFFFFF",
                secondary: "#B3B3B3",
            },
            light: {
                primary: "#EA46CB",
                background: "#F8F8F8",
                foreground: "#090909",
                secondary: "#A4A3B8",
            },
        },
        mode: "dark",
    },
    chains: [1, "matic-mainnet"],
};

export default goldrushConfig;
