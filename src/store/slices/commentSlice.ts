import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comments, CommentSlice, CreateComment } from '../../types/comment';

export const fetchComment = createAsyncThunk(
    'fetchComment',
    async (payload: number, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/comment`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const dataFromServer = await response.json();
        const { data } = dataFromServer
        thunkApi.dispatch(setComment(data))
    }
)

export const createComment = createAsyncThunk(
    'createComment',
    async (payload: CreateComment, thunkApi) => {
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
        thunkApi.dispatch(setComment(data))
    }
)

const initialState: CommentSlice = {
    comments: [],
    isLoading: false,
    error: null
}

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComment: (state, action: PayloadAction<Comments[]>) => {
            state.comments = [...state.comments, ...action.payload]
        },
        removeComment: (state) => {
            state.comments = []
        }
    },
})

export const { setComment, removeComment } = commentSlice.actions
export default commentSlice.reducer