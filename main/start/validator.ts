/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import vine, { SimpleMessagesProvider, VineDate } from "@vinejs/vine"
import { DateTime } from "luxon"

declare module "@vinejs/vine/types" {
    interface VineGlobalTransforms {
        date: DateTime
    }
}

VineDate.transform((value) => DateTime.fromJSDate(value))

vine.messagesProvider = new SimpleMessagesProvider({
    email: "Must be a valid email address",

    "password.regex": "Password is not secure enough",
    "password_new.regex": "Password is not secure enough",
    "password_confirmation.confirmed": "Passwords do not match",
    "name.regex": "Name format is invalid",
})
