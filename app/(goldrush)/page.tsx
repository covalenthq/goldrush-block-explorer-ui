"use client";

import goldrushLoader from "../../public/goldrush-loader.json";
import Lottie from "react-lottie";

const Home: React.FC = () => {
    return (
        <main className="gbk-m-auto">
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: goldrushLoader,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                    },
                }}
                height={200}
                width={200}
            />
        </main>
    );
};

export default Home;
