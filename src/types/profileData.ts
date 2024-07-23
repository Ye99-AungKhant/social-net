import { Post } from "./app"

export interface ProfileDataDetail {
    id: number
    name: string
    profile: string | null
}

export interface ProfileDataSlice {
    posts: Post[]
    profileDetail: ProfileDataDetail | null
    friendLists: ProfileDataDetail[],
    waitingfriendLists: any[]
}
