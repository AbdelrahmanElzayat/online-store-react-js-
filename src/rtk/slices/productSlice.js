import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("productSlice/fetchProducts" , async()=>{
    const res = await fetch("https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/products/");
    const data = await res.json();
    return data.documents;
});

const initialState = 
{
    data : [],
    loading: true
};

const productSlice =  createSlice({
    initialState,
    name: "productSlice",
    reducers:{},

    extraReducers: (builder)=>{
        
        builder.addCase(fetchProducts.pending, (state,action)=>{
            state.loading = true;
        })

        builder.addCase(fetchProducts.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })

        builder.addCase(fetchProducts.rejected, (state,action)=>{
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
    }
})

export const {} = productSlice.actions;
export default productSlice.reducer;