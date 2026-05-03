import { Head, useForm } from "@inertiajs/react"
import { CaretUpDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react"
import { type CommissionType } from "@shellbaby/shared/types"
import React from "react"
import {
    Button,
    Checkbox,
    createListCollection,
    Field,
    Fieldset,
    FileUpload,
    FileUploadFileError,
    Select,
    useFileUpload,
} from "~/components"
import "~/css/form.css"
import { InertiaProps } from "~/types"

type PageProps = InertiaProps<{ commType: CommissionType | undefined }>

const commTypes = createListCollection<{
    label: string
    value: CommissionType
}>({
    items: [
        { label: "Emote ($15)", value: "emote" },
        { label: "Half Body ($25)", value: "half-body" },
        { label: "Full Body ($35)", value: "full-body" },
        {
            label: "Reference Sheet ($75)",
            value: "ref-sheet",
        },
    ],
})

const fileUploadErrorMessage: Record<FileUploadFileError, string> = {
    FILE_EXISTS: "File already exists",
    FILE_TOO_LARGE: "File size is too large (max. 5MB)",
    TOO_MANY_FILES: "Maximum 5 files are allowed",
    FILE_INVALID: "",
    FILE_INVALID_TYPE: "",
    FILE_TOO_SMALL: "",
    REQUIRED: "Please provide at least one reference sheet",
}

const _MAX_FILE_SIZE = 1024 * 1024 * 5

// const fileUploadValidate = (
//     file: File,
//     details: FileUpload.FileValidateDetails
// ): FileUpload.FileError[] | null => {
//     if (
//         details.acceptedFiles.find(
//             (acceptFile) => acceptFile.name === file.name
//         )
//     ) {
//         return ["FILE_EXISTS"]
//     }

//     if (details.acceptedFiles.length >= 5) {
//         return ["TOO_MANY_FILES"]
//     }

//     if (file.size > _MAX_FILE_SIZE) {
//         return ["FILE_TOO_LARGE"]
//     }

//     return null
// }

export default function Page({ commType, client }: PageProps) {
    interface FormValues {
        name: string
        email: string
        // telegram: string
        // discord: string
        commission_type: CommissionType | undefined
        idea: string
        ref_sheets: File[]
        notes: string
        tos_agreement?: string
        no_reserve_agreement?: string
    }

    const {
        errors,
        processing,
        wasSuccessful,
        progress,
        setData,
        isDirty,
        post,
        data,
    } = useForm<FormValues>({
        name: client?.name ?? "",
        email: client?.email ?? "",
        commission_type: undefined,
        idea: "",
        notes: "",
        tos_agreement: "",
        no_reserve_agreement: "",
        ref_sheets: [],
    })

    const handleFileAccept = (
        acceptedDetails: FileUpload.FileAcceptDetails
    ) => {
        setData("ref_sheets", acceptedDetails.files)
    }

    const fileUploadContext = useFileUpload({
        maxFiles: 5,
        maxFileSize: _MAX_FILE_SIZE,
        accept: "image/png,image/jpeg",
        onFileAccept: handleFileAccept,
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        post("/api/v1/commissions")
    }

    return (
        <>
            <Head title="Commission Form" />
            <h2 className="mb-12 text-center">Commission Form</h2>
            <form
                className="rounded-default border-separator border-2 p-9"
                onSubmit={handleSubmit}
            >
                <div id="form-slot">
                    <div>
                        <h5>Personal Info</h5>
                    </div>
                    <div id="form-group">
                        <Field.Root invalid={!!errors.name} required>
                            <Field.Label>Your name</Field.Label>
                            <Field.Input
                                placeholder="Name / Nickname"
                                name="name"
                                defaultValue={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <Field.ErrorText>{errors.name}</Field.ErrorText>
                            <Field.HelperText asChild>
                                <ul className="[&>li]:mt-0!">
                                    <li>Alphanumerical characters only</li>
                                    <li>Maximum 30 characters</li>
                                </ul>
                            </Field.HelperText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.email} required>
                            <Field.Label>Email</Field.Label>
                            <Field.Input
                                type="email"
                                placeholder="your@email.com"
                                name="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                defaultValue={data.email}
                            />
                            <Field.ErrorText>{errors.email}</Field.ErrorText>
                        </Field.Root>

                        <Fieldset.Root>
                            <Fieldset.Legend>Other Contacts</Fieldset.Legend>
                            <div className="mt-1 flex flex-col gap-3">
                                <Field.Root>
                                    <Field.Input
                                        addon="Telegram"
                                        placeholder="t.me/username"
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Input
                                        addon="Discord"
                                        placeholder="Username"
                                    />
                                </Field.Root>
                            </div>
                        </Fieldset.Root>
                    </div>
                </div>

                <div id="form-slot">
                    <div>
                        <h5>Commission Info</h5>
                    </div>
                    <div id="form-group">
                        <Field.Root invalid={!!errors.commission_type} required>
                            <Select.Root
                                name={"commission_type"}
                                collection={commTypes}
                                defaultValue={[commType ?? ""]}
                            >
                                <Select.Label>
                                    Commission Type
                                    <Field.RequiredIndicator>
                                        Required
                                    </Field.RequiredIndicator>
                                </Select.Label>
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Select a Commission Type" />
                                        <Select.Indicator>
                                            <CaretUpDownIcon />
                                        </Select.Indicator>
                                    </Select.Trigger>
                                </Select.Control>

                                <Select.Positioner>
                                    <Select.Content>
                                        {commTypes.items.map((item) => (
                                            <Select.Item
                                                key={item.value}
                                                item={item}
                                            >
                                                <Select.ItemText>
                                                    {item.label}
                                                </Select.ItemText>
                                                <Select.ItemIndicator>
                                                    <CheckIcon />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                                <Select.HiddenSelect
                                    onChange={(e) =>
                                        setData(
                                            "commission_type",
                                            e.target.value as CommissionType
                                        )
                                    }
                                />
                            </Select.Root>
                            <Field.ErrorText>
                                {errors.commission_type}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.idea} required>
                            <Field.Label>Commission Idea</Field.Label>
                            <Field.Textarea
                                autoresize
                                name="idea"
                                onChange={(e) =>
                                    setData("idea", e.target.value)
                                }
                            />
                            <Field.ErrorText>{errors.idea}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.ref_sheets} required>
                            <FileUpload.RootProvider value={fileUploadContext}>
                                <FileUpload.Label>
                                    Reference Sheet / Visual Depiction
                                    <Field.RequiredIndicator>
                                        Required
                                    </Field.RequiredIndicator>
                                </FileUpload.Label>
                                <FileUpload.Dropzone
                                    data-invalid={
                                        !!errors.ref_sheets ? "" : null
                                    }
                                >
                                    <div className="text-center text-sm [&>span]:block">
                                        <span>
                                            Drop your reference sheet here
                                        </span>
                                        <span className="mt-1">
                                            Max. 5MB, max. 5 files, and only
                                            png/jpeg
                                        </span>
                                    </div>
                                    <FileUpload.Trigger asChild>
                                        <Button>Browse Files</Button>
                                    </FileUpload.Trigger>
                                </FileUpload.Dropzone>

                                <FileUpload.ItemGroup>
                                    <FileUpload.Context>
                                        {({ acceptedFiles }) =>
                                            acceptedFiles.map((file) => (
                                                <FileUpload.Item
                                                    key={file.name}
                                                    file={file}
                                                >
                                                    <FileUpload.ItemPreview type="image/*">
                                                        <FileUpload.ItemPreviewImage />
                                                    </FileUpload.ItemPreview>
                                                    <FileUpload.ItemName />
                                                    <FileUpload.ItemSizeText />
                                                    <FileUpload.ItemDeleteTrigger>
                                                        <XIcon />
                                                    </FileUpload.ItemDeleteTrigger>
                                                </FileUpload.Item>
                                            ))
                                        }
                                    </FileUpload.Context>
                                </FileUpload.ItemGroup>

                                <FileUpload.ItemGroup>
                                    <div
                                        className="flex justify-end"
                                        style={{
                                            display: !!fileUploadContext
                                                .rejectedFiles.length
                                                ? "flex"
                                                : "none",
                                        }}
                                    >
                                        <button
                                            className="cursor-pointer"
                                            onClick={
                                                fileUploadContext.clearRejectedFiles
                                            }
                                            type="button"
                                        >
                                            Clear all errors
                                        </button>
                                    </div>
                                    <FileUpload.Context>
                                        {({ rejectedFiles }) =>
                                            rejectedFiles.map((rejected) => (
                                                <FileUpload.Item
                                                    key={rejected.file.name}
                                                    file={rejected.file}
                                                    data-variant="error"
                                                >
                                                    <FileUpload.ItemPreview type="image/*">
                                                        <FileUpload.ItemPreviewImage />
                                                    </FileUpload.ItemPreview>
                                                    <FileUpload.ItemName />
                                                    <FileUpload.ItemSizeText />
                                                    <div className="text-error col-span-full mt-3">
                                                        <strong>Errors</strong>
                                                        <ul>
                                                            {rejected.errors.map(
                                                                (
                                                                    error,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            fileUploadErrorMessage[
                                                                                error
                                                                            ]
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </FileUpload.Item>
                                            ))
                                        }
                                    </FileUpload.Context>
                                </FileUpload.ItemGroup>
                                <FileUpload.ClearTrigger asChild>
                                    <Button
                                        color="var(--color-error)"
                                        className="mt-6"
                                        width="full"
                                    >
                                        Clear all files
                                    </Button>
                                </FileUpload.ClearTrigger>
                                <FileUpload.HiddenInput name="ref_sheets[]" />
                            </FileUpload.RootProvider>
                            <Field.ErrorText>
                                {errors.ref_sheets}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Additional Notes</Field.Label>
                            <Field.Textarea autoresize name="notes" />
                        </Field.Root>
                    </div>
                </div>

                <div id="form-slot">
                    <div id="form-group" className="col-span-full!">
                        <Field.Root
                            className="col-span-full mt-2"
                            invalid={!!errors.tos_agreement}
                            required
                        >
                            <Checkbox.Root name={"tos_agreement"}>
                                <Checkbox.Control>
                                    <Checkbox.Indicator>
                                        <CheckIcon />
                                    </Checkbox.Indicator>
                                </Checkbox.Control>
                                <Checkbox.Label>
                                    I have read and agreed to the Terms of
                                    Service
                                </Checkbox.Label>
                                <Checkbox.HiddenInput
                                    onChange={(e) =>
                                        setData("tos_agreement", e.target.value)
                                    }
                                />

                                <Field.ErrorText>
                                    {errors.tos_agreement}
                                </Field.ErrorText>
                            </Checkbox.Root>
                        </Field.Root>

                        <Field.Root
                            className="col-span-full mt-2"
                            invalid={!!errors.no_reserve_agreement}
                            required
                        >
                            <Checkbox.Root name={"no_reserve_agreement"}>
                                <Checkbox.Control>
                                    <Checkbox.Indicator>
                                        <CheckIcon />
                                    </Checkbox.Indicator>
                                </Checkbox.Control>
                                <Checkbox.Label>
                                    I agree that this form is not a way to
                                    reserve commission slot, and the artist has
                                    all rights to accept or decline it at their
                                    discretion
                                </Checkbox.Label>
                                <Checkbox.HiddenInput
                                    onChange={(e) =>
                                        setData(
                                            "no_reserve_agreement",
                                            e.target.value
                                        )
                                    }
                                />

                                <Field.ErrorText className="basis-1">
                                    {errors.no_reserve_agreement}
                                </Field.ErrorText>
                            </Checkbox.Root>
                        </Field.Root>

                        <div className="col-span-full flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing || !isDirty}
                            >
                                {processing
                                    ? wasSuccessful
                                        ? "Success!"
                                        : "Sending..."
                                    : "Send"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
