import { useState, useCallback, useEffect } from 'react';
import { Pairs, SortOrderType } from '../utils/types';
import MarketItemSkeleton from '../components/marketList/MarketItemSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MarketListPreview from '../components/marketList/MarketListPreview';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../components/marketList/SearchInput';
import DarkModeToggle from '../components/DarkModeToggle';
import SortableColumn from '../components/marketList/SortableColumn';

const MarketList = () => {

    const marketList = useSelector((state: RootState) => state.market.list);
    const [filteredMarket, setFilteredMarket] = useState<Pairs[]>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string | undefined>(searchParams.get('searchQuery') || undefined);
    const [nameSortOrder, setNameSortOrder] = useState<SortOrderType | undefined>(searchParams.get('sortByName') as SortOrderType || undefined);
    const [priceSortOrder, setPriceSortOrder] = useState<SortOrderType | undefined>(searchParams.get('sortByPrice') as SortOrderType || undefined);


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

    const handleMarketSearch = useCallback((searchValue: string) => {
        setSearchQuery(searchValue);
    }, []);

    useEffect(() => {
        if (!marketList) return;

        let filteredList = marketList;
        if (searchQuery) {
            filteredList = marketList.filter((market) =>
                market.base_currency_symbol.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                market.base_currency_symbol.fa.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        filteredList = applySort(filteredList);

        setFilteredMarket(filteredList);
        paramsHandler(searchQuery, nameSortOrder, priceSortOrder);

    }, [marketList, searchQuery, priceSortOrder, nameSortOrder, applySort]);

    const handleSortMarketList = (key: 'name' | 'price') => {
        let sortOrder: SortOrderType;

        if (key === 'name') {
            sortOrder = nameSortOrder === 'Ascending' ? 'Descending' : 'Ascending';
            setNameSortOrder(sortOrder);
            setPriceSortOrder(undefined);
        } else if (key === 'price') {
            sortOrder = priceSortOrder === 'Ascending' ? 'Descending' : 'Ascending';
            setPriceSortOrder(sortOrder);
            setNameSortOrder(undefined);
        }
    };

    const paramsHandler = (searchQuery?: string, nameSort?: SortOrderType, priceSort?: SortOrderType) => {

        const params: [string, string | undefined][] = [
            ['searchQuery', searchQuery],
            ['sortByName', nameSort],
            ['sortByPrice', priceSort],
        ];

        params.forEach(([key, value]) => {
            if (value) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        });

        setSearchParams(searchParams);
    }

    return (
        <div className="min-h-screen flex flex-col p-2 bg-white dark:bg-[#181818]">
            <div className="flex items-center gap-2">
                <SearchInput
                    value={searchQuery}
                    onSearch={handleMarketSearch}
                />
                <DarkModeToggle />
            </div>
            <div className="flex-1 flex flex-col px-2 mt-2">
                <div className="flex items-center justify-between">
                    <SortableColumn
                        label="نام"
                        sortOrder={nameSortOrder}
                        onSort={() => handleSortMarketList('name')}
                    />
                    <SortableColumn
                        label="آخرین قیمت"
                        sortOrder={priceSortOrder}
                        onSort={() => handleSortMarketList('price')}
                    />
                </div>
                <div className='flex flex-1 h-full w-full'>
                    {filteredMarket === undefined
                        ? <MarketItemSkeleton />
                        : <MarketListPreview list={filteredMarket} />}
                </div>
            </div>
        </div>
    );
};


export default MarketList;
