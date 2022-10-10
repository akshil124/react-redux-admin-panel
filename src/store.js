import { configureStore } from "@reduxjs/toolkit";
import handleusers from "./reducers/user";
import handleBlog from "./reducers/blog"
export const store = configureStore({
    reducer : {
        users : handleusers,
        blog : handleBlog
    }
})