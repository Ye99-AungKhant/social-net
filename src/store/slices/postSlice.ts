import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { Post } from '../../types/app';
import { PostCreate } from '../../types/post';

export const createPost = createAsyncThunk(
    'createpost',
    async (payload: PostCreate, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/post`, {
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
        thunkApi.dispatch(setPost(data))
    }
)

export const postLike = createAsyncThunk(
    'post/like',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/post/like`, {
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
        console.log(dataFromServer);

    }
)

interface PostSlice {
    posts: Post[]
    isLoading?: boolean;
    error?: string | null;
}

const initialState: PostSlice = {
    posts: [],
    isLoading: false,
    error: null
}

export const postCreateSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...action.payload, ...state.posts]
        },
    },
})

export const { setPost } = postCreateSlice.actions
export default postCreateSlice.reducer