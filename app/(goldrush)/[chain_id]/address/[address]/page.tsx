import { type AddressPageProps } from "@/utils/types/pages.types";
import { redirect } from "next/navigation";

const AddressPage: React.FC<AddressPageProps> = async ({
    params: { address, chain_id },
}) => {
    redirect(`/${chain_id}/address/${address}/transactions`);
};

export default AddressPage;
