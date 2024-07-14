
export interface BaseOptions {
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
}
export interface UserDetail {
    id: number
    name: string
    profile?: string
}
export interface Post {
    id: number
    content: string
    user: UserDetail
    status: string
    image?: string
    date: string
    like_count: number
    comment_count: number
    liked: any;
}
export interface AppSlice {
    posts: Post[],
    notifications?: string | null,
    chats?: string | null,
    friends?: string | null,
}