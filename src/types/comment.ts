import { UserDetail } from "./app"

export interface Comments {
    id: number
    content: string
    post_id: number
    user: UserDetail
}
export interface CommentSlice {
    comments: Comments[]
    isLoading?: boolean;
    error?: string | null;
}

export interface CreateComment {
    content: string
    userId?: number
    postId?: number
}