const { createSlice } = require('@reduxjs/toolkit')

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
    },
    reducers: {
        addItemToCart(state, action) {
            let tempData = state.data;
            let isItemExist = false;
            tempData.map(item => {
                if (item.id == action.payload.id) {
                    isItemExist = true;
                    item.qty = item.qty + 1;
                }
            });
            if (!isItemExist) {
                tempData.push(action.payload);
            }
            state.data = tempData;
        },

        // remove item
        reduceItemFromCart(state, action) {
            let tempData = state.data;
            tempData.map(item => {
                if (item.id == action.payload.id) {
                    item.qty = item.qty - 1;
                }
            });
            state.data = tempData;
        },

        removeItemFromCart(state, action) {
            let tempData = state.data;
            tempData.splice(action.payload, 1)
            state.data = tempData;
        },

        cleanCart: (state) => {
            state.data = [];
        }
    },
});
export const selectCartTotal = state => state.cart.items.reduce((total, item) => total = total += item.price, 0)
export const { addItemToCart, reduceItemFromCart, removeItemFromCart, cleanCart } = CartSlice.actions;
export default CartSlice.reducer;