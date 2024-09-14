import { useEffect } from 'react'
import { API, get } from '../utils/api';
import { useDispatch } from 'react-redux';
import { setMarketList } from '../redux/slices/marketSlice';

const useGetMarketList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getMarketList();
        const intervalId = setInterval(() => getMarketList(), 20000);

        return () => clearInterval(intervalId)
    }, [])

    const getMarketList = async () => {
        const marketList = await get(API.marketList);
        dispatch(setMarketList(marketList));
    }
}

export default useGetMarketList