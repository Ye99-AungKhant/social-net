import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const friendRequestFetch = createAsyncThunk(
    "friendRequestFetch",
    async (payload: any, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/api/friend/requested`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const dataFromServer = await response.json()
        const { success, data } = dataFromServer
        return data
    }
)

export const friendRequestAccept = createAsyncThunk(
    "friendRequestAccept",
    async (payload: number, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/api/friend/accept`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 'id': payload }),
        })
        const dataFromServer = await response.json()
        const { success, data } = dataFromServer
        return data
    }
)

export const friendRequestDecline = createAsyncThunk(
    "friendRequestDecline",
    async (payload: number, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/api/friend/decline`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 'id': payload }),
        })
        const dataFromServer = await response.json()
        const { success, data } = dataFromServer
        return data
    }
)

