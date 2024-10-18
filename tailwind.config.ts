import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "gbk-",
    theme: {
        extend: {
            width: {
                104: "26rem",
                124: "31rem",
            },
        },
    },
    plugins: [],
};
export default config;
