import { BaseOptions, postImage } from "./app";

export interface PostImage {
    url: string
}
export interface PostCreate extends BaseOptions {
    status: string,
    content: string,
    image?: PostImage[],
}

export interface PostEditData {
    id: number
    content: string
    status: string
    image?: postImage[]
}