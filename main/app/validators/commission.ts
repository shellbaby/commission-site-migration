import { CommissionContacts, CommissionType } from "@shellbaby/shared/types"
import vine, { VineString } from "@vinejs/vine"

const contact = () => vine.string().maxLength(50)

export const commissionValidator = vine.create({
    name: vine
        .string()
        .maxLength(30)
        .regex(/^[a-zA-Z0-9\s]{1,30}$/)
        .trim(),
    email: vine.string().email().normalizeEmail().trim().maxLength(255),
    contacts: vine.object<Record<CommissionContacts, VineString>>({
        telegram: contact(),
        discord: contact(),
    }),
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
