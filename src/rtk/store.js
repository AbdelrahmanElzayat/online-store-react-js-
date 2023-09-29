import {configureStore} from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice';
import productSlice from './slices/productSlice';

export const store = configureStore({
    reducer:{
        cart: CartSlice,
        products: productSlice
    }
});