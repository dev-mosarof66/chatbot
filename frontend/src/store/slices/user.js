import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        selectedChat: 0,
        chatHistory: []
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        setChatHistory: (state, action) => {
            state.chatHistory = action.payload
        },
        updateChatHistory: (state, action) => {
            state.chatHistory.push(action.payload)
        }
    }
})
export const { setUser, setSelectedChat,setChatHistory,updateChatHistory } = userSlice.actions
export default userSlice.reducer