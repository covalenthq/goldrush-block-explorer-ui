"use client";

export const Footer: React.FC = () => {
    return (
        <footer className="flex w-full items-center justify-between gap-4 bg-red-900 p-4 border-t">
            <h1 className="text-lg font-medium leading-none">
                GoldRush Kit Components
            </h1>

            <div>
                <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Fork your own Block Explorer
                </a>
            </div>
        </footer>
    );
};
