import { configureStore } from "@reduxjs/toolkit";
import theme from './slices/theme'
import user from './slices/user'
const store = configureStore({
    reducer: {
        theme,
        user
    }
})

export default store;