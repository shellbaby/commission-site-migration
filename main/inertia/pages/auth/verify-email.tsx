import { Head } from "@inertiajs/react"
import { EnvelopeSimpleIcon } from "@phosphor-icons/react"
import { Mark } from "~/components"
import { InertiaProps } from "~/types"

type PageProps = InertiaProps<{ email: string }>

export default function Page({ email }: PageProps) {
    return (
        <>
            <Head title="Verify Email" />

            <h2 className="mb-6 flex items-end gap-1">
                Please check your email!{" "}
                <span>
                    <EnvelopeSimpleIcon size={36} />
                </span>
            </h2>

            <p className="mb-3">
                Thank you for signing up and becoming a valuable member of Qilin
                Cafe. An email verification link has just been sent to
                <Mark>{email}</Mark>
            </p>

            <p className="mb-6">
                If you cannot see it, please kindly check your spam folder.
            </p>

            <p className="mb-6">
                If you have already verified your email, you can safely refresh
                this page.
            </p>

            <p className="font-bold italic">
                Note: The link will expire in 30 minutes.
            </p>
        </>
    )
}
