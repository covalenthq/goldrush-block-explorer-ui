import { type GoldRushConfig } from "./utils/types/shared.types";

export const goldrushConfig: GoldRushConfig = {
    brand: {
        title: "GoldRush",
        subtitle: "Block Explorer",
        logo_url: "/goldrush-logo.png",
    },
    theme: {
        borderRadius: 8,
        colors: {
            dark: {
                primary: "#FF4C8B",
                background: "#000426",
                foreground: "#FFFFFF",
                secondary: "#868E96",
            },
            light: {
                primary: "#00D8D5",
                background: "#FFFFFF",
                foreground: "#1C2024",
                secondary: "#868E96",
            },
        },
        mode: "dark",
    },
    chains: [],
    gtag_id: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? null,
};
