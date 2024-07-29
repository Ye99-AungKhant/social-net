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
        const { auth, friendRequestNoti, friendList, chatNoti } = dataFromServer
        thunkApi.dispatch(authUser(auth))
        thunkApi.dispatch(setChatNoti(chatNoti))
        thunkApi.dispatch(setfriendRequestNoti(friendRequestNoti))
        thunkApi.dispatch(setFriendList(friendList))
        console.log(dataFromServer);
    }
)

const initialState: AppSlice = {
    notifications: null,
    chatNoti: null,
    friendList: null,
    friendRequestNoti: null,
}

export const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setChatNoti: (state, action: PayloadAction<any>) => {
            state.chatNoti = action.payload
        },
        removeChatNoti: (state, action: PayloadAction<any>) => {
            if (state.chatNoti)
                state.chatNoti = state.chatNoti.filter((noti) => (noti.sender_id !== action.payload))
        },
        setfriendRequestNoti: (state, action: PayloadAction<any>) => {
            state.friendRequestNoti = action.payload
        },
        setFriendList: (state, action: PayloadAction<UserDetail[]>) => {
            state.friendList = [...action.payload]
        }
    }
})

export const { setChatNoti, removeChatNoti, setfriendRequestNoti, setFriendList } = appDataSlice.actions
export default appDataSlice.reducer