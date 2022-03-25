import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        products: []
    },
    reducers: {
        addItemsToStore(state, action) {
            const items = action.payload;
            state.products = items;
        }
    }
})
export const uiActions = uiSlice.actions;
export default uiSlice;