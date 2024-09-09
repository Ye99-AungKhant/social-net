import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserSlice } from "../../types/user";
import { ProfileAboutUs, ProfileDataDetail, ProfileDataSlice } from "../../types/profileData";
import { setPost } from "./postSlice";
import { Post } from "../../types/app";
import { PostEditData } from "../../types/post";
import { config } from './../../config/index';


export const profilePostFetch = createAsyncThunk(
    'profilePostFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/profile/post/${payload.profileId}?&page=${payload.page}`, {
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
        thunkApi.dispatch(setProfilePost(data))
        return data
    }
)

export const profileDataFetch = createAsyncThunk(
    'profileDataFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/profile/data/${payload}`, {
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
        const { success, profileData, friendList, waitingfriendList, aboutus } = dataFromServer
        thunkApi.dispatch(profileDetail(profileData))
        thunkApi.dispatch(friendLists(friendList))
        thunkApi.dispatch(waitingfriendLists(waitingfriendList))
        thunkApi.dispatch(setAboutUs(aboutus))
    }
)

export const unfriend = createAsyncThunk(
    'unfriend',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/unfriend/${payload}`, {
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
        const { success } = dataFromServer
        if (success) {
            thunkApi.dispatch(removeFriend(payload))
            thunkApi.dispatch(removeWaitingFriend())
        }
    }
)

export const addfriend = createAsyncThunk(
    'addfriend',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/friend/request/${payload}`, {
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
        thunkApi.dispatch(waitingfriendLists(data))
    }
)

export const updateBio = createAsyncThunk(
    'profile/updateBio',
    async (payload: string, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/profile/bio`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'bio': payload })
        })
        const dataFromServer = await response.json()
        const { success } = dataFromServer
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async (payload: PostEditData, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/post`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(payload),
        });
        const dataFromServer = await response.json();
        const { success, data } = dataFromServer
        thunkApi.dispatch(updateProfilePost(data))
        console.log('post with image', payload);
        return success
    }
)

export const deletePostImage = createAsyncThunk(
    'deletePostImage',
    async (payload: string, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/post/media/delete`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'media': payload })
        });
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async (payload: number, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/post/delete/${payload}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const dataFromServer = await response.json();
        const { success } = dataFromServer
        if (success) {
            thunkApi.dispatch(removeProfilePost(payload))
        }
    }
)

export const updateProfile = createAsyncThunk(
    'profile/update',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/profile/update`, {
            method: "PATCH",
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
        const { success, data } = dataFromServer
        thunkApi.dispatch(profileDetail(data))
        return success
    }
)

export const createAboutus = createAsyncThunk(
    'aboutus/create',
    async (payload: any, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/profile/aboutus`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'data': payload })
        })
        const dataFromServer = await response.json()
        const { success, data } = dataFromServer
        if (success)
            thunkApi.dispatch(setAboutUs(data))
    }
)

export const deleteAboutUs = createAsyncThunk(
    'aboutUs/delete',
    async (payload: number, thunkApi) => {
        const response = await fetch(`${config.ApiBaseUrl}/profile/aboutus/${payload}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const dataFromServer = await response.json()
        const { success } = dataFromServer
        if (success)
            thunkApi.dispatch(replaceAboutUs(payload))
    }
)


const initialState: ProfileDataSlice = {
    posts: [],
    profileDetail: null,
    friendLists: [],
    waitingfriendLists: [],
    aboutUs: [],
}
export const profileDataSlice = createSlice({
    name: 'profileDataDetail',
    initialState,
    reducers: {
        setProfilePost: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...state.posts, ...action.payload]
        },
        updateProfilePost: (state, action: PayloadAction<Post>) => {
            state.posts = state.posts.map((post) => post.id == action.payload.id ? action.payload : post);
        },
        removeProfilePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((post) => (post.id !== action.payload))
        },
        profileDetail: (state, action: PayloadAction<ProfileDataDetail>) => {
            state.profileDetail = action.payload
        },
        friendLists: (state, action: PayloadAction<ProfileDataDetail[]>) => {
            state.friendLists = action.payload
        },
        waitingfriendLists: (state, action: PayloadAction<any[]>) => {
            state.waitingfriendLists = action.payload
        },
        removePost: (state) => {
            state.posts = []
        },
        removeFriend: (state, action: PayloadAction<number>) => {
            state.friendLists = state.friendLists.filter((friendlist) => (friendlist.id !== action.payload))
        },
        removeWaitingFriend: (state) => {
            state.waitingfriendLists = []
        },
        setAboutUs: (state, action: PayloadAction<ProfileAboutUs[]>) => {
            state.aboutUs = [...action.payload, ...state.aboutUs]
        },
        removeAboutUs: (state) => {
            state.aboutUs = []
        },
        replaceAboutUs: (state, action: PayloadAction<number>) => {
            state.aboutUs = state.aboutUs.filter((list) => (list.id !== action.payload))
        },
        setProfilePostLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.posts.map((post) => {
                if (post.id === postId) {
                    post.like_count += 1;
                    post.liked.push(action.payload)
                }
                return post;
            })
        },
        setProfilePostUnLike: (state, action: PayloadAction<any>) => {
            const postId = action.payload.post_id
            state.posts.map((post) => {
                if (post.id === postId) {
                    post.like_count -= 1;
                    post.liked.pop()
                }
                return post;
            })

        },
        setProfilePostCommentCountIncrease: (state, action: PayloadAction<number>) => {
            state.posts.map((post) => (post.id === action.payload ? post.comment_count += 1 : post))
        },
        setProfilePostCommentCountDecrease: (state, action: PayloadAction<number>) => {
            state.posts.map((post) => (post.id === action.payload ? post.comment_count -= 1 : post))
        },
    },
})

export const { setProfilePost, profileDetail, friendLists, waitingfriendLists, removePost,
    removeFriend, removeWaitingFriend, setAboutUs, removeAboutUs, replaceAboutUs,
    setProfilePostLike, setProfilePostUnLike, updateProfilePost, removeProfilePost } = profileDataSlice.actions

export default profileDataSlice.reducer