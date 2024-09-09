import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthUser, User, UserSlice } from "../../types/user";
import { googleLogout } from '@react-oauth/google';
import { config } from './../../config/index';

export const logOut = createAsyncThunk(
    'userLogout',
    async (payload: any, thunkApi) => {
        const token = localStorage.getItem('token')
        const { onSuccess } = payload
        const response = await fetch(`${config.ApiBaseUrl}/logout`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        googleLogout()
        localStorage.removeItem('token')
        onSuccess && onSuccess()
    }
)
export const signUpUser = createAsyncThunk(
    "signup",
    async (payload: User, thunkApi) => {
        console.log(payload);

        const { onSuccess } = payload
        const response = await fetch(`${config.ApiBaseUrl}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({ ...payload }),
        });
        const dataFromServer = await response.json();
        if (!dataFromServer.success) {
            thunkApi.dispatch(onError(dataFromServer.errors));
        }
        const { access_token, user_data } = dataFromServer.data
        localStorage.setItem('token', access_token)
        let auth = { id: user_data.id, name: user_data.name, profile: user_data.profile }
        thunkApi.dispatch(authUser(auth))
        onSuccess && onSuccess()

    }
);



const initialState: UserSlice = {
    user: [],
    authUser: null,
    onError: null,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authUser: (state, action: PayloadAction<AuthUser>) => {
            state.authUser = action.payload
        },
        onError: (state, action: PayloadAction<User>) => {
            state.onError = action.payload
        },
    },
})

export const { onError, authUser } = userSlice.actions

export default userSlice.reducer