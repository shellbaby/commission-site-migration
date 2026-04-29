import { CommissionType } from "@shellbaby/shared/types"
import vine from "@vinejs/vine"

export const commissionValidator = () => {
    name: vine.string().maxLength(255).trim()
    email: vine.string().email().normalizeEmail().trim().maxLength(255)
    commission_type: vine.enum(CommissionType)
    idea: vine.string().trim()
    // ref_sheets: vine.nativeFile()
    notes: vine.string().trim()
    tos_agreement: vine.boolean()
    no_reserve_agreement: vine.boolean()
}
