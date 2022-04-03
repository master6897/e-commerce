import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: []
    },
    reducers: {
        getOrders(state,action){
            const orders = action.payload;
            state.orders = orders;
        }
    }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;