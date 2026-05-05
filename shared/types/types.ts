export const CommissionType = [
    "emote",
    "half-body",
    "full-body",
    "ref-sheet",
] as const
export type CommissionType = (typeof CommissionType)[number]

export const CommissionStatus = [
    "pending",
    "sketching",
    "coloring",
    "finished",
    "rejected",
] as const
export type CommissionStatus = (typeof CommissionStatus)[number]

export const CommissionStatusDisplayName = [
    "Pending",
    "Sketching",
    "Coloring",
    "Finished",
    "Rejected",
] as const
export type CommissionStatusDisplayName =
    (typeof CommissionStatusDisplayName)[number]

export const CommissionStatusMapping: Record<
    CommissionStatus,
    CommissionStatusDisplayName
> = {
    pending: "Pending",
    sketching: "Sketching",
    coloring: "Coloring",
    finished: "Finished",
    rejected: "Rejected",
}

const Code = ["EMO", "HBD", "FBD", "RFS"] as const
type Code = (typeof Code)[number]

export const CommissionCode: Record<CommissionType, Code> = {
    emote: "EMO",
    "half-body": "HBD",
    "full-body": "FBD",
    "ref-sheet": "RFS",
}

const CommissionTypeDisplayName = [
    "Emote",
    "Half Body",
    "Full Body",
    "Reference Sheet",
] as const
export type CommissionTypeDisplayName =
    (typeof CommissionTypeDisplayName)[number]

export const CommissionTypeMapping: Record<
    CommissionType,
    CommissionTypeDisplayName
> = {
    emote: "Emote",
    "half-body": "Half Body",
    "full-body": "Full Body",
    "ref-sheet": "Reference Sheet",
}

export const PaymentStatus = ["pending", "paid"] as const
export type PaymentStatus = (typeof PaymentStatus)[number]
const PaymentStatusDisplayName = ["Pending", "Paid"] as const
type PaymentStatusDisplayName = (typeof PaymentStatusDisplayName)[number]
export const PaymentStatusMapping: Record<
    PaymentStatus,
    PaymentStatusDisplayName
> = {
    paid: "Paid",
    pending: "Pending",
}
