"use client";

import { MissingChain } from "@/components/shared";
import { type HomePageProps } from "@/utils/types/pages.types";
import { GasCard, LatestBlocks } from "@covalenthq/goldrush-kit";

const Home: React.FC<HomePageProps> = ({ searchParams: { chain_name } }) => {
    return !chain_name ? (
        <MissingChain />
    ) : (
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
        </main>
    );
};

export default Home;
