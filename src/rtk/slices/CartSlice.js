import { createSlice } from "@reduxjs/toolkit";

const storedItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : 
                    {
                        cartItems: [],
                        totalAmount:0,
                        totalQuantity:0
                    };
const initialState = 
    {
        cartItems : storedItems.cartItems ,
        totalAmount:storedItems.totalAmount ,
        totalQuantity:storedItems.totalQuantity
    };


const cartSlice = createSlice({
    name:'cartSlice',
    initialState,
    reducers:{

        addItem:(state,action)=>{
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item)=> item.name === newItem.name);
            state.totalQuantity++;

            if(!existingItem){
                state.cartItems.push({...newItem.fields , name: newItem.name , quantity:1 , totalPrice:newItem.price});
            }else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.price + newItem.price
            }
            state.totalAmount = state.cartItems.reduce((acc,item)=>{
                acc += Number(item.price.stringValue) * Number(item.quantity)
                return acc;
            },0)
            localStorage.setItem('cart' , JSON.stringify({cartItems:state.cartItems , totalAmount: state.totalAmount , totalQuantity: state.totalQuantity}));
        },

        deleteItem: (state,action)=>{
            const id = action.payload;
            const existingItem = state.cartItems.find((item)=> item.name === id);

            if(existingItem){
                state.cartItems = state.cartItems.filter(item => item.name !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
            state.totalAmount = state.cartItems.reduce((acc,item)=>{
                acc += Number(item.price.stringValue) * Number(item.quantity)
                return acc;
            },0)
            localStorage.setItem('cart' , JSON.stringify({cartItems:state.cartItems , totalAmount: state.totalAmount , totalQuantity: state.totalQuantity}));
        },

        decreseItem: (state,action)=>{
            const id = action.payload;
            const existingItem = state.cartItems.find((item)=> item.name === id);

            if(existingItem && existingItem.quantity > 1){
                existingItem.quantity--
                state.totalQuantity--;
            }
            state.totalAmount = state.cartItems.reduce((acc,item)=>{
                acc += Number(item.price.stringValue) * Number(item.quantity)
                return acc;
            },0)
            localStorage.setItem('cart' , JSON.stringify({cartItems:state.cartItems , totalAmount: state.totalAmount , totalQuantity: state.totalQuantity}));
        },
        
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;