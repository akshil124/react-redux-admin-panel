import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    blogs : []
}
export const submitBlog = createAsyncThunk(
    "blog/createblog",
    async (data)  =>{
        const response = await axios.post(`http://localhost:8000/blogs`,data)
        return response.data
    }
)
export const getAllBlogs = createAsyncThunk(
    "blog/getblogs",
    async () => {
        const response = await axios.get(`http://localhost:8000/blogs`)
        return response.data
    }
)
const handleBlog = createSlice({
    name : "blog",
    initialState : initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(submitBlog.fulfilled,()=>{

        })
        builder.addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.blogs = action.payload
        })
    }
})

export default handleBlog.reducer