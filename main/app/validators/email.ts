import vine from "@vinejs/vine"

export const uuidValidator = vine.create({
    uuid: vine.string().uuid(),
})
