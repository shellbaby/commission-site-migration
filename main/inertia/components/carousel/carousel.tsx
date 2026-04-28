import { Carousel as ArkCarousel } from "@ark-ui/react/carousel"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

export interface CarouselImage {
    width: number
    height: number
    src: string
    optionalAlt?: string
    snapAlign?: "center" | "start" | "end"
}

interface DefaultProps extends Omit<ArkCarousel.RootProps, "slideCount"> {
    images: CarouselImage[]
}
const Default = (props: DefaultProps) => {
    const { images, ...others } = props

    return (
        <ArkCarousel.Root {...others} slideCount={images.length}>
            <ArkCarousel.ItemGroup>
                {images.map((image, index) => (
                    <ArkCarousel.Item
                        key={index}
                        index={index}
                        snapAlign={image.snapAlign ?? "center"}
                        data-test={image.snapAlign}
                    >
                        <img
                            src={image.src}
                            alt={image.optionalAlt ?? `Slide ${index}`}
                            width={image.width}
                            height={image.height}
                        />
                    </ArkCarousel.Item>
                ))}
            </ArkCarousel.ItemGroup>

            <ArkCarousel.Control>
                <ArkCarousel.PrevTrigger>
                    <CaretLeftIcon />
                </ArkCarousel.PrevTrigger>
                <ArkCarousel.IndicatorGroup>
                    {images.map((_, index) => (
                        <ArkCarousel.Indicator key={index} index={index} />
                    ))}
                </ArkCarousel.IndicatorGroup>
                <ArkCarousel.NextTrigger>
                    <CaretRightIcon />
                </ArkCarousel.NextTrigger>
            </ArkCarousel.Control>
        </ArkCarousel.Root>
    )
}

export const Carousel = {
    Default: Default,
}
