import { ark } from "@ark-ui/react/factory"
import { ButtonHTMLAttributes, CSSProperties } from "react"
import "./style.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    color?: string
    width?: "full" | "fit"
    variant?: "filled" | "outline" | "ghost"
}

export const Button = ({
    color,
    width = "fit",
    variant = "filled",
    ...buttonProps
}: ButtonProps) => {
    return (
        <ark.button
            {...buttonProps}
            data-scope="button"
            data-part="root"
            data-variant={variant}
            style={
                {
                    "--color": color,
                    "--width": width === "full" ? "100%" : "auto",
                } as CSSProperties
            }
        />
    )
}
