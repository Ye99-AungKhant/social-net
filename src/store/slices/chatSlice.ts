import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatSlice, Chat } from "../../types/chat";
import { removeChatNoti, setChatNoti } from "./appSlice";

export const chatfetch = createAsyncThunk(
    'chatfetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/chat/${payload}`, {
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
        const { data } = dataFromServer
        thunkApi.dispatch(setChatList(data))
        return data
    }
)

export const sendChatMessage = createAsyncThunk(
    'sendChatMessage',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/chat`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(payload)
        })
        const dataFromServer = await response.json()
        const { data } = dataFromServer
        thunkApi.dispatch(setNewChat(data))
        thunkApi.dispatch(setChatNoti([data]))
    }
)

export const chatNotiRemove = createAsyncThunk(
    'chatNotiRemove',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/chat/read`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'senderId': payload })
        })
        const dataFromServer = await response.json()
        const { data } = dataFromServer
        thunkApi.dispatch(removeChatNoti(payload))

    }
)

export const getlastMessage = createAsyncThunk(
    'lastMessage',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/last/chat`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const dataFromServer = await response.json()
        const { data } = dataFromServer
        console.log('lastmessage', data);

        thunkApi.dispatch(setLastMessage(data))

    }
)

const initialState: ChatSlice = {
    chats: [],
    lastMessage: [],
}
export const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setChatList: (state, action: PayloadAction<Chat[]>) => {
            state.chats = [...action.payload]
        },
        setNewChat: (state, action: PayloadAction<Chat>) => {
            state.chats = [...state.chats, action.payload]
        },
        setLastMessage: (state, action: PayloadAction<Chat[]>) => {
            state.lastMessage = [...action.payload]
        },
    },
})

export const { setChatList, setNewChat, setLastMessage } = chatSlice.actions

export default chatSlice.reducer