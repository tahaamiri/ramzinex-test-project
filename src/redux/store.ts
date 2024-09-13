import { configureStore } from '@reduxjs/toolkit'
import markteReducer from './slices/marketSlice';

export const store = configureStore({
    reducer: {
        market: markteReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch