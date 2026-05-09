import { appUrl } from "#config/app"
import Client from "#models/client"
import Commission from "#models/commission"
import { signupValidator } from "#validators/client"
import stringHelpers from "@adonisjs/core/helpers/string"
import type { HttpContext } from "@adonisjs/core/http"
import { signedUrlFor } from "@adonisjs/core/services/url_builder"
import drive from "@adonisjs/drive/services/main"
import mail from "@adonisjs/mail/services/main"

export default class ClientsController {
    /**
     * NOT ALLOWED - Display a list of resource
     */
    async index({}: HttpContext) {}

    /**
     * Display form to create a new record
     */
    async create({ inertia }: HttpContext) {
        return inertia.render("auth/signup", {})
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(signupValidator)

        const verificationToken = stringHelpers.generateRandom(64)
        const client = await Client.create({
            ...payload,
            verificationToken: verificationToken,
        })

        const commissions = await Commission.query()
            .select("*")
            .where("email", client.email)

        if (commissions.length > 0) {
            const disk = drive.use()
            const clientUuid = client.clientUuid

            const newFilePaths: string[] = []
            const newFileUrls: string[] = []

            for (const commission of commissions) {
                const commissionUuid = commission.commissionUuid
                const sourceFiles = commission.refSheetPaths as string[]

                for (const source of sourceFiles) {
                    const fileName = source.split("/").at(-1)
                    const destination = `clients/${clientUuid}/commissions/${commissionUuid}/${fileName}`
                    await disk.move(source, destination)
                    newFilePaths.push(destination)
                    const newFileUrl = await disk.getUrl(destination)
                    newFileUrls.push(newFileUrl)
                }

                commission.clientUuid = clientUuid
                commission.refSheetPaths = JSON.stringify(newFilePaths)
                commission.refSheetUrls = JSON.stringify(newFileUrls)
                await commission.save()
            }
        }

        const signedURL = signedUrlFor(
            "link.email.verify",
            { uuid: client.clientUuid },
            {
                expiresIn: "30m",
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
                httpOnly: true,
                maxAge: "30m",
                path: "/",
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            }
        )

        return response.redirect().toRoute("link.email.verify.instruction")
    }

    /**
     * Show individual record
     */
    async show({ response, auth }: HttpContext) {
        // const client = auth.getUserOrFail()
        // return response.ok<APIResponse<ShowClientDTO>>({
        //     statusCode: HttpStatus.OK,
        //     success: true,
        //     data: {
        //         email: client.email,
        //         username: client.username,
        //         uuid: client.clientUuid,
        //         name: client.name ?? undefined,
        //     },
        // })
    }

    /**
     * Edit individual record
     */
    async edit({ inertia }: HttpContext) {
        return inertia.render("profile", {})
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ request }: HttpContext) {}

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {}
}
