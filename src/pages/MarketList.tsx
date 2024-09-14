import { useState, useCallback, useEffect } from 'react';
import { Pairs, SortOrderType } from '../utils/types';
import MarketItemSkeleton from '../components/marketList/MarketItemSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MarketListPreview from '../components/marketList/MarketListPreview';
import HeaderControls from '../components/marketList/HeaderControls';
import ArrowIcon from '../assets/svg/ArrowIcon';

const MarketList = () => {
    const marketList = useSelector((state: RootState) => state.market.list);
    const [filteredMarket, setFilteredMarket] = useState<Pairs[]>(marketList || []);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [nameSortOrder, setNameSortOrder] = useState<SortOrderType>(null);
    const [priceSortOrder, setPriceSortOrder] = useState<SortOrderType>(null);

    const applySort = useCallback((list: Pairs[]) => {
        let sortedList = [...list];

        if (nameSortOrder) {
            sortedList = sortedList.sort((a, b) =>
                nameSortOrder === 'Ascending'
                    ? a.base_currency_symbol.fa.localeCompare(b.base_currency_symbol.fa)
                    : b.base_currency_symbol.fa.localeCompare(a.base_currency_symbol.fa)
            );
        } else if (priceSortOrder) {
            sortedList = sortedList.sort((a, b) =>
                priceSortOrder === 'Ascending' ? a.sell - b.sell : b.sell - a.sell
            );
        }

        return sortedList;
    }, [nameSortOrder, priceSortOrder]);

    const handleMarketSearch = (searchValue: string) => setSearchQuery(searchValue);

    useEffect(() => {
        if (!marketList) return;

        let filteredList = marketList.filter((market) =>
            market.base_currency_symbol.en.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filteredList = applySort(filteredList);

        setFilteredMarket(filteredList);
    }, [marketList, searchQuery, applySort]);

    const handleSortMarketList = (key: 'name' | 'price') => {
        let sortOrder: SortOrderType;

        if (key === 'name') {
            sortOrder = nameSortOrder === 'Ascending' ? 'Descending' : 'Ascending';
            setNameSortOrder(sortOrder);
            setPriceSortOrder(null);
        } else if (key === 'price') {
            sortOrder = priceSortOrder === 'Ascending' ? 'Descending' : 'Ascending';
            setPriceSortOrder(sortOrder);
            setNameSortOrder(null);
        }
    };

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
                    {!filteredMarket || filteredMarket.length === 0
                        ? <MarketItemSkeleton />
                        : <MarketListPreview list={filteredMarket} />}
                </div>
            </div>
        </div>
    );
};

export default MarketList;
