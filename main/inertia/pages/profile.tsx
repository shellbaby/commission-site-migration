import { useRouter } from "@adonisjs/inertia/react"
import { Data } from "@generated/data"
import { Head } from "@inertiajs/react"
import { CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { Avatar, Button, Field } from "~/components"
import { InertiaProps } from "~/types"

interface FormValues {
    username: string
    name: string
    email: string
}

type PageProps = InertiaProps<{ updatedClient: Data.Client }>
export default function Page({ updatedClient, errors }: PageProps) {
    const {
        register,
        formState: { isDirty, isSubmitting },
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: {
            email: updatedClient?.email,
            name: updatedClient?.name ?? "",
            username: updatedClient?.username,
        },
    })

    const router = useRouter()
    const handleUpdate = handleSubmit(async (values) => {
        return new Promise((resolve) => {
            router.visit(
                {
                    route: "client.clients.update",
                },
                {
                    data: {
                        ...values,
                    },
                    only: ["updatedClient"],
                    errorBag: "info",
                    onError: () => resolve("error"),
                    onSuccess: () => resolve("success"),
                    onFinish: () => resolve("finish"),
                }
            )
        })
    })

    const infoErrorBag =
        errors.info && typeof errors.info === "object"
            ? (errors.info as Record<string, string>)
            : undefined

    return (
        <>
            <Head title="Profile" />
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

                    <form onSubmit={handleUpdate}>
                        <>
                            <div className="mb-9 grid grid-cols-4 gap-6">
                                <Field.Root
                                    className="col-span-2"
                                    invalid={!!infoErrorBag?.name}
                                >
                                    <Field.Label>Name</Field.Label>
                                    <Field.Input {...register("name")} />
                                    <Field.ErrorText>
                                        {infoErrorBag?.name}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Field.Root
                                    className="col-span-2"
                                    invalid={!!infoErrorBag?.username}
                                >
                                    <Field.Label>Username</Field.Label>
                                    <Field.Input {...register("username")} />
                                    <Field.ErrorText>
                                        {infoErrorBag?.username}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Field.Root
                                    className="col-span-full"
                                    invalid={!!infoErrorBag?.email}
                                >
                                    <Field.Label>Email</Field.Label>
                                    <Field.Input {...register("email")} />
                                    <Field.ErrorText>
                                        {infoErrorBag?.email}
                                    </Field.ErrorText>
                                </Field.Root>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isDirty}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </>
                    </form>
                </div>
            </section>

            <hr className="my-12" />

            <section className="grid grid-cols-3 gap-3">
                <h6>Password</h6>
                <form className="col-span-2">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-full">
                            <p>Forgot your password? Reset here</p>
                        </div>

                        <form className="col-span-full">
                            <h6 className="mb-3">Change Password</h6>

                            <div className="mb-9 flex flex-col gap-6">
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
                    </div>
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
