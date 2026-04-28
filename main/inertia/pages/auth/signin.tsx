import { Form, Link } from "@adonisjs/inertia/react"
import { Head } from "@inertiajs/react"
import { CheckIcon, EyeClosedIcon, EyeIcon } from "@phosphor-icons/react"
import { Button, Checkbox, Field, PasswordInput } from "~/components"

export default function Page() {
    return (
        <div className="mx-auto max-w-md">
            <Head title="Sign In" />

            <h2 className="mb-12 text-center">Sign In</h2>

            <div className="border-separator mt-4 rounded-md border-2 p-6">
                <Form
                    className="flex flex-col gap-6"
                    route="auth.session.store"
                >
                    {({ errors, processing, isDirty }) => (
                        <>
                            <Field.Root required invalid={!!errors.username}>
                                <Field.Label>Username</Field.Label>
                                <Field.Input name="username" />
                                <Field.ErrorText>
                                    {errors.username}
                                </Field.ErrorText>
                            </Field.Root>

                            <Field.Root required invalid={!!errors.password}>
                                <Field.Label>Password</Field.Label>
                                <PasswordInput.Root autoComplete="current-password">
                                    <PasswordInput.Control>
                                        <PasswordInput.Input name="password" />
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
                                    {errors.password}
                                </Field.ErrorText>
                            </Field.Root>

                            <div className="flex items-center justify-between">
                                <Field.Root className="w-fit">
                                    <Checkbox.Root name="remember_me">
                                        <Checkbox.Control>
                                            <Checkbox.Indicator>
                                                <CheckIcon />
                                            </Checkbox.Indicator>
                                        </Checkbox.Control>
                                        <Checkbox.Label>
                                            Remember Me
                                        </Checkbox.Label>
                                        <Checkbox.HiddenInput />
                                    </Checkbox.Root>
                                </Field.Root>

                                <Link route="link.home" className="font-bold">
                                    Forgot Password?
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                disabled={processing || !isDirty}
                            >
                                {processing ? "Signing In..." : "Sign In"}
                            </Button>
                            <span className="text-center">
                                Not a member yet?{" "}
                                <Link href={"/sign-up"} className="font-bold">
                                    Sign up here!
                                </Link>
                            </span>
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}
