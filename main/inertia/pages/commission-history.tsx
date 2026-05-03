import { Link } from "@adonisjs/inertia/react"
import { Data } from "@generated/data"
import {
    CheckIcon,
    ClockCountdownIcon,
    Icon,
    PaintBrushIcon,
    PencilLineIcon,
    XIcon,
} from "@phosphor-icons/react"
import {
    CommissionStatus,
    CommissionStatusMapping,
} from "@shellbaby/shared/types"
import { DateTime } from "luxon"
import { CSSProperties } from "react"
import { Button, Steps } from "~/components"
import { InertiaProps } from "~/types"

const StepIconMapping: Record<CommissionStatus, { color: string; icon: Icon }> =
    {
        pending: {
            color: "var(--color-mulfok32-14)",
            icon: ClockCountdownIcon,
        },
        sketching: { color: "var(--color-mulfok32-13)", icon: PencilLineIcon },
        coloring: { color: "var(--color-mulfok32-17)", icon: PaintBrushIcon },
        finished: { color: "var(--color-success)", icon: CheckIcon },
        rejected: { color: "var(--color-error)", icon: XIcon },
    }

type PageProps = InertiaProps<{ commissions: Data.Commission[] }>
export default function Page({ commissions }: PageProps) {
    const convertDateTime = (isoDate: string) => {
        const dateTime = DateTime.fromISO(isoDate).toLocal()
        const { day, month, year }: Record<"day" | "month" | "year", string> = {
            day: `${dateTime.day}`,
            month: dateTime.monthShort ?? `${dateTime.month}`,
            year: `${dateTime.year}`,
        }

        return `${month} ${day}, ${year}`
    }

    return (
        <>
            <h2 className="mb-12">Commission History</h2>

            <div className="flex flex-col gap-12">
                {commissions.map((commission) => {
                    const {
                        commissionNumber,
                        createdAt,
                        idea,
                        notes,
                        type,
                        refSheets,
                        status,
                    } = commission

                    return (
                        <div
                            key={commissionNumber}
                            className="border-black-muted rounded-default border-2"
                        >
                            <div className="flex justify-between px-6 py-3">
                                <div className="flex gap-12">
                                    <div>
                                        <p className="font-bold">
                                            Commission number
                                        </p>
                                        <span>{commissionNumber}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">
                                            Date created
                                        </p>
                                        <span>
                                            {convertDateTime(createdAt!)}
                                        </span>
                                    </div>
                                </div>

                                <Button asChild>
                                    <Link route="link.home">
                                        View Commission
                                    </Link>
                                </Button>
                            </div>

                            <hr />

                            <div className="px-6 py-6">
                                <h4 className="mb-3">{type}</h4>
                                <div>
                                    <Steps.Root
                                        step={
                                            status !== "finished"
                                                ? CommissionStatus.indexOf(
                                                      status
                                                  )
                                                : CommissionStatus.length
                                        }
                                    >
                                        <Steps.List>
                                            {CommissionStatus.slice(0, 4).map(
                                                (item, index) => {
                                                    const {
                                                        icon: StepIcon,
                                                        color,
                                                    } = StepIconMapping[item]

                                                    return (
                                                        <Steps.Item
                                                            key={item}
                                                            index={index}
                                                            style={
                                                                {
                                                                    "--color":
                                                                        color,
                                                                } as CSSProperties
                                                            }
                                                        >
                                                            <Steps.Indicator>
                                                                <StepIcon
                                                                    size={21}
                                                                />
                                                            </Steps.Indicator>
                                                            <Steps.Separator />
                                                        </Steps.Item>
                                                    )
                                                }
                                            )}
                                        </Steps.List>
                                        <p className="mt-3">
                                            <span className="font-bold">
                                                Status:{" "}
                                            </span>
                                            {CommissionStatusMapping[status]}
                                        </p>
                                    </Steps.Root>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
