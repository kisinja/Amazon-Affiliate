import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import wishListReducer from './redux/wishListSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        wishList: wishListReducer,
    },
});

export default store;