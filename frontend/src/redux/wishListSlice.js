import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishList: [],
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,

    reducers: {
        addToWishList: (state, action) => {
            const product = action.payload;

            if (!state.wishList.find(item => item._id === product._id)) {
                state.wishList.push(product);
            }
        },
        removeFromWishList: (state, action) => {
            const productId = action.payload;
            state.wishList = state.wishList.filter(item => item._id !== productId);
        },
        clearWishList: (state) => {
            state.wishList = [];
        },
    }
});

export const { addToWishList, removeFromWishList, clearWishList } = wishListSlice.actions;

export default wishListSlice.reducer;