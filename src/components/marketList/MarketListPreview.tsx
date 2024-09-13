import { Pairs } from "../../utils/types"
import MarketItem from "./MarketItem";

type MarketListPreviewProps = {
    list: Pairs[];
}

const MarketListPreview = (props: MarketListPreviewProps) => {

    if (props.list.length == 0)
        return (
            <p className="w-full text-center text-sm text-[#41474F] dark:text-[#E4E5E6] mt-10"> موردی یافت نشد.</p>
        )

    return (
        <div className="flex flex-col w-full">
            {props.list.map((market) => (
                <MarketItem key={market.pair_id} item={market} />
            ))}
        </div>
    )
}

export default MarketListPreview