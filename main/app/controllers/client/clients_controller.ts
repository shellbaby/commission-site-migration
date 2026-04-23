import { appUrl } from "#config/app"
import Client from "#models/client"
import { signupValidator } from "#validators/client"
import stringHelpers from "@adonisjs/core/helpers/string"
import type { HttpContext } from "@adonisjs/core/http"
import { signedUrlFor } from "@adonisjs/core/services/url_builder"
import mail from "@adonisjs/mail/services/main"
import { APIResponse } from "@shellbaby/shared/api-response"
import { HttpStatus } from "@shellbaby/shared/http-status"
import { ShowClientDTO } from "@shellbaby/shared/types/client"

export default class ClientsController {
    /**
     * NOT ALLOWED - Display a list of resource
     */
    async index({}: HttpContext) {}

    /**
     * NO NEED - Display form to create a new record
     */
    async create({}: HttpContext) {}

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
        // console.log(request.toJSON())
        const payload = await request.validateUsing(signupValidator)

        const verificationToken = stringHelpers.generateRandom(64)
        const client = await Client.create({
            ...payload,
            verificationToken: verificationToken,
        })

        const signedURL = signedUrlFor(
            "auth.emails.verify",
            { uuid: client.clientUuid },
            {
                expiresIn: "24h",
                prefixUrl: appUrl,
                purpose: "email-verification",
            }
        )

        await mail.send((msg) => {
            msg.to(payload.email)
                .subject("Verify Your Account")
                .htmlView("email/verify", {
                    client,
                    url: signedURL,
                })
        })

        response.encryptedCookie(
            "signup_status",
            {
                email: client.email,
                status: "pending",
            },
            {
                httpOnly: false,
                maxAge: "1h",
                path: "/",
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            }
        )

        return response.created<APIResponse>({
            statusCode: HttpStatus.CREATED,
            success: true,
            data: { message: "Client created" },
        })
    }

    /**
     * Show individual record
     */
    async show({ response, auth }: HttpContext) {
        const client = auth.getUserOrFail()
        return response.ok<APIResponse<ShowClientDTO>>({
            statusCode: HttpStatus.OK,
            success: true,
            data: {
                email: client.email,
                username: client.username,
                uuid: client.clientUuid,
                name: client.name ?? undefined,
            },
        })
    }

    /**
     * NO NEED - Edit individual record
     */
    async edit({ params }: HttpContext) {}

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {}

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {}
}
