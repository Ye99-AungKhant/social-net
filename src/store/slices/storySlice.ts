import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Story, StorySlice } from "../../types/story";
import { PostCreate } from "../../types/post";
import { config } from './../../config/index';

export const storyFetch = createAsyncThunk(
    'storyFetch',
    async (payload: number, thunkApi) => {

        const response = await fetch(`${config.ApiBaseUrl}/story?page=${payload}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const dataFromServer = await response.json();
        const { data } = dataFromServer
        thunkApi.dispatch(setStory(data))
        return data

    }
)

export const createStory = createAsyncThunk(
    'createstory',
    async (payload: PostCreate, thunkApi) => {

        const response = await fetch(`${config.ApiBaseUrl}/story`, {
            method: "Post",
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
        thunkApi.dispatch(setStory(data))
        return data

    }
)

const initialState: StorySlice = {
    stories: [],
    isLoading: false,
    onError: false
}
export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStory: (state, action: PayloadAction<Story[]>) => {
            state.stories = [...state.stories, ...action.payload]
        },
    }
})

export const { setStory } = storySlice.actions

export default storySlice.reducer