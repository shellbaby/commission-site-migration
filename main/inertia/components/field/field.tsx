import { Field as ArkField } from "@ark-ui/react/field"
import { ReactNode } from "react"

interface LabelProps extends ArkField.LabelProps {}
const Label = (props: LabelProps) => {
    const { children, ...others } = props
    return (
        <ArkField.Label {...others}>
            {children}
            <ArkField.RequiredIndicator>Required</ArkField.RequiredIndicator>
        </ArkField.Label>
    )
}

interface InputProps extends ArkField.InputProps {
    addon?: string | ReactNode
}
const Input = (props: InputProps) => {
    const { addon, ...others } = props
    return addon ? (
        <div data-scope="field" data-part="input-inline-container">
            <ArkField.Label data-scope="field" data-part="input-inline-addon">
                {addon}
            </ArkField.Label>
            <ArkField.Input {...others} data-variant={"inline"} />
        </div>
    ) : (
        <ArkField.Input {...others} />
    )
}

export const Field = {
    Root: ArkField.Root,
    Label: Label,
    Input: Input,
    ErrorText: ArkField.ErrorText,
    HelperText: ArkField.HelperText,
    Context: ArkField.Context,
    RequiredIndicator: ArkField.RequiredIndicator,
    RootProvider: ArkField.RootProvider,
    Select: ArkField.Select,
    Textarea: ArkField.Textarea,
}
