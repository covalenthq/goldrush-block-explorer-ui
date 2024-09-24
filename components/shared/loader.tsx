"use client";

import goldrushLoader from "../../public/goldrush-loader.json";
import Lottie from "react-lottie";

export const Loader: React.FC = () => {
    return (
        <main className="gbk-m-auto">
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: goldrushLoader,
                }}
                height={200}
                width={200}
            />
        </main>
    );
};
