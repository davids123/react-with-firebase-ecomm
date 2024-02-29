import { configureStore } from '@reduxjs/toolkit';
import { setupListeners} from '@reduxjs/toolkit/query/react';
import { apiService } from '../services/apiService';
import { cartSlice } from '../features/cartSlice';
import { authSlice } from '../features/authSlice';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { categoryService } from '../services/categoryService';
import { brandService } from '../services/brandService';
import { mediaService } from '../services/mediaService';

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        cart:cartSlice.reducer,
        [apiService.reducerPath]:apiService.reducer,
        [productService.reducerPath]:productService.reducer,
        [cartService.reducerPath]:cartService.reducer,
        [categoryService.reducerPath]:categoryService.reducer,
        [brandService.reducerPath]:brandService.reducer,
        [mediaService.reducerPath]:mediaService.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
            apiService.middleware,
            productService.middleware,
            cartService.middleware,
            categoryService.middleware,
            brandService.middleware,
            mediaService.middleware,
        ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);