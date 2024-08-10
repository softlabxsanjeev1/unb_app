const { createSlice } = require('@reduxjs/toolkit')

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        data: [],
    },
    reducers: {
        addItemToWishList(state, action) {
            let tempData = state.data;
            let isItemExist = false;
            tempData.map(item => {
                if (item.id == action.payload.id) {
                    isItemExist = true;
                    tempData = state.data;
                }
            });
            if (!isItemExist) {
                tempData.push(action.payload);
            }
            state.data = tempData;
        },
        //remove item from wishlist
        removeItemFromWishList(state, action) {
            let tempData = state.data;
            tempData.splice(action.payload, 1)
            state.data = tempData;
        },
    },
});
export const { addItemToWishList, removeItemFromWishList } = WishlistSlice.actions;
export default WishlistSlice.reducer;