import { Avatar as ArkAvatar, useAvatarContext } from "@ark-ui/react/avatar"
import "./style.css"

type ImageProps = ArkAvatar.ImageProps
export const Fallback = (props: ImageProps) => {
    const avatar = useAvatarContext()
    const { hidden, ...arkImageProps } = avatar.getImageProps()

    return (
        <img
            {...arkImageProps}
            {...props}
            style={{
                ...props.style,
                visibility: !hidden ? "hidden" : "visible",
            }}
        />
    )
}

export const Avatar = {
    Root: ArkAvatar.Root,
    Fallback,
    Image: ArkAvatar.Image,
}
