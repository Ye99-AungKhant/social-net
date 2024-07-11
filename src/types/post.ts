import { BaseOptions } from "./app";

interface Image {
    url: string
}
export interface PostCreate extends BaseOptions {
    status: string,
    content: string,
    image?: Image[],
}