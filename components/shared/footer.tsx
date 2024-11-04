import { PoweredByCovalent } from ".";

export const Footer: React.FC = () => {
    const anchors: {
        content: React.ReactNode;
        href: string;
    }[] = [
        {
            content: "GoldRush API",
            href: "https://www.covalenthq.com/docs/unified-api/",
        },
        {
            content: "GoldRush UI Kit",
            href: "https://github.com/covalenthq/goldrush-kit",
        },
    ];

    return (
        <footer className="gbk-flex gbk-w-full gbk-items-center gbk-justify-between gbk-gap-4 gbk-py-4 gbk-px-8 gbk-border-t border-secondary-light dark:border-secondary-dark">
            <div className="gbk-flex gbk-flex-col gbk-gap-4 gbk-gap-y-2 lg:gbk-flex-row">
                {anchors.map(({ content, href }) => (
                    <a
                        key={content?.toString()}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gbk-font-medium hover:gbk-underline gbk-transition-all"
                    >
                        {content}
                    </a>
                ))}
            </div>

            <a
                href="https://www.covalenthq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gbk-w-48 gbk-flex"
            >
                <PoweredByCovalent />
            </a>
        </footer>
    );
};
