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

