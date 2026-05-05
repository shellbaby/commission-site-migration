import { Steps } from "@ark-ui/react/steps"
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
import { CSSProperties } from "react"
import style from "./style.module.css"

type Props = {
    step: CommissionStatus
}

const StatusNormal = CommissionStatus.slice(0, 4)
const StatusRejected = [CommissionStatus[4], ...CommissionStatus.slice(1, 4)]

export const StepIconMapping: Record<
    CommissionStatus,
    { color: string; icon: Icon }
> = {
    pending: { color: "var(--color-pending)", icon: ClockCountdownIcon },
    sketching: { color: "var(--color-sketching)", icon: PencilLineIcon },
    coloring: { color: "var(--color-coloring)", icon: PaintBrushIcon },
    finished: { color: "var(--color-finished)", icon: CheckIcon },
    rejected: { color: "var(--color-rejected)", icon: XIcon },
}

export const CommissionSteps = ({ step }: Props) => {
    const statusArray = step !== "rejected" ? StatusNormal : StatusRejected
    const stepIndex = statusArray.indexOf(step)
    const actualStep =
        stepIndex === statusArray.length - 1 ? stepIndex + 1 : stepIndex

    return (
        <Steps.Root className={style.Root} step={actualStep}>
            <Steps.List>
                {statusArray.map((status, index) => {
                    const { color, icon: StepIcon } = StepIconMapping[status]

                    return (
                        <Steps.Item
                            key={status}
                            index={index}
                            style={
                                {
                                    "--color": color,
                                } as CSSProperties
                            }
                        >
                            <Steps.Indicator
                                className={style.Indicator}
                                data-rejected={
                                    status === "rejected" ? "" : null
                                }
                            >
                                <StepIcon size={21} />
                                <span className={style.Title}>
                                    {CommissionStatusMapping[status]}
                                </span>
                            </Steps.Indicator>
                            {index < statusArray.length - 1 && (
                                <Steps.Separator className={style.Separator} />
                            )}
                        </Steps.Item>
                    )
                })}
            </Steps.List>
        </Steps.Root>
    )
}
