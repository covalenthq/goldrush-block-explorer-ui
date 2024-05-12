"use client";

import { ChainSelector, useGoldRush } from "@covalenthq/goldrush-kit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Chains, type ChainItem } from "@covalenthq/client-sdk";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDebounce } from "@/utils/hooks";
import kit from "@/goldrush.config";
import Link from "next/link";

export const Navbar: React.FC = () => {
    const {
        chains,
        selectedChain,
        setSelectedChain,
        searchHandler,
        updateThemeHandler,
        theme,
    } = useGoldRush();

    const { push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchInput, setSearchInput] = useState<string>("");

    const CHAIN_NAME_SEARCH_PARAM: string = useMemo(() => "chain_name", []);

    useEffect(() => {
        const chainName =
            searchParams.get(CHAIN_NAME_SEARCH_PARAM) ||
            kit.chains.includes(Chains.ETH_MAINNET)
                ? Chains.ETH_MAINNET
                : kit.chains[0];

        const chain = chains?.find((o) => o.name === chainName) || null;
        if (chain) {
            selectChainHandler(chain);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chains]);

    useDebounce(
        () => {
            if (searchInput && selectedChain) {
                searchResultsHandler();
            }
        },
        500,
        [searchInput, selectedChain, searchParams]
    );

    const selectChainHandler = useCallback(
        (chain: ChainItem) => {
            setSelectedChain(chain);
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set(CHAIN_NAME_SEARCH_PARAM, chain.name);
            push(`${pathname}?${updatedParams}`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams, pathname]
    );

    const searchResultsHandler = useCallback(() => {
        const searchType = searchHandler(searchInput);
        let page: string | null = null;
        switch (searchType) {
            case "address": {
                page = "address";
                break;
            }
            case "tx": {
                page = "tx";
                break;
            }
            case "block": {
                page = "block";
                break;
            }
            default: {
                push(`/404?${searchParams}`);
                return;
            }
        }
        push(`/${page}/${searchInput}?${searchParams}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput, searchParams]);

    return (
        <nav className="bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark gbk-sticky gbk-left-0 gbk-top-0 gbk-z-50 gbk-grid gbk-w-full gbk-grid-cols-3 gbk-items-center gbk-justify-between gbk-gap-4 gbk-border-b gbk-p-4">
            <Link
                href={`/?${searchParams}`}
                className="gbk-flex gbk-w-fit gbk-items-center gbk-gap-2"
            >
                <figure>
                    <Image
                        src={selectedChain?.logo_url || ""}
                        alt={`GoldRush Block Explorer - ${selectedChain?.label}`}
                        width={40}
                        height={40}
                    />
                </figure>
                <h1 className="gbk-text-lg gbk-font-medium gbk-leading-none">
                    {kit.brand.title}
                    <br />
                    {kit.brand.subtitle}
                </h1>
            </Link>

            <div className="gbk-mx-auto gbk-flex gbk-items-center gbk-gap-2">
                <input
                    type="text"
                    name="search"
                    value={searchInput}
                    placeholder="Address / Txn Hash / Block / Domain Name"
                    onChange={({ target: { value } }) => setSearchInput(value)}
                    className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark rounded border border-secondary-light dark:border-secondary-dark gbk-px-3 gbk-py-1"
                />

                <ChainSelector
                    onChangeChain={(chain: ChainItem) =>
                        selectChainHandler(chain)
                    }
                    chain_options={kit.chains}
                />
            </div>

            <input
                id="toggle"
                className="toggle dark:text-background-light text-background-dark gbk-ml-auto"
                type="checkbox"
                defaultChecked={theme.mode === "light"}
                onClick={() =>
                    updateThemeHandler({
                        mode: theme.mode === "light" ? "dark" : "light",
                    })
                }
            />
        </nav>
    );
};
