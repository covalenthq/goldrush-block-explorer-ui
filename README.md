<div align="center">
  <a href="https://goldrush.dev/products/goldrush/"  target="_blank" rel="noopener noreferrer">
    <img alt="GoldRush Block Explorer - powered by Covalent" src="./repo-static/goldrush-block-explorer-banner.png" style="max-width: 100%;"/>
  </a>
  <br />

[![GitHub license](https://img.shields.io/github/license/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/commits/master)
[![GitHub contributors](https://img.shields.io/github/contributors/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/pulls)
[![GitHub stars](https://img.shields.io/github/stars/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/covalenthq/goldrush-block-explorer-ui)](https://github.com/covalenthq/goldrush-block-explorer-ui/network/members)

</div>

<br/>

<h1 align="center">Beautifully designed Block Explorer template.</h1>

<div align="center">
Powered by <span><a href="https://github.com/covalenthq/goldrush-kit">GoldRush Kit.</a></span> Open-source. Customizable. 100+ Chains.
</div>

## Ready-to-use customizable template

<a href="https://goldrush-block-explorer-ui.vercel.app/">View live template</a>

## One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcovalenthq%2Fgoldrush-block-explorer-ui&env=NEXT_PUBLIC_GOLDRUSH_API_KEY&envDescription=Visit%20Covalent%20to%20sign%20up%20for%20an%20API%20key&envLink=https%3A%2F%2Fwww.covalenthq.com%2Fplatform%2Fauth%2Fregister%2F)

## Creating your own GoldRush Block Explorer

The GoldRush Block Explorer is a Template Repository. It can be cloned and modified as per different specific use cases.

1.  **Fork Repository**: Fork the repository either by clicking the `Use this template` at the top of the repository or clicking [here](https://github.com/new?owner=covalenthq&template_name=goldrush-block-explorer-ui&template_owner=covalenthq)

2.  **Setup**:

    1. Install package dependencies using `npm install`.

    2. Create [.env.local](./env.local) in your root directory and add your [GoldRush API Key](https://goldrush.dev/platform/apikey). Refer to [.env.example](./.env.example) for the a list of all the environmental variables used.

    > Only the `NEXT_PUBLIC_GOLDRUSH_API_KEY` environmental key is mandatory.

    ```
    NEXT_PUBLIC_GOLDRUSH_API_KEY = "<YOUR_API_KEY>"
    ```

    3. To run the development server, type the following into your terminal.

    ```
    npm run dev
    ```

3.  **Deployment**: Once forked, a use specific can be created. The **GoldRush Block Explorer** is powered on the frontend completely using NextJS. Natively, the it is deployed on [Vercel](https://vercel.com/), however any other deployment or server hosting tools such as Netlify, AWS, DigitalOcean can be used.

## Customizing the Deployment

The forked deployment can be customized for every deployment using the [GoldRush Config File](./goldrush.config.ts). The config file exports TypeScript powered const `goldrushConfig`. By default the config file will look like this

```ts
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
    gtag_id: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || null,
};
```

1. **brand**: This is the customization of the `nav` bar that is rendered at the top of every page. It looks this by default

    <img src="./repo-static/3.1.png">

    1. **title**: It is the first line of your brand. By default, it is set as `GoldRush`.
    2. **subtitle**: It is the second line of your brand. By default, it is set as `Block Explorer`.
    3. **logo_url**: It is the logo of your brand. By default, it is renders the GoldRush Logo. An image src of 40x40px is recommended for this.

2. **theme**: This is an extension of the theme config passed to the [GoldRush Kit](https://github.com/covalenthq/goldrush-kit). Explore these theme settings from [here](https://goldrush-kit.vercel.app/?path=/story/theme-config--theme-config).

3. **chains**: A selection of all the chain the deployment offers. The desired chains can be passed to this array in multiple formats as shown the example below. By default, an empty array (`[]`) is passed here to provide the options all the 100+ chains supported by the [GoldRush API](https://goldrush.dev/docs/networks/). As a default behavior, the home page is rendered based using the first chain thats passed in this array.

    ```ts
    import { ChainID, ChainName } from "@covalenthq/client-sdk";

    chains: [
        "eth-mainnet",
        137,
        ChainID.BSC_MAINNET,
        ChainName.OPTIMISM_MAINNET,
    ];
    ```

4. **gtag_id**: This is the tag ID provided by [Google Analytics](https://developers.google.com/analytics) for realtime tracking of active users on the deployment. By default, it is `null` and is not mandatory to pass. The Google tag looks like `G-**********`.

## Features

1. Real-time Block Explorer: Provides up-to-date information on blockchain transactions, blocks, and account balances in real time, giving users the latest data.
2. Ready-to-use customizable template: Jumpstart your dApp journey with a beautifully designed UI that’s both intuitive and engaging.
3. Cross Chain Support: Supports 100+ chains, providing a unified explorer for all your needs.
4. Comprehensive Data Filtering: Search and filter through blockchain data with options to refine by transaction type, block height, or account, making it ideal for both casual users and developers.
5. UI Template: The GoldRush Block Explorer can be customized with different colors and modes per deployment.

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues](https://github.com/covalenthq/goldrush-block-explorer-ui/issues) page.

## Show your support

Give a ⭐️ if this project helped you!

## License

This project is [MIT](./LICENSE) licensed.
