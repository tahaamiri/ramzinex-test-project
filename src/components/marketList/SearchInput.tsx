import useDebounce from '../../hooks/useDebounce';
import searchIcon from '../../assets/svg/search.svg';
import { ChangeEvent, memo, useEffect, useState } from 'react';

type SearchInputProps = {
    value?: string;
    onSearch: (value: string) => void;
}

const SearchInput = (props: SearchInputProps) => {

    const [searchVal, setSearchVal] = useState<string | undefined>(props.value);
    const debounceValue = useDebounce(searchVal);

    useEffect(() => {
        debounceValue !== undefined && props.onSearch(debounceValue);
    }, [debounceValue])

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.target.value);
    }

    return (
        <div className="w-full flex items-center gap-x-2 border border-[#E0E0E0] rounded-lg p-2">
            <img src={searchIcon} alt="search icon" width={16} height={16} />
            <input
                type="text"
                value={searchVal}
                className='w-full outline-none placeholder:text-xs placeholder:text-[#BCBEC1] placeholder:font-normal text-[#41474F] dark:text-[#E4E5E6] bg-transparent'
                placeholder='جستجوی بازار'
                onChange={handleSearchInputChange}
            />
        </div>
    )
}

export default memo(SearchInput);