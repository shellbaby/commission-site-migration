import { Data } from "@generated/data"
import { usePage } from "@inertiajs/react"
import {
    CheckCircleIcon,
    IconContext,
    InfoIcon,
    WarningCircleIcon,
    WarningIcon,
    XIcon,
} from "@phosphor-icons/react"
import { ReactElement, useEffect } from "react"
import { createToaster, Navigation, Portal, Toast, Toaster } from "~/components"

const toaster = createToaster({
    placement: "bottom-end",
    overlap: true,
    gap: 24,
})

const toastIcon = {
    success: CheckCircleIcon,
    error: WarningCircleIcon,
    warning: WarningIcon,
    info: InfoIcon,
}

export default function Layout({
    children,
}: {
    children: ReactElement<Data.SharedProps>
}) {
    const [success, error] = [
        children.props.flash.success,
        children.props.flash.error,
    ]

    useEffect(() => {
        toaster.dismiss()
    }, [usePage().url])

    useEffect(() => {
        if (error) {
            toaster.error({
                title: error,
                duration: Infinity,
            })
        }

        if (success) {
            toaster.success({
                title: success,
            })
        }
    })

    return (
        <IconContext
            value={{
                size: 16,
                weight: "bold",
            }}
        >
            <div className="flex h-dvh flex-col">
                <header className="my-4">
                    <Navigation client={children.props.client} />
                </header>

                <hr />

                <div className="mt-12 flex flex-1 flex-col  ">{children}</div>

                <div className="py-12 text-center">
                    <small>
                        Copyright  2025 shellbaby. All Rights Reserved.
                    </small>
                </div>
            </div>

            <Portal>
                <Toaster toaster={toaster}>
                    {(toast) => {
                        const ToastIcon = toast.type
                            ? toastIcon[toast.type as keyof typeof toastIcon]
                            : undefined
                        return (
                            <Toast.Root>
                                <Toast.Title>
                                    {ToastIcon ? (
                                        <span className="flex items-end gap-3">
                                            <ToastIcon size={24} />
                                            <span>{toast.title}</span>
                                        </span>
                                    ) : (
                                        toast.title
                                    )}
                                </Toast.Title>
                                <Toast.Description>
                                    {toast.description}
                                </Toast.Description>
                                <Toast.CloseTrigger>
                                    <XIcon size={24} />
                                </Toast.CloseTrigger>
                            </Toast.Root>
                        )
                    }}
                </Toaster>
            </Portal>
        </IconContext>
    )
}
