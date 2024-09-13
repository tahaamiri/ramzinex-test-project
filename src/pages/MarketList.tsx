import { useState, useCallback } from 'react';
import { Pairs, SortOrderType } from '../utils/types';
import MarketItemSkeleton from '../components/marketList/MarketItemSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MarketListPreview from '../components/marketList/MarketListPreview';
import HeaderControls from '../components/marketList/HeaderControls';
import ArrowIcon from '../assets/svg/ArrowIcon';


const MarketList = () => {
    const marketList = useSelector((state: RootState) => state.market.list);
    const [searchedMarket, setSearchedMarket] = useState<Pairs[]>();
    const [nameSortOrder, setNameSortOrder] = useState<SortOrderType>(null);
    const [priceSortOrder, setPriceSortOrder] = useState<SortOrderType>(null);

    const handleMarketSearch = (searchValue: string) => {
        if (!searchValue) {
            setSearchedMarket(undefined);
            return;
        }
        const filteredList = marketList?.filter((market) =>
            market.base_currency_symbol.en.includes(searchValue)
        );
        setSearchedMarket(filteredList);
    };

    const handleSortMarketList = useCallback((key: 'name' | 'price') => {
        if (!marketList) return;


        const listToSort = searchedMarket || marketList;

        if (!listToSort) return;

        let sortedList: Pairs[] = [];
        let sortOrder: SortOrderType;

        if (key === 'name') {
            sortOrder = nameSortOrder === 'Ascending' ? 'Descending' : 'Ascending';
            sortedList = [...marketList!].sort((a, b) =>
                sortOrder === 'Ascending'
                    ? a.base_currency_symbol.fa.localeCompare(b.base_currency_symbol.fa)
                    : b.base_currency_symbol.fa.localeCompare(a.base_currency_symbol.fa)
            );
            setNameSortOrder(sortOrder);
            setPriceSortOrder(null);
        } else if (key === 'price') {
            sortOrder = priceSortOrder === 'Ascending' ? 'Descending' : 'Ascending';
            sortedList = [...marketList!].sort((a, b) =>
                sortOrder === 'Ascending'
                    ? a.sell - b.sell
                    : b.sell - a.sell
            );
            setPriceSortOrder(sortOrder);
            setNameSortOrder(null);
        }

        setSearchedMarket(sortedList);
    }, [marketList, nameSortOrder, priceSortOrder, searchedMarket]);

    return (
        <div className="min-h-screen flex flex-col p-2 bg-white dark:bg-[#181818]">
            <HeaderControls onSearch={handleMarketSearch} />
            <div className="flex-1 flex flex-col px-2 mt-2">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-5 cursor-pointer' onClick={() => handleSortMarketList('name')}>
                        <span className='text-[#8F9398] text-xs font-medium'>نام</span>
                        <div className='flex flex-col gap-1'>
                            <ArrowIcon className={`${nameSortOrder === 'Ascending' ? "fill-orange-500" : "fill-[#E0E0E0] "}`} />
                            <ArrowIcon className={`${nameSortOrder === 'Descending' ? "fill-orange-500" : "fill-[#E0E0E0]"} rotate-180`} />
                        </div>
                    </div>
                    <div className='flex items-center gap-5 cursor-pointer' onClick={() => handleSortMarketList('price')}>
                        <span className='text-[#8F9398] text-xs font-medium'>آخرین قیمت</span>
                        <div className='flex flex-col gap-1'>
                            <ArrowIcon className={`${priceSortOrder === 'Ascending' ? "fill-orange-500" : "fill-[#E0E0E0] "}`} />
                            <ArrowIcon className={`${priceSortOrder === 'Descending' ? "fill-orange-500" : "fill-[#E0E0E0]"} rotate-180`} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 h-full w-full'>
                    {marketList === undefined
                        ? <MarketItemSkeleton />
                        : (
                            <MarketListPreview list={searchedMarket !== undefined ? searchedMarket : marketList} />
                        )}
                </div>
            </div>
        </div>
    )
}

export default MarketList;