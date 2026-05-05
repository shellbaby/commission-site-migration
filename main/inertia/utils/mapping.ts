import { CheckIcon, ClockCountdownIcon, Icon } from "@phosphor-icons/react"
import { PaymentStatus } from "@shellbaby/shared/types"

export const PaymentIconMapping: Record<
    PaymentStatus,
    { icon: Icon; color: string }
> = {
    paid: {
        color: "var(--color-paid)",
        icon: CheckIcon,
    },
    pending: {
        color: "var(--color-pending)",
        icon: ClockCountdownIcon,
    },
}
