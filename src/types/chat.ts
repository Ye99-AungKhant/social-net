export interface Chat {
    id: number,
    sender_id: number,
    receiver_id: number,
    message: string,
    date?: string
}

export interface ChatSlice {
    chats: Chat[]
}