"use client";

import { type HomePageProps } from "@/utils/types/pages.types";
import {
    GasCard,
    LatestBlocks,
    LatestTransactions,
} from "@covalenthq/goldrush-kit";
import Link from "next/link";

const Home: React.FC<HomePageProps> = ({ params: { chain_id } }) => {
    return (
        <main className="gbk-flex gbk-flex-col gbk-gap-4">
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
                            actionable_from={(from__address) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/address/${from__address}`,
                                    className: "hover:underline",
                                },
                            })}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            actionable_to={(to__address) => ({
                                parent: Link,
                                parentProps: {
                                    href: `/${chain_id}/address/${to__address}`,
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
