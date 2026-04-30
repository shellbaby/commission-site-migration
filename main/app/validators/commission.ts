import { CommissionType } from "@shellbaby/shared/types"
import vine from "@vinejs/vine"

export const commissionValidator = vine.create({
    name: vine.string().maxLength(255).trim(),
    email: vine.string().email().normalizeEmail().trim().maxLength(255),
    commission_type: vine.enum(CommissionType),
    idea: vine.string().trim(),
    ref_sheets: vine.array(
        vine.file({
            size: "5mb",
            extnames: ["png", "jpg", "jpeg"],
        })
    ),
    notes: vine.string().trim().optional(),
    tos_agreement: vine.boolean(),
    no_reserve_agreement: vine.boolean(),
})
