"use client";

import { goldrushConfig } from "@/goldrush.config";
import { timestampParser } from "@/utils/functions";
import {
    type Price,
    type Chain,
    type ChainItem,
    type PriceItem,
    calculatePrettyBalance,
} from "@covalenthq/client-sdk";
import { ChainSelector, useGoldRush } from "@covalenthq/goldrush-kit";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    const [gasPrice, setGasPrice] = useState<PriceItem | null>(null);

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
                const [
                    { data: nativePriceData, ...nativePriceError },
                    { data: deltaData, ...deltaError },
                ] = await Promise.all([
                    goldrushClient.PricingService.getTokenPrices(
                        chain_id as Chain,
                        "USD",
                        "0x0000000000000000000000000000000000000000"
                    ),
                    goldrushClient.PricingService.getTokenPrices(
                        chain_id as Chain,
                        "USD",
                        "0x0000000000000000000000000000000000000000",
                        {
                            to: timestampParser(
                                yesterday.toISOString(),
                                "YYYY MM DD"
                            ),
                        }
                    ),
                ]);

                if (nativePriceError.error) {
                    throw nativePriceError;
                }

                if (deltaError.error) {
                    throw deltaError;
                }

                if (nativePriceData?.[0]?.items?.[0]) {
                    setNativePrice(nativePriceData[0].items[0]);
                }

                if (
                    nativePriceData?.[0]?.items?.[0]?.price &&
                    deltaData?.[0]?.items?.[0]?.price
                ) {
                    const todayPrice = nativePriceData[0].items[0].price;
                    const yesterdayPrice = deltaData[0].items[0].price;
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
                    await goldrushClient.BaseService.getGasPrices(
                        chain_id as Chain,
                        "nativetokens",
                        {
                            quoteCurrency: "USD",
                        }
                    );

                if (error.error) {
                    throw error;
                }

                if (data?.items?.[0]) {
                    setGasPrice(data?.items?.[0]);
                }
            } catch (error) {
                console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain_id]);

    useEffect(() => {
        if (!selectedChain) {
            return;
        }
        changeSelectedChainHandler(selectedChain, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChain]);

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

    const searchResultsHandler = (input: string) => {
        if (!input || !selectedChain) return;

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
        push(`/${selectedChain.name}/${page}/${input}`);
    };

    const clearSearchInputHandler = () => {
        setSearchInput("");
    };

    return (
        <nav className="bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark border-secondary-light dark:border-secondary-dark gbk-sticky gbk-left-0 gbk-top-0 gbk-z-50 gbk-grid gbk-grid-cols-2 xl:gbk-grid-cols-3 gbk-w-full gbk-items-center gbk-justify-between gbk-gap-4 gbk-border-b gbk-px-8 gbk-py-4">
            <div className="gbk-flex gbk-items-center gbk-gap-x-8 gbk-col-span-2 xl:gbk-col-span-1">
                <Link
                    href={`/${selectedChain?.name}`}
                    className="gbk-flex gbk-w-fit gbk-items-center gbk-gap-2"
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
                    <div className="gbk-whitespace-nowrap text-foreground-light dark:text-foreground-dark gbk-text-sm">
                        <p>
                            <span className="text-secondary-light dark:text-secondary-dark">
                                {
                                    nativePrice.contract_metadata
                                        ?.contract_ticker_symbol
                                }
                                :{" "}
                            </span>
                            {nativePrice.pretty_price}{" "}
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

                        <p>
                            {path !== `/${chain_id}` && gasPrice ? (
                                <>
                                    <span className="text-secondary-light dark:text-secondary-dark">
                                        Gas:{" "}
                                    </span>
                                    <span>
                                        {calculatePrettyBalance(
                                            Number(+(gasPrice.gas_price ?? 0)),
                                            9,
                                            true,
                                            4
                                        )}
                                    </span>{" "}
                                    GWEI
                                </>
                            ) : (
                                "\u00A0"
                            )}
                        </p>
                    </div>
                )}

                <input
                    id="menu"
                    type="checkbox"
                    role="button"
                    onClick={() => setOpen(!open)}
                    className="gbk-ml-auto lg:gbk-hidden"
                    defaultChecked={open}
                />
            </div>

            <div
                className={`${
                    open ? "gbk-max-h-40" : "gbk-max-h-0 gbk-overflow-hidden"
                } gbk-grid gbk-grid-cols-2 gbk-gap-4 gbk-col-span-2 gbk-w-full gbk-items-center gbk-justify-between gbk-transition-all gbk-duration-500 gbk-ease-in-out lg:gbk-max-h-fit`}
            >
                <div className="gbk-col-span-2 lg:gbk-col-span-1 gbk-mt-4 gbk-flex gbk-flex-col lg:gbk-items-center gbk-gap-2 lg:gbk-mx-auto lg:gbk-mt-0 lg:gbk-flex-row">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            searchResultsHandler(searchInput);
                        }}
                        className="gbk-flex gbk-items-center gbk-gap-x-2 bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark rounded border border-secondary-light dark:border-secondary-dark gbk-px-2 gbk-w-124 gbk-max-w-full gbk-justify-between gbk-h-9"
                    >
                        <input
                            type="text"
                            name="search"
                            value={searchInput}
                            placeholder="Address / Block / Hash / Domain"
                            onChange={({ target: { value } }) =>
                                setSearchInput(value)
                            }
                            className="gbk-w-full gbk-outline-none gbk-bg-transparent"
                        />

                        <div className="gbk-flex gbk-items-center gbk-gap-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    clearSearchInputHandler();
                                }}
                                disabled={!searchInput}
                                className="gbk-w-4"
                            >
                                {searchInput ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 -960 960 960"
                                        fill="currentColor"
                                        className="gbk-w-full"
                                    >
                                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z" />
                                    </svg>
                                ) : (
                                    "\u00A0"
                                )}
                            </button>

                            <button
                                type="submit"
                                disabled={!searchInput}
                                className="gbk-w-6"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    fill="currentColor"
                                    className="bg-primary-light dark:bg-primary-dark rounded gbk-p-1 gbk-w-full"
                                >
                                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580t75.5-184.5T380-840t184.5 75.5T640-580q0 44-14 83t-38 69l252 252zM380-400q75 0 127.5-52.5T560-580t-52.5-127.5T380-760t-127.5 52.5T200-580t52.5 127.5T380-400" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    <ChainSelector
                        onChangeChain={(newChain) =>
                            changeSelectedChainHandler(newChain, true)
                        }
                        chain_options={goldrushConfig.chains}
                    />
                </div>

                <input
                    id="theme-toggle"
                    className="dark:text-background-light text-background-dark lg:gbk-ml-auto gbk-w-4 gbk-h-4"
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
