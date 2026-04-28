import { Head } from "@inertiajs/react"
import { Button, Field } from "~/components"

export default function Page() {
    return (
        <>
            <Head title="Contact" />

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h5 className="text-center">Contact me through...</h5>
                    <div className="mt-4 flex flex-col gap-2">
                        <a href="https://t.me/littlelambyderg">
                            <Button color="var(--color-telegram)" width="full">
                                Telegram
                            </Button>
                        </a>

                        <a href="https://discord.com/users/845590906543407104">
                            <Button color="var(--color-discord)" width="full">
                                Discord
                            </Button>
                        </a>

                        <a href="https://bsky.app/profile/nikkoscribblo.bsky.social">
                            <Button color="var(--color-bluesky)" width="full">
                                Bluesky
                            </Button>
                        </a>
                    </div>
                </div>
                <div>
                    <h5 className="text-center">...or through this form</h5>
                    <div className="border-separator mt-4 rounded-md border-2 p-6">
                        <form className="flex flex-col gap-6">
                            <Field.Root required>
                                <Field.Label>Name</Field.Label>
                                <Field.Input placeholder="Name / Nickname" />
                                <Field.ErrorText />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Email</Field.Label>
                                <Field.Input
                                    type="email"
                                    placeholder="your@email.com"
                                />
                                <Field.ErrorText />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Subject</Field.Label>
                                <Field.Input />
                                <Field.ErrorText />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Message</Field.Label>
                                <Field.Textarea autoresize />
                                <Field.ErrorText />
                            </Field.Root>

                            <div className="flex justify-end">
                                <Button type="submit">Send</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
