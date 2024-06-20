import { createSlice } from "@reduxjs/toolkit"

let initialState={
    cart:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}
const cartSlice=createSlice(
    {
        name:"cart",
        initialState,
        reducers:{
            add:(state,action)=>{
                state.cart=[...state.cart,action.payload];
                localStorage.setItem('cart',JSON.stringify(state.cart));
            },
            remove:(state,action)=>{
                console.log(action.payload.size)
                state.cart = state.cart.filter((e) => !(e._id === action.payload.id && e.selectedSize === action.payload.size));

                localStorage.setItem('cart',JSON.stringify(state.cart));
            },
            clear:(state,action)=>{
                state.cart=[];
                localStorage.setItem('cart',JSON.stringify(state.cart));
            },
            setCount:(state,action)=>{
                const changedc=action.payload;
                
                state.cart=state.cart.map((c)=>{
                    if(changedc._id==c._id && changedc.selectedSize==c.selectedSize){
                        return changedc;
                    }
                    else{
                        return c
                    }
                })
                
            }
        }
    }
)
export const cartReducer=cartSlice.reducer;
export const cartAction=cartSlice.actions;
export const cartSelector=(state)=>state.cartReducer.cart;