import { BaseOptions } from "./app"
export interface User extends BaseOptions {
    name: string
    email: string
    phone: string
    password: string
}
interface Profile {
    id?: number
    post_id?: number | null
    user_id: number | null
    url: string
    type?: string
}

export interface AuthUser {
    id: number
    name: string
    profile?: Profile
}
export interface UserSlice {
    user: User[],
    authUser: AuthUser | null,
    onError: User | null
}

export interface createUserPayload extends User { }
export interface signInUserPayload extends User { }


export interface UserSignIn extends BaseOptions {
    email: string
    password: string
}

export interface SignInSlice {
    user: UserSignIn[],
    onError: UserSignIn | null
}