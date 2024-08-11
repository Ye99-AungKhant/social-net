import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppSlice, Noti, Post, UserDetail } from '../../types/app'
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
        const { auth, friendRequestNoti, friendList, chatNoti, notification } = dataFromServer
        thunkApi.dispatch(authUser(auth))
        thunkApi.dispatch(setNotification(notification))
        thunkApi.dispatch(setChatNoti(chatNoti))
        thunkApi.dispatch(setfriendRequestNoti(friendRequestNoti))
        thunkApi.dispatch(setFriendList(friendList))
        console.log(dataFromServer);
    }
)

export const fetchNotification = createAsyncThunk(
    'app/fetchNoti',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/notification`, {
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
        const { notification } = dataFromServer
        thunkApi.dispatch(setNotification(notification))
    }
)

export const notiRead = createAsyncThunk(
    'app/notiread',
    async (payload: number, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/notification`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'notiId': payload })
        })
        const dataFromServer = await response.json()
        const { success } = dataFromServer
        if (success)
            thunkApi.dispatch(updateNotification(payload))
    }
)

const initialState: AppSlice = {
    notifications: [],
    chatNoti: null,
    friendList: null,
    friendRequestNoti: null,
    onlineUser: [],
}

export const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<Noti[]>) => {
            state.notifications = [...action.payload]
        },
        updateNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.map((noti) =>
                noti.id === action.payload ? { ...noti, read: true } : noti
            );
        },
        setChatNoti: (state, action: PayloadAction<any>) => {
            if (state.chatNoti != null) {
                state.chatNoti = [...state.chatNoti, ...action.payload]
            } else {
                state.chatNoti = action.payload
            }
        },
        removeChatNoti: (state, action: PayloadAction<any>) => {
            if (state.chatNoti)
                state.chatNoti = state.chatNoti.filter((noti) => (noti.sender_id != action.payload))
        },
        setfriendRequestNoti: (state, action: PayloadAction<any>) => {
            state.friendRequestNoti = action.payload
        },
        setFriendList: (state, action: PayloadAction<UserDetail[]>) => {
            state.friendList = [...action.payload]
        },
        setOnlineUser: (state, action: PayloadAction<[]>) => {
            state.onlineUser = action.payload
        },
    }
})

export const { setNotification, updateNotification, setChatNoti, removeChatNoti, setfriendRequestNoti, setFriendList, setOnlineUser } = appDataSlice.actions
export default appDataSlice.reducer