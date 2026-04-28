import { Head } from "@inertiajs/react"

export default function Page() {
    return (
        <>
            <Head title="Gallery" />
            <div className="grid grid-cols-3 gap-2">
                <div>col 1</div>
                <div>col 2</div>
                <div>col 3</div>
            </div>
        </>
    )
}
