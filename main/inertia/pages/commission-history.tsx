import { Link } from "@adonisjs/inertia/react"
import { Data } from "@generated/data"
import { PlusIcon } from "@phosphor-icons/react"
import {
    CommissionStatusMapping,
    PaymentStatusMapping,
} from "@shellbaby/shared/types"
import { Button, StepIconMapping } from "~/components"
import { InertiaProps } from "~/types"
import { readableDate } from "~/utils/datetime"
import { PaymentIconMapping } from "~/utils/mapping"

type PageProps = InertiaProps<{
    commissions: Data.Commission.Variants["forBriefView"][]
}>
export default function Page({ commissions }: PageProps) {
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
                                <Link route="link.form">
                                    <PlusIcon className="mr-3" />
                                    Add Commission
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    commissions.map((commission) => {
                        const {
                            commissionNumber,
                            createdAt,
                            type,
                            status,
                            paymentStatus,
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

                                    <Button asChild>
                                        <Link
                                            route="link.commission-details"
                                            routeParams={{
                                                commission_number:
                                                    commissionNumber,
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
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}
