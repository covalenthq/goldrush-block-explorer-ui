"use client";

import { type SubNavProps } from "@/utils/types/shared.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SubNav: React.FC<SubNavProps> = ({ routes }) => {
    const path = usePathname().split("/").slice(-1)[0];

    return (
        <nav className="flex gap-4 gbk-my-4">
            {routes.map(({ children, href }) => (
                <Link
                    key={href}
                    href={href}
                    className={`gbk-transition-all hover:gbk-underline ${
                        path === href
                            ? "text-primary-light dark:text-primary-dark gbk-underline"
                            : "text-secondary-light dark:text-secondary-dark"
                    }`}
                >
                    {children}
                </Link>
            ))}
        </nav>
    );
};
