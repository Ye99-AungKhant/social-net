import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppSlice, Post, UserDetail } from '../../types/app'
import { setPost } from './postSlice'
import { authUser } from './userSlice'
import { PayloadAction } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'app/fetchData',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/app`, {
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
        const { auth, friendRequestNoti, friendList } = dataFromServer
        thunkApi.dispatch(authUser(auth))
        thunkApi.dispatch(setfriendRequestNoti(friendRequestNoti))
        thunkApi.dispatch(setFriendList(friendList))
        console.log(dataFromServer);
    }
)

const initialState: AppSlice = {
    notifications: null,
    chats: null,
    friendList: null,
    friendRequestNoti: null,
}

export const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setfriendRequestNoti: (state, action: PayloadAction<any>) => {
            state.friendRequestNoti = action.payload
        },
        setFriendList: (state, action: PayloadAction<UserDetail[]>) => {
            state.friendList = [...action.payload]
        }
    }
})

export const { setfriendRequestNoti, setFriendList } = appDataSlice.actions
export default appDataSlice.reducer