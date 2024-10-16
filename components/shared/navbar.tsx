"use client";

import { goldrushConfig } from "@/goldrush.config";
import { timestampParser } from "@/utils/functions";
import { useDebounce } from "@/utils/hooks";
import { type Price, type Chain, type ChainItem } from "@covalenthq/client-sdk";
import {
    ChainSelector,
    Timestamp,
    useGoldRush,
} from "@covalenthq/goldrush-kit";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const Navbar: React.FC = () => {
    const {
        chains,
        selectedChain,
        setSelectedChain,
        searchHandler,
        updateThemeHandler,
        theme,
        goldrushClient,
    } = useGoldRush();

    const { push } = useRouter();
    const path = usePathname();
    const { chain_id } = useParams<{
        chain_id: string;
    }>();

    const [searchInput, setSearchInput] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [nativePrice, setNativePrice] = useState<Price | null>(null);
    const [delta, setDelta] = useState<number | null>(null);

    useEffect(() => {
        if (!chains) return;

        const _whitelistedChains: ChainItem[] = goldrushConfig.chains.length
            ? goldrushConfig.chains.reduce((acc: ChainItem[], nameOrId) => {
                  const foundChain: ChainItem | null =
                      chains.find(
                          ({ name, chain_id }) =>
                              name === nameOrId ||
                              chain_id?.toString() === nameOrId.toString()
                      ) ?? null;
                  if (foundChain) {
                      acc.push(foundChain);
                  }
                  return acc;
              }, [])
            : chains;

        if (!chain_id) {
            changeSelectedChainHandler(_whitelistedChains[0], true);
        } else {
            const chain: ChainItem | null =
                _whitelistedChains.find(
                    (chain) =>
                        chain?.name === chain_id ||
                        chain?.chain_id?.toString() === chain_id.toString()
                ) ?? null;
            if (chain) {
                changeSelectedChainHandler(chain);
            } else {
                notFound();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chains, chain_id]);

    useEffect(() => {
        (async () => {
            try {
                if (!chain_id) {
                    return;
                }

                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                setNativePrice(null);
                const { data, ...error } =
                    await goldrushClient.PricingService.getTokenPrices(
                        chain_id as Chain,
                        "USD",
                        "0x0000000000000000000000000000000000000000",
                        {
                            from: timestampParser(
                                today.toISOString(),
                                "YYYY MM DD"
                            ),
                            to: timestampParser(
                                yesterday.toISOString(),
                                "YYYY MM DD"
                            ),
                        }
                    );

                if (error.error) {
                    throw error;
                }

                if (data?.[0]?.items?.[0]) {
                    setNativePrice(data[0].items[0]);
                }

                if (
                    data?.[0]?.items?.[0]?.price &&
                    data?.[0]?.items?.[1]?.price
                ) {
                    const todayPrice = data[0].items[0].price;
                    const yesterdayPrice = data[0].items[1].price;
                    setDelta(
                        +(
                            ((todayPrice - yesterdayPrice) / yesterdayPrice) *
                            100
                        ).toFixed(2)
                    );
                }
            } catch (error) {
                console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain_id]);

    const changeSelectedChainHandler = (
        chain: ChainItem,
        redirect: boolean = false
    ) => {
        if (!chain?.name) {
            return;
        }
        setSelectedChain(chain);
        if (redirect || chain_id?.length === 1) {
            const paths = path.split("/");
            paths.shift();
            paths[0] = chain.name;
            push(`/${paths.join("/")}`);
        }
    };

    useDebounce(
        () => {
            if (searchInput && selectedChain) {
                searchResultsHandler(searchInput, selectedChain);
            }
        },
        500,
        [searchInput, selectedChain]
    );

    const searchResultsHandler = useCallback(
        (input: string, chain: ChainItem) => {
            if (!input) return;

            const searchType = searchHandler(input);
            let page: string | null = null;
            switch (searchType) {
                case "address":
                    page = "address";
                    break;
                case "tx":
                    page = "transaction";
                    break;
                case "block":
                    page = "block";
                    break;
                default:
                    push(`/not-found`);
                    return;
            }
            push(`/${chain.name}/${page}/${input}`);
        },
        [push, searchHandler]
    );

    return (
        <nav className="bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark border-secondary-light dark:border-secondary-dark gbk-sticky gbk-left-0 gbk-top-0 gbk-z-50 gbk-flex gbk-w-full gbk-flex-wrap gbk-items-center gbk-justify-between gbk-gap-x-4 gbk-border-b gbk-px-8 gbk-py-4 lg:gbk-flex-nowrap">
            <div className="gbk-flex gbk-items-center gbk-gap-x-8">
                <Link
                    href={`/${selectedChain?.name}`}
                    className="gbk-mr-auto gbk-flex gbk-w-fit gbk-items-center gbk-gap-2"
                >
                    <figure className="gbk-relative gbk-h-10 gbk-w-10">
                        <Image
                            src={goldrushConfig.brand.logo_url}
                            alt={`GoldRush Block Explorer - ${selectedChain?.label}`}
                            fill
                            className="gbk-object-cover"
                        />
                    </figure>

                    <h1 className="gbk-whitespace-nowrap gbk-text-lg gbk-font-medium gbk-leading-none">
                        {goldrushConfig.brand.title}
                        <br />
                        {goldrushConfig.brand.subtitle}
                    </h1>
                </Link>

                {nativePrice && (
                    <div className="gbk-whitespace-nowrap text-secondary-light dark:text-secondary-dark gbk-text-sm">
                        <p className="text-foreground-light dark:text-foreground-dark">
                            {
                                nativePrice.contract_metadata
                                    ?.contract_ticker_symbol
                            }
                            : <span>{nativePrice.pretty_price}</span>{" "}
                            {delta !== null && (
                                <span
                                    className={
                                        delta < 0
                                            ? "text-danger"
                                            : "text-success"
                                    }
                                >
                                    {delta > 0 ? "+" : ""}
                                    {delta}%
                                </span>
                            )}
                        </p>

                        <Timestamp timestamp={nativePrice.date} />
                    </div>
                )}
            </div>

            <input
                id="menu"
                type="checkbox"
                role="button"
                onClick={() => setOpen(!open)}
                className="gbk-ml-auto lg:gbk-hidden"
                defaultChecked={open}
            />

            <div
                className={`${
                    open ? "gbk-max-h-40" : "gbk-max-h-0 gbk-overflow-hidden"
                } gbk-flex gbk-w-full gbk-items-center gbk-justify-between gbk-transition-all gbk-duration-500 gbk-ease-in-out lg:gbk-max-h-fit lg:gbk-flex-row`}
            >
                <div className="gbk-mt-4 gbk-flex gbk-flex-col gbk-items-center gbk-gap-2 lg:gbk-mx-auto lg:gbk-mt-0 lg:gbk-flex-row">
                    <input
                        type="text"
                        name="search"
                        value={searchInput}
                        placeholder="Address / Block / Hash / Domain"
                        onChange={({ target: { value } }) =>
                            setSearchInput(value)
                        }
                        className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark rounded border border-secondary-light dark:border-secondary-dark gbk-h-9 gbk-w-72 gbk-px-3 gbk-outline-none"
                    />

                    <ChainSelector
                        onChangeChain={(newChain) =>
                            changeSelectedChainHandler(newChain, true)
                        }
                        chain_options={goldrushConfig.chains}
                    />
                </div>

                <input
                    id="theme-toggle"
                    className="dark:text-background-light text-background-dark"
                    type="checkbox"
                    defaultChecked={theme.mode === "light"}
                    onClick={() =>
                        updateThemeHandler({
                            mode: theme.mode === "light" ? "dark" : "light",
                        })
                    }
                />
            </div>
        </nav>
    );
};
