"use client";

import { ChainsLoading } from "@/components/shared";
import type { Chain } from "@covalenthq/client-sdk";
import {
    GasCard,
    LatestBlocks,
    LatestTransactions,
} from "@covalenthq/goldrush-kit";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const searchParams = useSearchParams();
    const [chain_name, setChainName] = useState<Chain | null>(null);

    useEffect(() => {
        setChainName(searchParams.get("chain_name") as Chain);
    }, [searchParams]);

    if (!chain_name) {
        return <ChainsLoading />;
    }

    return (
        <main className="gbk-flex gbk-flex-col gbk-gap-4">
            <div className="gbk-flex gbk-gap-4">
                <div className="gbk-w-full">
                    <h2>ERC 20</h2>
                    <GasCard chain_name={chain_name} event_type="erc20" />
                </div>

                <div className="gbk-w-full">
                    <h2>Native Tokens</h2>
                    <GasCard
                        chain_name={chain_name}
                        event_type="nativetokens"
                    />
                </div>
            </div>

            <div>
                <h2>Latest Blocks</h2>
                <div className="gbk-flex gbk-justify-between gbk-gap-x-4">
                    <LatestBlocks chain_name={chain_name} />
                </div>
            </div>

            <div>
                <h2>Latest Transactions</h2>
                <div className="gbk-flex gbk-justify-between gbk-gap-x-4">
                    <LatestTransactions chain_name={chain_name} />
                </div>
            </div>
        </main>
    );
};

export default Home;
