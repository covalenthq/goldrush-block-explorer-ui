"use client";

import { PoweredByCovalent } from ".";

export const Footer: React.FC = () => {
    return (
        <footer className="flex w-full items-center justify-between gap-4 bg-red-900 py-4 px-8 border-t border-secondary-light dark:border-secondary-dark gbk-h-16">
            <a
                href="https://github.com/covalenthq/goldrush-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="gbk-font-medium gbk-leading-none hover:gbk-underline"
            >
                GoldRush Kit Components
            </a>

            <a
                href="https://www.covalenthq.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <PoweredByCovalent />
            </a>
        </footer>
    );
};
