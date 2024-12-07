import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
    reducer: {
        // Define a top-level state field named `counter`, handled by `counterReducer`
        product: productReducer,
        cart: cartReducer
    },
});

export default store;