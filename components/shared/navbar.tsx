"use client";

import { ChainSelector, useGoldRush } from "@covalenthq/goldrush-kit";
import { useCallback, useEffect, useState } from "react";
import { type ChainItem } from "@covalenthq/client-sdk";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useDebounce } from "@/utils/hooks";
import { goldrushConfig } from "@/goldrush.config";
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
    const { chain_id } = useParams<{ chain_id: string }>();

    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        if (!chains) return;

        const _chains: ChainItem[] = goldrushConfig.chains.length
            ? goldrushConfig.chains.reduce((acc: ChainItem[], nameOrId) => {
                  const foundChain: ChainItem | null =
                      chains.find(
                          ({ name, chain_id }) =>
                              name === nameOrId ||
                              chain_id.toString() === nameOrId.toString()
                      ) ?? null;
                  if (foundChain) {
                      acc.push(foundChain);
                  }
                  return acc;
              }, [])
            : chains;

        if (!chain_id) {
            changeSelectedChainHandler(_chains[0]);
        } else {
            const chain: ChainItem | null =
                _chains.find(
                    (chain) => chain.chain_id.toString() === chain_id
                ) ?? null;
            if (chain) {
                changeSelectedChainHandler(chain);
            } else {
                notFound();
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chains]);

    const changeSelectedChainHandler = useCallback((chain: ChainItem) => {
        setSelectedChain(chain);
        push(`${chain.chain_id}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            const searchType = searchHandler(input);
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
                    push(`/not-found`);
                    return;
                }
            }
            push(`/${chain.chain_id}/${page}/${input}`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <nav className="bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark gbk-sticky gbk-left-0 gbk-top-0 gbk-z-50 gbk-grid gbk-w-full gbk-grid-cols-3 gbk-items-center gbk-justify-between gbk-gap-4 gbk-border-b gbk-p-4">
            <Link
                href={`/${selectedChain?.chain_id}`}
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
                    {goldrushConfig.brand.title}
                    <br />
                    {goldrushConfig.brand.subtitle}
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
                    onChangeChain={changeSelectedChainHandler}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    chain_options={goldrushConfig.chains}
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
