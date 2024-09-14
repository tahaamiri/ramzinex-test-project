import { useNavigate } from "react-router-dom";
import { Pairs } from "../../utils/types";
import { PATH } from "../../utils/path";
import { priceRegexCheck } from "../../utils/helper";


type Props = {
    item: Pairs;
}

const MarketItem = (props: Props) => {

    const { item } = props;
    const navigate = useNavigate();

    return (
        <div
            key={item.pair_id}
            className='flex items-center justify-between py-2 border-b border-[#F5F5F5] cursor-pointer'
            onClick={() => navigate(PATH.detail(item.url_name))}
        >
            <div className='flex items-center gap-[11px]'>
                <img src={item.logo} alt="icon" className='size-7 rounded-full' />
                <span className='text-xs text-[#41474F] dark:text-[#E4E5E6] font-normal truncate'>
                    {`${item.base_currency_symbol.fa} (${item.base_currency_symbol.en})`}
                </span>
            </div>
            <span className='shrink-0 text-[#41474F] dark:text-[#E4E5E6] text-sm font-normal' dir="ltr">
                {`${priceRegexCheck(item.sell)} IRR`}
            </span>
        </div>
    )
}

export default MarketItem