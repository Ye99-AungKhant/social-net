import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CommentSlice } from '../../types/comment';

export const createComment = createAsyncThunk(
    'createComment',
    async (payload: CommentSlice, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/comment`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ ...payload }),
        });
        const dataFromServer = await response.json();
        const { data } = dataFromServer
        console.log(data);


    }
)