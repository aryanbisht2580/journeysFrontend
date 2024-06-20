import { createSlice } from "@reduxjs/toolkit";

let initialState={keyword:''};

const searchSlice=createSlice(
    {
        name:"search",
        initialState,
        reducers:{
            empty:(state,action)=>{
                state.keyword={};
            },
            change:(state,action)=>{
                state.keyword=action.payload
            }

        }
    }
)
export const searchReducer=searchSlice.reducer;
export const searchActions=searchSlice.actions;
export const searchSelecter=(state)=>state.searchReducer.keyword