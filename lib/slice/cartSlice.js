import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
                return;
            }
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find((item) => item.id === id);
            if (item) {
                if (quantity <= 0) {
                    state.cart = state.cart.filter((item) => item.id !== id);
                    return;
                }
                item.quantity = quantity;
            }
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;