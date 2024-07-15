import { BaseOptions } from "./app";

export interface PostImage {
    url: string
}
export interface PostCreate extends BaseOptions {
    status: string,
    content: string,
    image?: PostImage[],
}