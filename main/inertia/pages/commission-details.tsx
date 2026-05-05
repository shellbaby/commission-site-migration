import { Data } from "@generated/data"
import {
    CommissionStatusMapping,
    PaymentStatusMapping,
} from "@shellbaby/shared/types"
import {
    Carousel,
    CarouselImage,
    CommissionSteps,
    StepIconMapping,
} from "~/components"
import { InertiaProps } from "~/types"
import { readableDate } from "~/utils/datetime"
import { PaymentIconMapping } from "~/utils/mapping"

type PageProps = InertiaProps<{ commission: Data.Commission }>

const refSheetsToCarouselList = (refSheets: string[]): CarouselImage[] => {
    return refSheets.map((url, index) => {
        const [width, height] = [500, 500]
        return {
            height,
            width,
            src: url,
            optionalAlt: `Reference sheet number ${index}`,
            snapAlign: "center",
        }
    })
}

export default function Page({ commission }: PageProps) {
    const {
        commissionNumber,
        createdAt,
        idea,
        notes,
        paymentStatus,
        refSheets,
        status,
        type,
    } = commission

    const refSheetImages = refSheetsToCarouselList(refSheets)
    const PaymentIcon = PaymentIconMapping[paymentStatus].icon
    const CommissionIcon = StepIconMapping[status].icon

    return (
        <>
            <div className="flex items-baseline justify-between">
                <h4>Commission {commissionNumber}</h4>
                <p>
                    Order placed{" "}
                    <span className="font-bold">
                        {readableDate(createdAt!)}
                    </span>
                </p>
            </div>

            <hr className="my-12 mb-9!" />

            <div>
                <div className="mb-9">
                    <h4 className="mb-6">{type}</h4>
                    <p className="mb-1">
                        Payment status:{" "}
                        <span
                            className="inline-flex items-center gap-1 font-bold"
                            style={{
                                color: PaymentIconMapping[paymentStatus].color,
                            }}
                        >
                            {PaymentStatusMapping[paymentStatus]}
                            <PaymentIcon />
                        </span>
                    </p>
                    <p>
                        Commission status:{" "}
                        <span
                            className="inline-flex items-center gap-1 font-bold"
                            style={{
                                color: StepIconMapping[status].color,
                            }}
                        >
                            {CommissionStatusMapping[status]}
                            <CommissionIcon />
                        </span>
                    </p>
                </div>

                <CommissionSteps step={status} />

                <div className="mt-15 grid grid-cols-2 gap-x-12">
                    <div>
                        <Carousel.Default images={refSheetImages} />
                    </div>
                    <div>
                        <div className="mb-6">
                            <h5 className="mb-3">Idea</h5>
                            <p>{idea}</p>
                        </div>

                        <div>
                            <h5 className="mb-3">Notes</h5>
                            <p>{notes ?? "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
