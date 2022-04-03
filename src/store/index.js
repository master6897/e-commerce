import {configureStore} from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';
import authSlice from './auth-slice';
import ordersSlice from './orders-slice';

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer,
        auth: authSlice.reducer,
        orders: ordersSlice.reducer
    }
})

export default store;