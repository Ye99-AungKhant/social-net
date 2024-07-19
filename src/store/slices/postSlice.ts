import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types/app';
import { PostCreate } from '../../types/post';
import { config } from './../../config/index';

export const postFetch = createAsyncThunk(
    'postFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/post?page=${payload}`, {
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
        thunkApi.dispatch(setPost(data))
        console.log(dataFromServer);
        return data

    }
)

export const friendPostFetch = createAsyncThunk(
    'friendPostFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/friendPost?page=${payload}`, {
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
        thunkApi.dispatch(setFriendPost(data))
        console.log(dataFromServer);
        return data

    }
)

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
        console.log('post with image', payload);

    }
)

export const postLike = createAsyncThunk(
    'post/like',
    async (payload: number, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/post/like`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'postId': payload }),
        });
        const dataFromServer = await response.json();
        const { liked, data } = dataFromServer
        if (liked) {
            thunkApi.dispatch(setLike(data))
        } else {
            thunkApi.dispatch(setUnLike(data))
        }

    }
)

interface PostSlice {
    posts: Post[]
    friendPosts: Post[]
    isLoading?: boolean;
    error?: string | null;
}

const initialState: PostSlice = {
    posts: [],
    friendPosts: [],
    isLoading: false,
    error: null
}

export const postCreateSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...state.posts, ...action.payload]
        },
        setFriendPost: (state, action: PayloadAction<Post[]>) => {
            state.friendPosts = [...state.friendPosts, ...action.payload]
        },
        setLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.posts.map((post) => {
                if (post.id === postId) {
                    post.like_count += 1;
                    post.liked.push(action.payload)
                }
                return post;
            })
        },
        setUnLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.posts.map((post) => {
                if (post.id === postId) {
                    post.like_count -= 1;
                    post.liked.pop()
                }
                return post;
            })

        },
        setCommentCountIncrease: (state, action: PayloadAction<number>) => {
            state.posts.map((post) => (post.id === action.payload ? post.comment_count += 1 : post))
        },
        setCommentCountDecrease: (state, action: PayloadAction<number>) => {
            state.posts.map((post) => (post.id === action.payload ? post.comment_count -= 1 : post))
        },
    },
})

export const { setPost, setFriendPost, setLike, setUnLike, setCommentCountIncrease, setCommentCountDecrease } = postCreateSlice.actions
export default postCreateSlice.reducer