"use client";

import { goldrushConfig } from "@/goldrush.config";
import { useDebounce } from "@/utils/hooks";
import { type ChainItem } from "@covalenthq/client-sdk";
import { ChainSelector, useGoldRush } from "@covalenthq/goldrush-kit";
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
    } = useGoldRush();

    const { push } = useRouter();
    const path = usePathname();
    const { chain_id } = useParams<{ chain_id: string }>();

    const [searchInput, setSearchInput] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

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

    const changeSelectedChainHandler = useCallback(
        (chain: ChainItem) => {
            const paths = path.split("/");
            paths.shift();
            paths[0] = chain.chain_id;
            setSelectedChain(chain);
            push(`/${paths.join("/")}`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [path]
    );

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
            if (!input) {
                return;
            }

            const searchType = searchHandler(input);
            let page: string | null = null;
            switch (searchType) {
                case "address": {
                    page = "address";
                    break;
                }
                case "tx": {
                    page = "transaction";
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
        <nav className="bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark border-secondary-light dark:border-secondary-dark gbk-sticky gbk-left-0 gbk-top-0 gbk-z-50 gbk-flex gbk-w-full gbk-flex-wrap gbk-items-center gbk-justify-between gbk-gap-x-4 gbk-border-b gbk-px-8 gbk-py-4 md:gbk-flex-nowrap">
            <Link
                href={`/${selectedChain?.chain_id}`}
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

            <input
                id="menu"
                type="checkbox"
                role="button"
                onClick={() => setOpen(!open)}
                className="gbk-ml-auto md:gbk-hidden"
                defaultChecked={open}
            />

            <div
                className={`${
                    open ? "gbk-max-h-40" : "gbk-max-h-0 gbk-overflow-hidden"
                } gbk-flex gbk-w-full gbk-items-center gbk-justify-between gbk-transition-all gbk-duration-500 gbk-ease-in-out md:gbk-max-h-fit md:gbk-flex-row`}
            >
                <div className="gbk-mt-4 gbk-flex gbk-flex-col gbk-items-center gbk-gap-2 md:gbk-mx-auto md:gbk-mt-0 md:gbk-flex-row">
                    <input
                        type="text"
                        name="search"
                        value={searchInput}
                        placeholder="Address / Hash / Block / Domain Name"
                        onChange={({ target: { value } }) =>
                            setSearchInput(value)
                        }
                        className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark rounded border border-secondary-light dark:border-secondary-dark gbk-h-9 gbk-w-72 gbk-px-3 gbk-outline-none"
                    />

                    <ChainSelector
                        onChangeChain={changeSelectedChainHandler}
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
