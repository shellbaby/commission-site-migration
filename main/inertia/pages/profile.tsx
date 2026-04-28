import { Form } from "@adonisjs/inertia/react"
import { CSSProperties } from "react"
import { Avatar, Button, Field } from "~/components"
import { InertiaProps } from "~/types"

type PageProps = InertiaProps

export default function Page({ client }: PageProps) {
    return (
        <>
            <section className="grid grid-cols-3 gap-3">
                <h6>Personal Information</h6>
                <div className="col-span-2">
                    <div className="mb-9 flex items-center gap-6">
                        <Avatar.Root
                            style={
                                {
                                    "--size": "calc(var(--spacing)*24)",
                                } as CSSProperties
                            }
                        >
                            <Avatar.Fallback
                                src="https://cdn.bsky.app/img/avatar/plain/did:plc:zwvrinmsejg2lw6yfkk5dgxm/bafkreifxtxkn6xkkwb3mcbxyphnysvo5y3lj5foz5a7d2mian3sku6ccjm"
                                alt="fallback avatar"
                                width={590}
                                height={590}
                            />
                            <Avatar.Image alt="profile picture" src={"sda"} />
                        </Avatar.Root>

                        <div>
                            <Button className="mb-1">Change Avatar</Button>
                            <small className="text-black-muted font-bold">
                                JPG, PNG, or GIF. 1MB max.
                            </small>
                        </div>
                    </div>

                    <Form
                        route="client.clients.update"
                        routeParams={{ id: client?.clientUuid ?? "" }}
                    >
                        {({ errors, processing, wasSuccessful, isDirty }) => (
                            <>
                                <div className="mb-9 grid grid-cols-4 gap-6">
                                    <Field.Root className="col-span-2">
                                        <Field.Label>Name</Field.Label>
                                        <Field.Input
                                            name="name"
                                            defaultValue={client?.name ?? ""}
                                        />
                                    </Field.Root>

                                    <Field.Root className="col-span-2">
                                        <Field.Label>Username</Field.Label>
                                        <Field.Input
                                            name="username"
                                            defaultValue={client?.username}
                                        />
                                    </Field.Root>

                                    <Field.Root className="col-span-full">
                                        <Field.Label>Email</Field.Label>
                                        <Field.Input
                                            name="email"
                                            defaultValue={client?.email}
                                        />
                                    </Field.Root>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing || !isDirty}
                                >
                                    {processing
                                        ? wasSuccessful
                                            ? "Success!"
                                            : "Saving..."
                                        : "Save"}
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </section>

            <hr className="my-12" />

            <section className="grid grid-cols-3 gap-3">
                <h6>Change Password</h6>
                <form className="col-span-2">
                    <div className="mb-9 grid grid-cols-4 gap-6">
                        <Field.Root className="col-span-full">
                            <Field.Label>Current Password</Field.Label>
                            <Field.Input />
                        </Field.Root>

                        <Field.Root className="col-span-full">
                            <Field.Label>New Password</Field.Label>
                            <Field.Input />
                        </Field.Root>

                        <Field.Root className="col-span-full">
                            <Field.Label>Confirm Password</Field.Label>
                            <Field.Input />
                        </Field.Root>
                    </div>

                    <Button type="submit">Save</Button>
                </form>
            </section>

            <hr className="my-12" />

            <section className="grid grid-cols-3 gap-3">
                <h6>Delete Account</h6>
                <div className="col-span-2">
                    <p className="mb-6">
                        Once you delete your account, all information including
                        your personal information and commission requests will
                        be gone permanently. This action is not reversible.
                    </p>
                    <Button>Yes, delete my account</Button>
                </div>
            </section>
        </>
    )
}
