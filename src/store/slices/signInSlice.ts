import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInSlice, UserSignIn, signInUserPayload } from "../../types/user";
import { authUser } from "./userSlice";

export const signInUser = createAsyncThunk(
    'signin',
    async (payload: UserSignIn, thunkApi) => {
        const { onSuccess, onError } = payload
        const response = await fetch(`http://localhost:8000/api/signin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({ ...payload }),
        });
        const dataFromServer = await response.json();
        if (!dataFromServer.success) {
            onError && onError()
        }
        const { access_token, user_data } = dataFromServer.data
        localStorage.setItem('token', access_token)
        let auth = { id: user_data.id, name: user_data.name, profile: user_data.profile }
        thunkApi.dispatch(authUser(auth))
        onSuccess && onSuccess()
    }
)

export const signInGoogle = createAsyncThunk(
    'signInGoogle',
    async (payload: any, thunkApi) => {
        const { onSuccess, onError, email, name } = payload
        const response = await fetch(`http://localhost:8000/api/signin/google`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({ 'email': email, 'name': name }),
        });
        const dataFromServer = await response.json();
        if (!dataFromServer.success) {
            onError && onError()
        }
        console.log(dataFromServer);

        const { access_token, user_data } = dataFromServer.data
        localStorage.setItem('token', access_token)
        let auth = { id: user_data.id, name: user_data.name, profile: user_data.profile }
        thunkApi.dispatch(authUser(auth))
        onSuccess && onSuccess()
    }
)


const initialState: SignInSlice = {
    user: [],
    onError: null,
}
export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        onError: (state, action: PayloadAction<signInUserPayload>) => {
            state.onError = action.payload
        }
    }
})

export const { onError } = signInSlice.actions

export default signInSlice.reducer