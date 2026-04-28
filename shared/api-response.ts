import { HttpStatus } from "./http-status"

export type ErrorType = {
    message?: string
    rule?: string
    field?: string
}

export interface APIResponse<T = any> {
    success: boolean
    data?: T
    errors?: ErrorType[]
    statusCode: HttpStatus
}
