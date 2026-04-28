import { PasswordInput as ArkPasswordInput } from "@ark-ui/react/password-input"
import { IconContext } from "@phosphor-icons/react"

type VisibilityTriggerProps = ArkPasswordInput.VisibilityTriggerProps
const VisibilityTrigger = (props: VisibilityTriggerProps) => {
    return (
        <ArkPasswordInput.VisibilityTrigger {...props}>
            <IconContext value={{ size: 24 }}>{props.children}</IconContext>
        </ArkPasswordInput.VisibilityTrigger>
    )
}

export const PasswordInput = {
    ...ArkPasswordInput,
    VisibilityTrigger,
}
