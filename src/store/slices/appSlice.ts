import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppSlice, Post } from '../../types/app'
import { setPost } from './postSlice'
import { authUser } from './userSlice'

export const fetchData = createAsyncThunk(
    'app/fetchData',
    async (payload: any, thunkApi) => {
        const response = await fetch('http://localhost:8000/api/app', {
            method: "GET",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        const dataFromServer = await response.json()
        const { data, auth } = dataFromServer
        thunkApi.dispatch(setPost(data))
        thunkApi.dispatch(authUser(auth))
        console.log(dataFromServer);

    }
)

// const initialState: AppSlice = {
//     posts: [],
//     notifications: '',
//     chats: '',
//     friends: ''
// }

// export const appSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//         setPost: (state, action: PayloadAction<Post>) => {
//             state.posts = [...state.posts, action.payload]
//         },
//     },
// })

// export const { setPost } = appSlice.actions
// export default appSlice.reducer