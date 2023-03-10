import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:null,
    user:{},
    isLoggedIn:false
}

const userSlice  = createSlice({
    name:"user",
    initialState,
    reducers:{
    _login:(state,action)=>{
        // console.log("stare ===",state)
        return {...state,isLoggedIn:true,token:action.payload.token,user:action.payload.data}
    },
    _signup:(state,action)=>{
        return {...state,isLoggedIn:true,user:action.payload}

    },
    _logout:(state)=>{
        return {...state,isLoggedIn:false,user:{},token:null}
    }
}
})


export const {_login,_logout,_signup}  = userSlice.actions

export default userSlice.reducer;