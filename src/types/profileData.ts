import { Post } from "./app"

export interface ProfileDataDetail {
    id: number
    name: string
    profile?: string
    bio: string | null
}

export interface ProfileAboutUs {
    id: number,
    icon: number,
    content: string,
}

export interface ProfileDataSlice {
    posts: Post[]
    profileDetail: ProfileDataDetail | null
    friendLists: ProfileDataDetail[]
    waitingfriendLists: any[]
    aboutUs: ProfileAboutUs[]
}
