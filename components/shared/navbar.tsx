"use client";

import { ChainSelector, useGoldRush } from "@covalenthq/goldrush-kit";
import { useCallback, useEffect, useState } from "react";
import { Chains, type ChainItem } from "@covalenthq/client-sdk";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CHAIN_NAME_SEARCH_PARAM } from "@/utils/constants/shared.constants";

export const Navbar: React.FC = () => {
    const { chains, selectedChain, setSelectedChain, searchHandler } =
        useGoldRush();

    const { push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        const chainName =
            searchParams.get(CHAIN_NAME_SEARCH_PARAM) ?? Chains.ETH_MAINNET;
        if (chainName !== selectedChain?.name) {
            const chain = chains?.find((o) => o.name === chainName);
            if (chain) {
                selectChainHandler(chain);
            }
        }
    }, [searchParams, chains]);

    const selectChainHandler = useCallback(
        (chain: ChainItem) => {
            setSelectedChain(chain);
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set(CHAIN_NAME_SEARCH_PARAM, chain.name);
            push(`${pathname}?${updatedParams}`);
        },
        [searchParams, pathname]
    );

    const searchResultsHandler = useCallback(() => {
        const searchType = searchHandler(searchInput);
        let page: string | null = null;
        switch (searchType) {
            case "address": {
                page = "address";
            }
            case "tx": {
                return push(`/tx/${searchInput}?${searchParams}`);
            }
            case "block": {
                return push(`/block/${searchInput}?${searchParams}`);
            }
            default: {
                return push("/404");
            }
        }
        push(`/${page}/${searchInput}?${searchParams}`);
    }, [searchInput, selectedChain, searchParams]);

    return (
        <nav className="flex gap-4">
            <input
                type="text"
                name="search"
                value={searchInput}
                placeholder="Search by any Address / Txn Hash / Block / Domain Name"
                onChange={({ target: { value } }) => setSearchInput(value)}
                className="!border-accent-foreground"
            />

            <ChainSelector
                onChangeChain={(chain: ChainItem) => selectChainHandler(chain)}
            />

            <button
                disabled={!searchInput || !selectedChain}
                onClick={searchResultsHandler}
            >
                Search
            </button>
        </nav>
    );
};
