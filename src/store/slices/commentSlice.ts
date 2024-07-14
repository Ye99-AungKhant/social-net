import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comments, CommentSlice, CreateComment, EditComment } from '../../types/comment';
import { setCommentCountDecrease, setCommentCountIncrease } from './postSlice';

export const fetchComment = createAsyncThunk(
    'fetchComment',
    async (payload: number, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/comment`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 'postId': payload }),
        });
        const dataFromServer = await response.json();
        const { data } = dataFromServer
        thunkApi.dispatch(setComment(data))
    }
)

export const createComment = createAsyncThunk(
    'createComment',
    async (payload: CreateComment, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/comment/create`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ ...payload }),
        });
        const dataFromServer = await response.json();
        const { success, data } = dataFromServer
        if (success) {
            thunkApi.dispatch(setComment(data))
            thunkApi.dispatch(setCommentCountIncrease(data[0].post_id))
        }

    }
)

export const deleteComment = createAsyncThunk(
    'deleteComment',
    async (payload: number, thunkApi) => {
        const response = await fetch(`http://localhost:8000/api/comment/delete/${payload}`, {
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
        const { success, data } = dataFromServer
        if (success) {
            thunkApi.dispatch(removeComment(payload))
            thunkApi.dispatch(setCommentCountDecrease(data))
        }
    }
)

export const updateComment = createAsyncThunk(
    'updateComment',
    async (payload: EditComment, thunkApi) => {

        const response = await fetch(`http://localhost:8000/api/comment/edit`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ ...payload }),
        });
        const dataFromServer = await response.json();
        const { success, data } = dataFromServer
        console.log(success);
        // if (success)
        thunkApi.dispatch(replaceEditComment(data))
        thunkApi.dispatch(editComment(null))
    }
)

const initialState: CommentSlice = {
    comments: [],
    editComment: null,
    isLoading: false,
    error: null
}

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComment: (state, action: PayloadAction<Comments[]>) => {
            state.comments = [...action.payload, ...state.comments]
        },
        removeAllComment: (state) => {
            state.comments = []
        },
        removeComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.map((comment) => comment).filter((item) => item.id !== action.payload)
        },
        editComment: (state, action: PayloadAction<number | null>) => {
            if (action.payload === null) {
                state.editComment = null
            } else {
                const { id, content } = state.comments.find((comment) => comment.id === action.payload) as EditComment
                state.editComment = { id, content }
            }

        },
        replaceEditComment: (state, action: PayloadAction<Comments>) => {
            state.comments = state.comments.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        },
        removeEditComment: (state) => {
            state.editComment = null
        },
    },
})

export const { setComment, removeAllComment, removeComment, editComment, removeEditComment, replaceEditComment } = commentSlice.actions
export default commentSlice.reducer