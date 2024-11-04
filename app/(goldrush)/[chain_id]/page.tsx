"use client";

import { type HomePageProps } from "@/utils/types/pages.types";
import {
    GasCard,
    LatestBlocks,
    LatestTransactions,
    useGoldRush,
} from "@covalenthq/goldrush-kit";
import Link from "next/link";

const Home: React.FC<HomePageProps> = ({ params: { chain_id } }) => {
    const { selectedChain } = useGoldRush();

    return (
        <main className="gbk-flex gbk-w-full gbk-flex-col gbk-gap-4">
            <div className="gbk-text-center gbk-flex gbk-items-center gbk-gap-y-2 gbk-flex-col gbk-py-4">
                <h3 className="gbk-text-4xl gbk-font-medium gbk-capitalize">
                    GoldRush {selectedChain?.label} Explorer
                </h3>

                <p className="text-secondary-light dark:text-secondary-dark gbk-font-bold">
                    Seamless Cross-Chain Exploration, Powered by{" "}
                    <a
                        href="http://goldrush.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:gbk-underline gbk-transition-all"
                    >
                        GoldRush
                    </a>
                </p>
            </div>

            <GasCard chain_name={chain_id} />

            <div className="gbk-grid gbk-grid-cols-1 gbk-gap-8 xl:gbk-grid-cols-2">
                <div>
                    <h2>Latest Blocks</h2>
                    <div className="gbk-flex gbk-justify-between gbk-gap-x-4">
                        <LatestBlocks
                            chain_name={chain_id}
                            actionable_block={(block) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/block/${block}`,
                                    className: "hover:gbk-underline",
                                },
                            })}
                            actionable_redirect={() => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/blocks`,
                                    className:
                                        "hover:gbk-underline gbk-w-fit gbk-mx-auto",
                                },
                            })}
                        />
                    </div>
                </div>

                <div>
                    <h2>Latest Transactions</h2>
                    <div className="gbk-flex gbk-justify-between gbk-gap-x-4">
                        <LatestTransactions
                            chain_name={chain_id}
                            actionable_address={(address) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/address/${address}`,
                                    className: "hover:gbk-underline",
                                },
                            })}
                            actionable_transaction={(tx_hash) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/transaction/${tx_hash}`,
                                    className: "hover:gbk-underline",
                                },
                            })}
                            actionable_redirect={() => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/transactions`,
                                    className:
                                        "hover:gbk-underline gbk-w-fit gbk-mx-auto",
                                },
                            })}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
