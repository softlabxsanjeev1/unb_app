const { configureStore } = require('@reduxjs/toolkit')
import WishlistReducer from './slices/WishlistSlice'
import CartReducer from './slices/CartSlice'
import AddressSlice from './slices/AddressSlice';



export const store = configureStore({
    reducer: {
        wishlist: WishlistReducer,
        cart: CartReducer,
        address: AddressSlice,
    },
});