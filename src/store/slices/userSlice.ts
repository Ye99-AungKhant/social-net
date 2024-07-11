import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserSlice } from "../../types/user";

export const logOut = createAsyncThunk(
    'userLogout',
    async (payload: any, thunkApi) => {
        const token = localStorage.getItem('token')
        const { onSuccess } = payload
        const response = await fetch(`http://localhost:8000/api/logout`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        localStorage.removeItem('token')
        onSuccess && onSuccess()
    }
)
export const signUpUser = createAsyncThunk(
    "signup",
    async (payload: User, thunkApi) => {
        console.log(payload);

        const { onSuccess } = payload
        const response = await fetch(`http://localhost:8000/api/signup`, {
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
);

const initialState: UserSlice = {
    user: [],
    onError: null,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onError: (state, action: PayloadAction<User>) => {
            state.onError = action.payload
        }
    },
})

export const { onError } = userSlice.actions

export default userSlice.reducer