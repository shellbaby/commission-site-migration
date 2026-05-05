import { DateTime } from "luxon"

export const readableDate = (isoDate: string) => {
    const dateTimeObj = DateTime.fromISO(isoDate).toLocal()
    const { day, month, year }: Record<"day" | "month" | "year", string> = {
        day: `${dateTimeObj.day}`,
        month: dateTimeObj.monthShort ?? `${dateTimeObj.month}`,
        year: `${dateTimeObj.year}`,
    }
    return `${month} ${day}, ${year}`
}
