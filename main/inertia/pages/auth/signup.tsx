import { Form } from "@adonisjs/inertia/react"
import { Head } from "@inertiajs/react"
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react"
import { useForm, useFormState, useWatch } from "react-hook-form"
import { Button, Field, PasswordInput } from "~/components"

interface FormValues {
    username: string
    email: string
    name: string
    password: string
    password_confirmation: string
}

export default function Page() {
    const {
        register,
        formState: { isValid, errors: RHFErrors },
        control,
        trigger,
    } = useForm<FormValues>()

    const { touchedFields } = useFormState({ control })

    const password = useWatch({
        control,
        name: "password",
    })

    const passwordInput = register("password", {
        required: "Please enter your password",
    })

    const passwordConfirmationInput = register("password_confirmation", {
        validate: {
            match: (value) => password === value || "Passwords do not match",
        },
    })

    return (
        <div className="mx-auto min-w-md">
            <Head title="Sign Up" />

            <h2 className="mb-12 text-center">Sign Up</h2>

            <div className="border-separator mt-4 rounded-md border-2 p-6">
                <Form
                    className="flex flex-col gap-6"
                    route="client.clients.store"
                >
                    {({ errors, processing, wasSuccessful }) => (
                        <>
                            <Field.Root required invalid={!!errors.username}>
                                <Field.Label>Username</Field.Label>
                                <Field.Input
                                    {...register("username", {
                                        required: true,
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.username}
                                </Field.ErrorText>
                                <Field.HelperText asChild>
                                    <ul className="[&>li]:mt-0!">
                                        <li>
                                            Minimum 3, maximum 30 characters for
                                            username
                                        </li>
                                        <li>Only . _ - are allowed</li>
                                    </ul>
                                </Field.HelperText>
                            </Field.Root>

                            <Field.Root required invalid={!!errors.email}>
                                <Field.Label>Email</Field.Label>
                                <Field.Input
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.email}
                                </Field.ErrorText>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>
                                    What should I call you?
                                </Field.Label>
                                <Field.Input
                                    placeholder="Name / Nickname"
                                    {...register("name")}
                                />
                                <Field.ErrorText>{errors.name}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root
                                required
                                invalid={
                                    !!errors.password || !!RHFErrors.password
                                }
                            >
                                <Field.Label>Password</Field.Label>
                                <PasswordInput.Root
                                    autoComplete="new-password"
                                    {...passwordInput}
                                    onChange={async (e) => {
                                        await passwordInput.onChange(e)
                                        if (
                                            touchedFields.password_confirmation
                                        ) {
                                            trigger("password_confirmation")
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
                                    {errors.password ||
                                        RHFErrors.password?.message}
                                </Field.ErrorText>
                                <Field.HelperText asChild>
                                    <ul className="[&>li]:mt-0!">
                                        <li>
                                            Include at least 1 number or 1
                                            character
                                        </li>
                                        <li>Minimum 8 characters</li>
                                    </ul>
                                </Field.HelperText>
                            </Field.Root>

                            <Field.Root
                                required
                                invalid={
                                    !!errors.password_confirmation ||
                                    !!RHFErrors.password_confirmation
                                }
                            >
                                <Field.Label>Confirm Password</Field.Label>
                                <PasswordInput.Root ignorePasswordManagers>
                                    <PasswordInput.Control>
                                        <PasswordInput.Input
                                            {...passwordConfirmationInput}
                                            onChange={async (e) => {
                                                await passwordConfirmationInput.onChange(
                                                    e
                                                )
                                                trigger("password_confirmation")
                                            }}
                                        />
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
                                    {errors.password_confirmation ||
                                        RHFErrors.password_confirmation
                                            ?.message}
                                </Field.ErrorText>
                            </Field.Root>

                            <Button
                                className="mt-3"
                                disabled={processing || !isValid}
                                type="submit"
                                color={
                                    wasSuccessful
                                        ? "var(--color-success)"
                                        : "var(--color-primary)"
                                }
                            >
                                {processing
                                    ? wasSuccessful
                                        ? "Success!"
                                        : "Signing Up..."
                                    : "Sign Up"}
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}
