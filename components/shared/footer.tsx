"use client";

import Image from "next/image";

export const Footer: React.FC = () => {
    return (
        <footer className="flex w-full items-center justify-between gap-4 bg-red-900 p-4 border-t">
            <a
                href="https://github.com/covalenthq/goldrush-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="gbk-group gbk-flex gbk-items-center gbk-gap-2"
            >
                <figure className="gbk-relative gbk-h-10 gbk-w-10">
                    <Image
                        src="/goldrush-logo.png"
                        alt=""
                        fill
                        className="gbk-object-contain"
                    />
                </figure>

                <h1 className="text-lg font-medium leading-none group-hover:gbk-underline">
                    GoldRush Kit Components
                </h1>
            </a>

            <a
                href="https://www.covalenthq.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <figure className="gbk-relative gbk-h-16 gbk-w-36">
                    <Image
                        src="/powered-by-covalent.png"
                        alt=""
                        fill
                        className="flex gbk-object-contain"
                    />
                </figure>
            </a>
        </footer>
    );
};
