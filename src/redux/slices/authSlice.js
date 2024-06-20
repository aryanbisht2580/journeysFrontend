
import { createSlice } from "@reduxjs/toolkit"
const localAuth=JSON.parse(localStorage.getItem("auth"))
let initialState={
    auth:{user:localAuth?localAuth.user:null,token:localAuth?localAuth.token:"",code:""}
}
const authSlice=createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            set:(state,action)=>{
                state.auth={...state.auth,user:action.payload.user,token:action.payload.token};
            },
            clearAuth:(state,action)=>{
                state.auth={user:null,token:"",code:""}
                localStorage.removeItem("auth")
            },
            setCode:(state,action)=>{
                console.log(action.payload.code);
                state.auth={...state.auth,code:action.payload.code,codeUser:action.payload.user};
            },
            clearCode:(state,action)=>{
                state.auth={...state.auth,codeUser:"",user:null};
            },
            update:(state,action)=>{
                console.log(action.payload)
                state.auth={...state.auth,user:action.payload};
            }
        }
    }
)
export let authReducer=authSlice.reducer;
export let authSelector=(state)=>state.authReducer.auth;
export let authActons=authSlice.actions