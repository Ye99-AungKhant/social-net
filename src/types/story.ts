import { UserDetail } from "./app"

export interface Story {
    id: number
    content: string
    user: UserDetail
    url: string | null
}

export interface StorySlice {
    stories: Story[]
    isLoading: boolean
    onError: boolean
}