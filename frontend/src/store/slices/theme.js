import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isDarkMode: 'light'
}
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.isDarkMode === 'light') {
                state.isDarkMode = 'dark'
            } else {
                state.isDarkMode = 'light'
            }
        }
    }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer