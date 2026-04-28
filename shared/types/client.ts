import { PartialOnly } from "./util"

export interface Client {
    username: string
    email: string
    name: string
    password: string
}

export type StoreClientDTO = PartialOnly<Client, "name">
export type ShowClientDTO = Omit<PartialOnly<Client, "name">, "password"> & {
    uuid: string
}
export type UpdateClientDTO = Partial<Client>

export type SigninClientDTO = Pick<Client, "username" | "password">
