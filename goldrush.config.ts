import { type GRKKitType } from "./utils/types/shared.types";

export const GRKKit: GRKKitType = {
    brand: {
        title: "GoldRush",
        subtitle: "Block Explorer",
        logo_url: "",
    },
    theme: {
        borderRadius: 8,
        colors: {
            dark: {
                primary: "#F7CD60",
                background: "#0F172A",
                foreground: "#FFFFFF",
                secondary: "#B3B3B3",
            },
            light: {
                primary: "#EA46CB",
                background: "#F8F8F8",
                foreground: "#090909",
                secondary: "#94A3B8",
            },
        },
        mode: "dark",
    },
    chains: ["eth-mainnet", "matic-mainnet"],
};

export default GRKKit;
