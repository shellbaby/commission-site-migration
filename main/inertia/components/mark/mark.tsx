import { CSSProperties, HTMLAttributes } from "react"

interface MarkProps extends HTMLAttributes<HTMLElement> {
    color?: string
}

export const Mark = (props: MarkProps) => {
    return (
        <mark
            {...props}
            data-scope="mark"
            data-part="root"
            style={
                {
                    "--color": props.color,
                } as CSSProperties
            }
        />
    )
}
