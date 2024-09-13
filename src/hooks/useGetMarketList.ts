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

    const getMarketList = () => {
        get(API.marketList)
            .then((response) => {
                dispatch(setMarketList(response.data));
            }).catch((error) => {
                console.log(error)
            })
    }
}

export default useGetMarketList