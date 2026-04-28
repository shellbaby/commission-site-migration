import vine from "@vinejs/vine"

const email = () => vine.string().email().normalizeEmail().trim().maxLength(255)
const password = () =>
    vine
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
        .confirmed()
const username = () =>
    vine
        .string()
        .trim()
        .minLength(3)
        .maxLength(30)
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,29}$/)

export const signupValidator = vine.create({
    username: username().unique({
        table: "clients",
        column: "username",
    }),
    email: email(),
    password: password(),
    name: vine.string().maxLength(255).optional(),
})

export const signinValidator = vine.create({
    username: vine.string().trim().maxLength(30),
    password: vine.string(),
})
