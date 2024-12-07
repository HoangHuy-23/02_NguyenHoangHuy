import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters) => {
        const url = new URL('https://645333b3e9ac46cedf1f6051.mockapi.io/api/product');
        url.searchParams.append('type', filters.type);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null,
    type: 'vegetable'
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            });
    },

});

export const { setType } = productSlice.actions;

export default productSlice.reducer;