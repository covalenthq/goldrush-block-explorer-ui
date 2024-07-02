"use client";

import Image from "next/image";

const Home: React.FC = () => {
    return (
        <Image
            src="/covalent-loader.gif"
            alt="GoldRush Block Explorer"
            height={200}
            width={200}
            className="gbk-m-auto"
        />
    );
};

export default Home;
