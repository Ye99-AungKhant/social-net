import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../types/app';
import { PostCreate } from '../../types/post';
import { config } from './../../config/index';
import { profileDetail, setProfilePostLike, setProfilePostUnLike } from './profileDataSlice';
import { setSearchPostLike, setSearchPostUnLike } from './appSlice';

export const postFetch = createAsyncThunk(
    'postFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/post?page=${payload}`, {
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

export const userPostFetch = createAsyncThunk(
    'userPostFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/post/${payload}`, {
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
        return data

    }
)

export const createPost = createAsyncThunk(
    'createpost',
    async (payload: PostCreate, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/post`, {
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
    async (payload: any, thunkApi) => {
        console.log('post with filter', payload);

        const response = await fetch(`${config.ApiBaseUrl}/post/like`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'postId': payload.postId }),
        });
        const dataFromServer = await response.json();
        const { liked, data } = dataFromServer
        if (payload.filterPost == 'posts') {
            if (liked) {
                thunkApi.dispatch(setLike(data))
            } else {
                thunkApi.dispatch(setUnLike(data))
            }
        } else if (payload.filterPost == 'friendPosts') {
            if (liked) {
                thunkApi.dispatch(setFriendPostLike(data))
            } else {
                thunkApi.dispatch(setFriendPostUnLike(data))
            }
        } else if (payload.filterPost == 'searchPost') {
            if (liked) {
                thunkApi.dispatch(setSearchPostLike(data))
            } else {
                thunkApi.dispatch(setSearchPostUnLike(data))
            }
        } else if (payload.filterPost == 'ProfilePost') {
            if (liked) {
                thunkApi.dispatch(setProfilePostLike(data))
            } else {
                thunkApi.dispatch(setProfilePostUnLike(data))
            }
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
        setFriendPostLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.friendPosts.map((post) => {
                if (post.id === postId) {
                    post.like_count += 1;
                    post.liked.push(action.payload)
                }
                return post;
            })
        },
        setFriendPostUnLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.friendPosts.map((post) => {
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
        setFriendPostCommentCountIncrease: (state, action: PayloadAction<number>) => {
            state.friendPosts.map((post) => (post.id === action.payload ? post.comment_count += 1 : post))
        },
        setFriendPostCommentCountDecrease: (state, action: PayloadAction<number>) => {
            console.log(action.payload);

            state.friendPosts.map((post) => (post.id === action.payload ? post.comment_count -= 1 : post))
        },
    },
})

export const { setPost, setFriendPost, setLike, setUnLike, setFriendPostLike,
    setFriendPostUnLike, setCommentCountIncrease, setCommentCountDecrease,
    setFriendPostCommentCountIncrease, setFriendPostCommentCountDecrease } = postCreateSlice.actions
export default postCreateSlice.reducer