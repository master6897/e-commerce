import { createSlice } from '@reduxjs/toolkit';
let state =  {
    products: [],
    totalAmount: 0,
    totalCost: 0
};
if(localStorage.getItem('cart') !== null){
    state = JSON.parse(localStorage.getItem('cart'));
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: state,
    reducers: {
        addItemToCart(state,action){
            const item = action.payload;
            const itemExists = state.products.find((product) => product.id === item.id);
            state.totalAmount++;
            state.totalCost += parseFloat(item.price);
            if(itemExists){
                itemExists.amount++;
            }else{
                state.products.push(item);
            }
            const cartData = {
                ...state
            }
            localStorage.setItem('cart', JSON.stringify(cartData));
        },
        removeItemFromCart(state,action){
            const item = action.payload;
            const itemExists = state.products.find((product) => product.id === item.id);
            state.totalAmount--;
            state.totalCost -= parseFloat(itemExists.price);
            if(itemExists.amount !== 1){
                itemExists.amount-= 1;
            }else{
                state.products = state.products.filter((product) => product.id !== item.id);
            }
            const cartData = {
                ...state
            };
            console.log(cartData);
            localStorage.setItem('cart', JSON.stringify(cartData));
            if(state.totalAmount === 0){
                localStorage.removeItem('cart');
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;