import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppSlice, Noti, Post, UserDetail } from '../../types/app'
import { setPost } from './postSlice'
import { authUser } from './userSlice'
import { PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

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
        const { auth, friendRequestNoti, friendList, chatNoti, notification, chatUserList } = dataFromServer
        thunkApi.dispatch(authUser(auth))
        thunkApi.dispatch(setNotification(notification))
        thunkApi.dispatch(setChatNoti(chatNoti))
        thunkApi.dispatch(setfriendRequestNoti(friendRequestNoti))
        thunkApi.dispatch(setFriendList(friendList))
        thunkApi.dispatch(setChatUserList(chatUserList))
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

export const markAsReadAllNoti = createAsyncThunk(
    'app/markAsReadAllNoti',
    async (payload: number[], thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/notification/markAsReadAll`, {
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
            thunkApi.dispatch(updateAllNotiAsRead(payload))
    }
)

export const search = createAsyncThunk(
    'search',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/search?search=${payload}`, {
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
        const { users, posts } = dataFromServer
        console.log(dataFromServer);

        thunkApi.dispatch(setSearchData(dataFromServer))
    }
)

export const fetchPhotos = createAsyncThunk(
    'fetchPhotos',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/photos?page=${payload}`, {
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
        const { success, data } = dataFromServer
        if (success)
            return data
    }
)

export const updateLastOnline = createAsyncThunk(
    'updateLastOnline',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/user/updateLastOnline`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'userId': payload })
        })
    }
)

const initialState: AppSlice = {
    notifications: [],
    chatNoti: null,
    friendList: null,
    chatUserList: null,
    friendRequestNoti: null,
    onlineUser: [],
    searchUser: [],
    searchPost: [],
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
        updateAllNotiAsRead: (state, action: PayloadAction<number[]>) => {
            state.notifications = state.notifications.map((noti) => {
                if (action.payload.includes(noti.id)) {
                    return { ...noti, read: true };
                }
                return noti;
            });
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
        setChatUserList: (state, action: PayloadAction<UserDetail[]>) => {
            state.chatUserList = [...action.payload]
        },
        setOnlineUser: (state, action: PayloadAction<[]>) => {
            state.onlineUser = action.payload
        },
        setSearchData: (state, action: PayloadAction<any>) => {
            state.searchUser = [...action.payload.users]
            state.searchPost = [...action.payload.posts]
        },
        setSearchPostLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.searchPost.map((post) => {
                if (post.id === postId) {
                    post.like_count += 1;
                    post.liked.push(action.payload)
                }
                return post;
            })
        },
        setSearchPostUnLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.searchPost.map((post) => {
                if (post.id === postId) {
                    post.like_count -= 1;
                    post.liked.pop()
                }
                return post;
            })

        },
    }
})

export const { setNotification, updateNotification, updateAllNotiAsRead, setChatNoti, removeChatNoti, setfriendRequestNoti,
    setFriendList, setChatUserList, setOnlineUser, setSearchData, setSearchPostLike, setSearchPostUnLike } = appDataSlice.actions
export default appDataSlice.reducer