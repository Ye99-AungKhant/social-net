export interface ChatMedia {
    id: number | null,
    url: string
}
export interface Chat {
    id: number,
    sender_id: number,
    receiver_id: number,
    message: string | null,
    media: ChatMedia[],
    date?: string,
    read?: boolean,
}

export interface ChatSlice {
    chats: Chat[]
}