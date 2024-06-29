import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { Post } from '../../types/post';


interface PostSlice {
    post: Post[]
    isLoading?: boolean;
    error?: string | null;
}

const initialState: PostSlice = {
    post: [],
    isLoading: false,
    error: null
}

export const postCreateSlice = createSlice({
    name: 'post/create',
    initialState,
    reducers: {
        setPost: (state) => {
            console.log(state);

        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.post = [...state.post, action.payload]
        }
    },
})

export const { setPost, addPost } = postCreateSlice.actions
export default postCreateSlice.reducer