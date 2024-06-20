import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice"
import { searchReducer } from "./slices/searchSlice"
import { cartReducer } from "./slices/cartSlice"
import { cartLengthReducer } from "./slices/cartLength"

export const store=configureStore({
    reducer:{authReducer,searchReducer,cartReducer,cartLengthReducer}
})