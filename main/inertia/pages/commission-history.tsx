import { Link, useRouter } from "@adonisjs/inertia/react"
import { Data } from "@generated/data"
import { PlusIcon } from "@phosphor-icons/react"
import { HttpStatus } from "@shellbaby/shared/http-status"
import {
    CommissionStatusMapping,
    PaymentStatusMapping,
} from "@shellbaby/shared/types"
import { useState } from "react"
import { client } from "~/client"
import { Button, Dialog, Portal, StepIconMapping } from "~/components"
import { InertiaProps } from "~/types"
import { readableDate } from "~/utils/datetime"
import { PaymentIconMapping } from "~/utils/mapping"

type PageProps = InertiaProps<{
    commissions: Data.Commission.Variants["forBriefView"][]
}>
export default function Page({ commissions }: PageProps) {
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

    return (
        <>
            <h2 className="mb-12 text-center">Commission History</h2>

            <div className="flex flex-1 flex-col gap-12">
                {commissions.length === 0 ? (
                    <div className="grid h-full place-items-center">
                        <div className="flex flex-col items-center gap-3">
                            <span
                                style={{
                                    color: "oklch(from var(--color-black-muted) l c h / .4)",
                                }}
                                className="text-h2 font-bold select-none"
                            >
                                It's a bit empty here
                            </span>

                            <Button asChild>
                                <Link route="link.commissions.create">
                                    <PlusIcon className="mr-3" />
                                    Add Commission
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    commissions.map((commission) => {
                        const {
                            commissionUuid,
                            commissionNumber,
                            createdAt,
                            type,
                            status,
                            paymentStatus,
                            permissions,
                        } = commission

                        const PaymentIcon =
                            PaymentIconMapping[paymentStatus].icon
                        const CommissionIcon = StepIconMapping[status].icon

                        return (
                            <div
                                key={commissionNumber}
                                className="border-black-muted rounded-default border-2"
                            >
                                <div className="flex justify-between px-6 py-3">
                                    <div className="flex gap-12">
                                        <div>
                                            <p className="font-bold">
                                                Commission number
                                            </p>
                                            <span>{commissionNumber}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold">
                                                Date created
                                            </p>
                                            <span>
                                                {readableDate(createdAt!)}
                                            </span>
                                        </div>
                                    </div>

                                    <Button asChild variant="outline">
                                        <Link
                                            route="link.commissions.auth.show"
                                            routeParams={{
                                                commission_uuid: commissionUuid,
                                            }}
                                        >
                                            View Commission
                                        </Link>
                                    </Button>
                                </div>

                                <hr />

                                <div className="flex px-6 py-6">
                                    <div className="aspect-square h-[192px]">
                                        image
                                    </div>

                                    <div>
                                        <h4 className="mb-3">{type}</h4>
                                        <p className="text-h6 mb-1">
                                            Payment Status:{" "}
                                            <span
                                                className="inline-flex items-center gap-1 font-bold"
                                                style={{
                                                    color: PaymentIconMapping[
                                                        paymentStatus
                                                    ].color,
                                                }}
                                            >
                                                {
                                                    PaymentStatusMapping[
                                                        paymentStatus
                                                    ]
                                                }
                                                <PaymentIcon />
                                            </span>
                                        </p>
                                        <p className="text-h6">
                                            Commission Status:{" "}
                                            <span
                                                className="inline-flex items-center gap-1 font-bold"
                                                style={{
                                                    color: StepIconMapping[
                                                        status
                                                    ].color,
                                                }}
                                            >
                                                {
                                                    CommissionStatusMapping[
                                                        status
                                                    ]
                                                }
                                                <CommissionIcon />
                                            </span>
                                        </p>
                                    </div>

                                    {/* <div className="flex flex-1 items-end justify-end">
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
                                                                    Are you
                                                                    sure?
                                                                </Dialog.Title>
                                                                <Dialog.Description>
                                                                    This action
                                                                    cannot be
                                                                    undone. This
                                                                    will
                                                                    permanently
                                                                    delete the
                                                                    pending
                                                                    commission{" "}
                                                                    {
                                                                        commissionNumber
                                                                    }
                                                                </Dialog.Description>
                                                                {errorMsg && (
                                                                    <p className="text-error mt-3 text-sm font-bold">
                                                                        Error:{" "}
                                                                        {
                                                                            errorMsg
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div className="flex justify-end gap-3 bg-[oklch(from_var(--color-black)_l_c_h/.12)] px-6 py-3">
                                                                <Dialog.CloseTrigger
                                                                    asChild
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
                                                                        isProcesssing ||
                                                                        isSuccess
                                                                    }
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            commissionUuid
                                                                        )
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
                                    </div> */}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}
