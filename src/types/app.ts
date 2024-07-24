
export interface BaseOptions {
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
}

interface Profile {
    id: number
    post_id: number | null
    user_id: number | null
    url: string
    type: string
}

export interface UserDetail {
    id: number
    name: string
    profile?: string
}
export interface postImage {
    id: number
    post_id: number | null
    user_id: number | null
    url: string
    type: string
}

export interface Post {
    id: number
    content: string
    user: UserDetail
    status: string
    image?: postImage[]
    date: string
    like_count: number
    comment_count: number
    liked: any;
}
export interface AppSlice {
    notifications: string | null,
    chats: string | null,
    friendList: UserDetail[] | null,
    friendRequestNoti: string | null,
}