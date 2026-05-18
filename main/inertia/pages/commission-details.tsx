import { useRouter } from "@adonisjs/inertia/react"
import { Data } from "@generated/data"
import { HttpStatus } from "@shellbaby/shared/http-status"
import {
    CommissionStatusMapping,
    PaymentStatusMapping,
} from "@shellbaby/shared/types"
import { useState } from "react"
import { client } from "~/client"
import {
    Button,
    Carousel,
    CarouselImage,
    CommissionSteps,
    Dialog,
    Portal,
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
        commissionUuid,
        createdAt,
        idea,
        notes,
        paymentStatus,
        refSheetsUrls,
        status,
        type,
        permissions,
    } = commission

    const refSheetImages = refSheetsToCarouselList(refSheetsUrls)
    const PaymentIcon = PaymentIconMapping[paymentStatus].icon
    const CommissionIcon = StepIconMapping[status].icon

    const [errorMsg, setErrorMsg] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [isProcesssing, setIsProcessing] = useState(false)

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

    const router = useRouter()

    const handleDelete = async (commission_uuid: string) => {
        setIsProcessing(true)

        const [[_, error]] = await Promise.all([
            await client.api.client.commissions
                .destroy({ params: { commission_uuid } })
                .safe(),
            delay(1000),
        ])

        setIsProcessing(false)

        if (error?.isStatus(HttpStatus.NOT_FOUND)) {
            setErrorMsg("Commission not found")
            return
        }

        if (error?.isStatus(HttpStatus.FORBIDDEN)) {
            setErrorMsg("Deletion of this commission is not allowed")
            return
        }

        setIsSuccess(true)
        await delay(500)
        router.visit({ route: "link.commissions.auth.index" })
    }

    const resetStates = () => {
        setErrorMsg("")
        setIsProcessing(false)
        setIsSuccess(false)
    }

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

            <>
                <div className="mb-9 flex justify-between">
                    <div>
                        <h4 className="mb-6">{type}</h4>
                        <p className="mb-1">
                            Payment status:{" "}
                            <span
                                className="inline-flex items-center gap-1 font-bold"
                                style={{
                                    color: PaymentIconMapping[paymentStatus]
                                        .color,
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

                    {permissions.delete && (
                        <Dialog.Root role="alertdialog">
                            <Dialog.Trigger asChild>
                                <Button color="var(--color-error)">
                                    Delete
                                </Button>
                            </Dialog.Trigger>

                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <div className="p-6">
                                            <Dialog.Title>
                                                Are you sure?
                                            </Dialog.Title>
                                            <Dialog.Description>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                pending commission{" "}
                                                {commissionNumber}
                                            </Dialog.Description>
                                            {errorMsg && (
                                                <p className="text-error mt-3 text-sm font-bold">
                                                    Error: {errorMsg}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex justify-end gap-3 bg-[oklch(from_var(--color-black)_l_c_h/.12)] px-6 py-3">
                                            <Dialog.CloseTrigger
                                                asChild
                                                onClick={resetStates}
                                            >
                                                <Button variant="ghost">
                                                    Cancel
                                                </Button>
                                            </Dialog.CloseTrigger>
                                            <Button
                                                color={
                                                    isSuccess
                                                        ? "var(--color-success)"
                                                        : "var(--color-error)"
                                                }
                                                disabled={
                                                    isProcesssing || isSuccess
                                                }
                                                onClick={() =>
                                                    handleDelete(commissionUuid)
                                                }
                                            >
                                                {isProcesssing
                                                    ? "Deleting..."
                                                    : isSuccess
                                                      ? "Success"
                                                      : "Delete"}
                                            </Button>
                                        </div>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    )}
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
            </>
        </>
    )
}
