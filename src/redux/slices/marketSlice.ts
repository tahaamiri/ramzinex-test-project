import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pairs } from '../../utils/types'

type MarketState = {
    list: Pairs[] | undefined;
}

const initialState: MarketState = {
    list: undefined,
}

export const counterSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        setMarketList: (state, action: PayloadAction<Pairs[]>) => {
            state.list = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMarketList } = counterSlice.actions

export default counterSlice.reducer