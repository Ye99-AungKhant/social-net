import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlice'
import userReducer from './slices/userSlice'
import signInReducer from './slices/signInSlice'
import commentReducer from './slices/commentSlice'
import storyReducer from './slices/storySlice'
import profileDataReducer from './slices/profileDataSlice'
import appReducer from './slices/appSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        stories: storyReducer,
        posts: postReducer,
        comments: commentReducer,
        auth: userReducer,
        signIn: signInReducer,
        profileData: profileDataReducer,
        chat: chatReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch