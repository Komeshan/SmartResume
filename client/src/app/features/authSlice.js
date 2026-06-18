import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        loading: true
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token || state.token
            state.user = action.payload.user || state.user
        },
        logout: (state) => {
            state.token = '',
            state.user = null,
            localStorage.removeItem('token')
        },
        setLoading: (state, action) => {
            state.loading = action.payload  
        },
        updateLimits: (state, action) => {
            if (state.user) {
                state.user.aiUsage = action.payload
            }
        }
    }
})

export const {login, logout, setLoading, updateLimits} = authSlice.actions

export default authSlice.reducer