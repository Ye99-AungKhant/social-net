
export interface BaseOptions {
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
}
interface PostOwner {
    id: number
    name: string
}
export interface Post {
    id: number
    content: string
    user: PostOwner
    status: string
    image?: string
    date: string
    like_count: number | ''
}
export interface AppSlice {
    posts: Post[],
    notifications?: string | null,
    chats?: string | null,
    friends?: string | null,
}