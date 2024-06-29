import { BaseOptions } from "./app";

interface Image {
    url: string
}
export interface Post extends BaseOptions {
    content: string,
    image?: Image[],
}