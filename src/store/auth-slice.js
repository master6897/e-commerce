import { createSlice } from '@reduxjs/toolkit';

let initialState = JSON.parse(localStorage.getItem('credentials'));
if(initialState === undefined || initialState === null){
    initialState = {
        isLoggedIn: false,
        token: '',
        expires: 0
    }
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.idToken;
            state.expires = action.payload.expiresIn;
            state.email = action.payload.email;
            localStorage.setItem('credentials', JSON.stringify(state));
        },
        logout(state){
            localStorage.removeItem('credentials');
            state.isLoggedIn = false;
            state.token = '';
            state.expires = 0;
        },
    }
})
export const authActions = authSlice.actions;
export default authSlice;