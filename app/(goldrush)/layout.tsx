import { ClientGoldRushProvider } from "@/utils/store";
import { Footer, Navbar } from "@/components/shared";

const GoldRushLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <ClientGoldRushProvider>
            <Navbar />
            <section className="gbk-flex-1 gbk-p-8">{children}</section>
            <Footer />
        </ClientGoldRushProvider>
    );
};

export default GoldRushLayout;
