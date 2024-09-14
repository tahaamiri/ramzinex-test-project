import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { PATH } from "../utils/path";
import MarketDetailSkeleton from "../components/marketDetail/MarketDetailSkeleton";
import MarketDetailRow from "../components/marketDetail/MarketDetailRow";
import { priceRegexCheck } from "../utils/helper";

const MarketDetail = () => {
    const { url } = useParams();
    const navigate = useNavigate();
    const marketList = useSelector((state: RootState) => state.market.list);

    const marketInformation = useMemo(() => {
        return marketList?.find(market => market.url_name === url);
    }, [marketList, url]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#181818]">
            {!marketInformation
                ? <MarketDetailSkeleton />
                : (
                    <div className="flex-1 flex flex-col h-full px-6 ">
                        <div className="flex flex-col items-center justify-center gap-2 pt-[18px]">
                            <img src={marketInformation.logo} alt="logo" className="size-10" />
                            <span className='text-xs text-[#41474F] dark:text-[#E4E5E6] font-normal'>
                                {`${marketInformation.base_currency_symbol.fa} (${marketInformation.base_currency_symbol.en})`}
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col mt-3">
                            <MarketDetailRow label="نام انگلیسی" value={marketInformation.base_currency_symbol.en} />
                            <MarketDetailRow
                                label="قیمت"
                                value={`${priceRegexCheck(marketInformation.sell)} IRR`}
                            />
                            <MarketDetailRow
                                label="تغییرات 24 ساعته"
                                value={`${marketInformation.financial.last24h.change_percent} %`}
                            />
                            <MarketDetailRow
                                label="حجم معاملاتی"
                                value={`${priceRegexCheck(marketInformation.financial.last24h.quote_volume)} IRR`}
                            />
                        </div>
                        <button
                            className="border-[1.5px] border-[#E4E5E6] rounded-lg py-2 mb-3 text-[#1F2630] dark:text-[#E4E5E6] text-sm font-normal"
                            onClick={() => navigate(PATH.home)}
                        >
                            بازگشت
                        </button>
                    </div>
                )}
        </div>
    );
};

export default MarketDetail;