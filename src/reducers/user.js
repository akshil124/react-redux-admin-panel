import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
const initialState = {
    users : [],
    user : {},
    err : false
}
export const handlesubmit = createAsyncThunk(
    "user/submituser",
    async (user)=>{
        const response = await axios.post("http://localhost:8000/users",user)
        if(response.status===201){
            toast.success("user sign-up successfuly")
        }
    }
)
export const handlelogin = createAsyncThunk(
    "user/checklogin",
    async (user)=>{
        const {email,password} = user
        const response = await axios.get(`http://localhost:8000/users?email=${email}&password=${password}`)
        return response.data
    }
)
export const getAllUser = createAsyncThunk(
    "users/getAllUsers",
    async () =>{
        const response = await axios.get("http://localhost:8000/users")
        return response.data 
    }
)
export const editprofile = createAsyncThunk(
    "user/edituser",
    async (data) =>{
        const id = data.id
        const response = await axios.put(`http://localhost:8000/users/${id}`,data)
        return response.data
    }
)


const handleusers = createSlice({
    name : "users",
    initialState : initialState,
    reducers:{
        checkuser : (state,action)=>{
            state.user = action.payload
        }
    } ,
    extraReducers : (builder)=>{
        builder.addCase(handlesubmit.pending,(state,action)=>{
        })
        builder.addCase(handlesubmit.fulfilled,(state,action)=>{
            console.log("complete submit");
        })
        builder.addCase(handlelogin.rejected,(state,action)=>{
            console.log("login rejected");
        })
        builder.addCase(handlelogin.pending,(state,action)=>{
        })
        builder.addCase(handlelogin.fulfilled,(state,action)=>{

            if(action.payload.length===1){
                localStorage.setItem("user",JSON.stringify({...action.payload[0]}))
                state.user = {...action.payload[0]}
            }
        })
        builder.addCase(getAllUser.fulfilled,(state,action)=>{
            state.users = action.payload
        })
        builder.addCase(editprofile.fulfilled,(state,action)=>{
            state.user = action.payload
            localStorage.setItem("user",JSON.stringify({...action.payload}))
        })
        
    }
})
export const {checkuser} = handleusers.actions
export default handleusers.reducer