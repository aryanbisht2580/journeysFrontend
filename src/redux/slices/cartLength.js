import { createSlice } from "@reduxjs/toolkit"

let initialState={
    cartLength:0
}
const cartLengthSlice=createSlice(
    {
        name:"cartLength",
        initialState,
        reducers:{
            set:(state,action)=>{
                state.cartLength=action.payload;
            }
        }
    }
)
export const cartLengthReducer=cartLengthSlice.reducer;
export const cartLengthAction=cartLengthSlice.actions;
export const cartLengthSelector=(state)=>state.cartLengthReducer.cartLength;