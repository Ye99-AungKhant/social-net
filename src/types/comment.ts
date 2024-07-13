import { UserDetail } from "./app"

export interface Comments {
    id: number
    content: string
    post_id: number
    user_id: number
    date: string
    user: UserDetail
}
export interface EditComment {
    id: number | null
    content: string
}
export interface CommentSlice {
    comments: Comments[]
    editComment: EditComment | null
    isLoading?: boolean
    error?: string | null
}

export interface CreateComment {
    content: string
    userId?: number
    postId?: number
}