import vine from "@vinejs/vine"

const email = () => vine.string().email().normalizeEmail().trim().maxLength(255)
const password = () => vine.string().minLength(8).maxLength(255)
const username = () => vine.string().trim().minLength(3).maxLength(30)

export const signupValidator = vine.create({
    username: username().unique({
        table: "clients",
        column: "username",
    }),
    email: email(),
    password: password(),
    name: vine.string().alphaNumeric().maxLength(255).optional(),
})

export const emailValidator = vine.create({
    email: email(),
})

export const usernameValidator = vine.create({
    username: vine.string().trim().maxLength(30),
})

export const passwordValidator = vine.create({
    password: vine.string(),
})
