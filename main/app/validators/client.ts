import vine from "@vinejs/vine"

const email = () => vine.string().email().normalizeEmail().trim().maxLength(255)
const password = () =>
    vine
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
        .confirmed()
const username = () => vine.string().trim().maxLength(30)
const usernameStrict = () =>
    username()
        .minLength(3)
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,29}$/)
const name = () =>
    vine
        .string()
        .maxLength(255)
        .regex(/^[a-zA-Z0-9\s]{1,30}$/)

export const signupValidator = vine.create({
    username: usernameStrict().unique({
        table: "clients",
        column: "username",
    }),
    email: email().unique({
        table: "clients",
        column: "email",
    }),
    password: password(),
    name: name().optional(),
})

export const signinValidator = vine.create({
    username: username(),
    password: vine.string(),
    remember_me: vine.boolean({ strict: false }).optional(),
})

export const editInfoValidator = vine.create({
    name: name(),
    username: usernameStrict(),
    email: email(),
})
