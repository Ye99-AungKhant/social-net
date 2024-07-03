import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlice'
import userReducer from './slices/userSlice'
import signInReducer from './slices/signInSlice'

export const store = configureStore({
    reducer: {
        posts: postReducer,
        signUp: userReducer,
        signIn: signInReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch