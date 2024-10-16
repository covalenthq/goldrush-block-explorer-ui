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
                    GoldRush {selectedChain?.name?.replaceAll("-", " ")}{" "}
                    Explorer
                </h3>

                <p className="text-secondary-light dark:text-secondary-dark gbk-font-bold">
                    Seamless Cross-Chain Exploration, Powered by Goldrush
                </p>
            </div>

            <GasCard chain_name={chain_id} />

            <div className="gbk-grid gbk-grid-cols-1 gbk-gap-8 xl:gbk-grid-cols-2">
                <div>
                    <h2>Latest Blocks</h2>
                    <div className="gbk-flex gbk-justify-between gbk-gap-x-4">
                        <LatestBlocks
                            chain_name={chain_id}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            actionable_block={(block) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/block/${block}`,
                                    className: "hover:underline",
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
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            actionable_address={(from__address) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/address/${from__address}`,
                                    className: "hover:underline",
                                },
                            })}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            actionable_transaction={(tx_hash) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/transaction/${tx_hash}`,
                                    className: "hover:underline",
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
