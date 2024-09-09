import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitingfriendLists } from "./profileDataSlice";
import { config } from './../../config/index';

export const friendRequestFetch = createAsyncThunk(
    "friendRequestFetch",
    async (payload: any, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${config.ApiBaseUrl}/friend/requested`, {
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

export const waitingFriend = createAsyncThunk(
    "waitingFriend",
    async (payload: any, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${config.ApiBaseUrl}/friend/waiting`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const dataFromServer = await response.json()
        const { success, waitingfriendList } = dataFromServer
        return waitingfriendList
    }
)

export const friendRequestAccept = createAsyncThunk(
    "friendRequestAccept",
    async (payload: number, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${config.ApiBaseUrl}/friend/accept`, {
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
        const response = await fetch(`${config.ApiBaseUrl}/friend/decline`, {
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

export const waitingFriendCancel = createAsyncThunk(
    "waitingFriendCancel",
    async (payload: number, thunkApi) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${config.ApiBaseUrl}/unfriend/${payload}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
    }
)
