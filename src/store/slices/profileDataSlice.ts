import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserSlice } from "../../types/user";
import { ProfileDataDetail, ProfileDataSlice } from "../../types/profileData";
import { setPost } from "./postSlice";
import { Post } from "../../types/app";


export const profilePostFetch = createAsyncThunk(
    'profilePostFetch',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/profile/post/${payload.profileId}?&page=${payload.page}`, {
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
        const response = await fetch(`http://localhost:8000/api/profile/data/${payload}`, {
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
        const { success, profileData, friendList } = dataFromServer
        thunkApi.dispatch(profileDetail(profileData))
        thunkApi.dispatch(friendLists(friendList))
    }
)

export const unfriend = createAsyncThunk(
    'unfriend',
    async (payload: any, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/unfriend/${payload}`, {
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
        }
    }
)


const initialState: ProfileDataSlice = {
    posts: [],
    profileDetail: null,
    friendLists: []
}
export const profileDataSlice = createSlice({
    name: 'profileDataDetail',
    initialState,
    reducers: {
        setProfilePost: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...state.posts, ...action.payload]
        },
        profileDetail: (state, action: PayloadAction<ProfileDataDetail>) => {
            state.profileDetail = action.payload
        },
        friendLists: (state, action: PayloadAction<ProfileDataDetail[]>) => {
            state.friendLists = [...action.payload]
        },
        removePost: (state) => {
            state.posts = []
        },
        removeFriend: (state, action: PayloadAction<number>) => {
            state.friendLists = state.friendLists.filter((friendlist) => (friendlist.id !== action.payload))
        }
    },
})

export const { setProfilePost, profileDetail, friendLists, removePost, removeFriend } = profileDataSlice.actions

export default profileDataSlice.reducer