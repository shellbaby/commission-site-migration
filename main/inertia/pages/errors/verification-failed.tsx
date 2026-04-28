import { SmileySadIcon } from "@phosphor-icons/react"

export default function Page() {
    return (
        <>
            <h2 className="mb-6 flex items-end gap-3">
                Verification Failed{" "}
                <span>
                    <SmileySadIcon size={36} />
                </span>
            </h2>
            <p>
                Your account verification link is either expired or invalid.
                Please request for a new link in your profile and try again.
            </p>
        </>
    )
}
