import { PasswordRegExp } from "@shellbaby/shared/types/password"
import vine from "@vinejs/vine"

const password = () => vine.string().regex(PasswordRegExp).confirmed()

export const updateValidator = vine.create({
    password_current: vine.string(),
    password: password(),
})
