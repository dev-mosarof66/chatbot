import { configureStore } from "@reduxjs/toolkit";
import theme from './slices/theme'
const store = configureStore({
    reducer: {
        theme
    }
})

export default store;