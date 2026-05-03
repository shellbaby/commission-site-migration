import { ark } from "@ark-ui/react/factory"
import { ButtonHTMLAttributes, CSSProperties } from "react"
import "./style.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    color?: string
    width?: "full" | "fit"
}

export const Button = (props: ButtonProps) => {
    return (
        <ark.button
            {...props}
            data-scope="button"
            data-part="root"
            style={
                {
                    "--color": props.color,
                    "--width": props.width === "full" ? "100%" : "auto",
                } as CSSProperties
            }
        />
    )
}
