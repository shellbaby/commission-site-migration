import { Link, useRouter } from "@adonisjs/inertia/react"
import { Data } from "@generated/data"
import { Head } from "@inertiajs/react"
import { CheckIcon, EyeClosedIcon, EyeIcon } from "@phosphor-icons/react"
import { PasswordRegExp } from "@shellbaby/shared/types/password"
import { CSSProperties } from "react"
import { useForm, useFormState, useWatch } from "react-hook-form"
import { Avatar, Button, Checkbox, Field, PasswordInput } from "~/components"
import { InertiaProps } from "~/types"

interface InfoFormValues {
    username: string
    name: string
    email: string
}

interface PasswordFormValues {
    password_current: string
    password: string
    password_confirmation: string
    sign_out_all: boolean
}

type PageProps = InertiaProps<{ updatedClient: Data.Client }>
export default function Page({ updatedClient, errors }: PageProps) {
    const infoForm = useForm<InfoFormValues>({
        defaultValues: {
            email: updatedClient?.email,
            name: updatedClient?.name ?? "",
            username: updatedClient?.username,
        },
    })

    const passwordForm = useForm<PasswordFormValues>()

    const passwordFormState = useFormState({ control: passwordForm.control })

    const newPassword = useWatch({
        control: passwordForm.control,
        name: "password",
    })

    const newPasswordInput = passwordForm.register("password", {
        required: "Please enter your password",
        pattern: {
            value: PasswordRegExp,
            message: "Password is not secure enough",
        },
    })

    const conformationPasswordInput = passwordForm.register(
        "password_confirmation",
        {
            validate: {
                match: (value) =>
                    newPassword === value || "Passwords do not match",
            },
        }
    )

    const router = useRouter()
    const handleUpdate = infoForm.handleSubmit(async (values) => {
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

    const handlePasswordChange = passwordForm.handleSubmit(async (values) => {
        return new Promise((resolve) => {
            router.visit(
                {
                    route: "client.password.update",
                },
                {
                    data: { ...values },
                    errorBag: "password",
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

    const passwordErrorBag =
        errors.password && typeof errors.password === "object"
            ? (errors.password as Record<string, string>)
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
                                    <Field.Input
                                        {...infoForm.register("name")}
                                    />
                                    <Field.ErrorText>
                                        {infoErrorBag?.name}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Field.Root
                                    className="col-span-2"
                                    invalid={!!infoErrorBag?.username}
                                >
                                    <Field.Label>Username</Field.Label>
                                    <Field.Input
                                        {...infoForm.register("username")}
                                    />
                                    <Field.ErrorText>
                                        {infoErrorBag?.username}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Field.Root
                                    className="col-span-full"
                                    invalid={!!infoErrorBag?.email}
                                >
                                    <Field.Label>Email</Field.Label>
                                    <Field.Input
                                        {...infoForm.register("email")}
                                    />
                                    <Field.ErrorText>
                                        {infoErrorBag?.email}
                                    </Field.ErrorText>
                                </Field.Root>
                            </div>
                            <Button
                                type="submit"
                                disabled={
                                    infoForm.formState.isSubmitting ||
                                    !infoForm.formState.isDirty
                                }
                            >
                                {infoForm.formState.isSubmitting
                                    ? "Saving..."
                                    : "Save"}
                            </Button>
                        </>
                    </form>
                </div>
            </section>

            <hr className="my-12" />

            <section className="grid grid-cols-3 gap-3">
                <h6>Password</h6>
                <div className="col-span-2">
                    <div className="grid grid-cols-4 gap-9">
                        <div className="col-span-full">
                            <h6>
                                Forgot your password?{" "}
                                <Link
                                    route="link.static.home"
                                    className="underline"
                                >
                                    Reset here
                                </Link>
                            </h6>
                        </div>

                        <form
                            className="col-span-full"
                            onSubmit={handlePasswordChange}
                        >
                            <h6 className="mb-3">Change Password</h6>

                            <div className="mb-9 flex flex-col gap-6">
                                <Field.Root
                                    className="col-span-full"
                                    invalid={
                                        !!passwordErrorBag?.password_current
                                    }
                                >
                                    <Field.Label>Current Password</Field.Label>
                                    <PasswordInput.Root
                                        autoComplete="current-password"
                                        {...passwordForm.register(
                                            "password_current"
                                        )}
                                    >
                                        <PasswordInput.Control>
                                            <PasswordInput.Input />
                                            <PasswordInput.VisibilityTrigger>
                                                <PasswordInput.Indicator
                                                    fallback={<EyeClosedIcon />}
                                                >
                                                    <EyeIcon />
                                                </PasswordInput.Indicator>
                                            </PasswordInput.VisibilityTrigger>
                                        </PasswordInput.Control>
                                    </PasswordInput.Root>
                                </Field.Root>

                                <Field.Root
                                    className="col-span-full"
                                    invalid={
                                        !!passwordForm.formState.errors
                                            .password ||
                                        !!passwordErrorBag?.password_new
                                    }
                                >
                                    <Field.Label>New Password</Field.Label>
                                    <PasswordInput.Root
                                        autoComplete="new-password"
                                        {...newPasswordInput}
                                        onChange={async (e) => {
                                            await newPasswordInput.onChange(e)
                                            passwordForm.trigger("password")
                                            if (
                                                passwordFormState.touchedFields
                                                    .password_confirmation
                                            ) {
                                                passwordForm.trigger(
                                                    "password_confirmation"
                                                )
                                            }
                                        }}
                                    >
                                        <PasswordInput.Control>
                                            <PasswordInput.Input />
                                            <PasswordInput.VisibilityTrigger>
                                                <PasswordInput.Indicator
                                                    fallback={<EyeClosedIcon />}
                                                >
                                                    <EyeIcon />
                                                </PasswordInput.Indicator>
                                            </PasswordInput.VisibilityTrigger>
                                        </PasswordInput.Control>
                                    </PasswordInput.Root>

                                    <Field.ErrorText>
                                        {passwordForm.formState.errors.password
                                            ?.message ||
                                            passwordErrorBag?.password_new}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Field.Root
                                    className="col-span-full"
                                    invalid={
                                        !!passwordForm.formState.errors
                                            .password_confirmation
                                    }
                                >
                                    <Field.Label>Confirm Password</Field.Label>
                                    <PasswordInput.Root
                                        ignorePasswordManagers
                                        {...conformationPasswordInput}
                                        onChange={async (e) => {
                                            await conformationPasswordInput.onChange(
                                                e
                                            )
                                            passwordForm.trigger(
                                                "password_confirmation"
                                            )
                                        }}
                                    >
                                        <PasswordInput.Control>
                                            <PasswordInput.Input />
                                            <PasswordInput.VisibilityTrigger>
                                                <PasswordInput.Indicator
                                                    fallback={<EyeClosedIcon />}
                                                >
                                                    <EyeIcon />
                                                </PasswordInput.Indicator>
                                            </PasswordInput.VisibilityTrigger>
                                        </PasswordInput.Control>
                                    </PasswordInput.Root>

                                    <Field.ErrorText>
                                        {
                                            passwordForm.formState.errors
                                                .password_confirmation?.message
                                        }
                                    </Field.ErrorText>
                                </Field.Root>

                                <Checkbox.Root>
                                    <Checkbox.Control>
                                        <Checkbox.Indicator>
                                            <CheckIcon />
                                        </Checkbox.Indicator>
                                    </Checkbox.Control>
                                    <Checkbox.Label>
                                        Sign out all sessions
                                    </Checkbox.Label>
                                    <Checkbox.HiddenInput
                                        {...passwordForm.register(
                                            "sign_out_all"
                                        )}
                                    />
                                </Checkbox.Root>
                            </div>

                            <Button
                                type="submit"
                                disabled={
                                    passwordForm.formState.isSubmitting ||
                                    !passwordForm.formState.isValid
                                }
                            >
                                {passwordForm.formState.isSubmitting
                                    ? "...Saving"
                                    : "Save"}
                            </Button>
                        </form>
                    </div>
                </div>
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
                    <Button color="var(--color-error)">
                        Yes, delete my account
                    </Button>
                </div>
            </section>
        </>
    )
}
