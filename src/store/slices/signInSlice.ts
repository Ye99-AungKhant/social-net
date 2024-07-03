import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInSlice, UserSignIn, signInUserPayload } from "../../types/user";

export const signInUser = createAsyncThunk(
    'signin',
    async (payload: UserSignIn, thunkApi) => {
        const { onSuccess } = payload
        const response = await fetch(`http://localhost:8000/api/login`, {
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
        console.log(user_data);
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