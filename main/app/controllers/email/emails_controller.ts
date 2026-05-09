import Client from "#models/client"
import type { HttpContext } from "@adonisjs/core/http"

export default class EmailsController {
    async show({ request, response, inertia }: HttpContext) {
        const statusCookie = request.encryptedCookie("signup_status")

        if (!statusCookie || statusCookie.status !== "pending") {
            return response.redirect().toRoute("link.static.home")
        }

        return inertia.render("auth/verify-email", {
            email: statusCookie.email,
        })
    }

    async verify({ request, response, params, inertia, auth }: HttpContext) {
        if (!request.hasValidSignature("email-verification")) {
            return inertia.render("errors/verification-failed", {})
        }

        try {
            const client = await Client.findByOrFail("client_uuid", params.uuid)
            client.isVerified = true
            client.verificationToken = null
            await client.save()

            await auth.use("web").login(client)
            response.clearCookie("signup_status")
            return response.redirect().withQs(false).toRoute("link.static.home")
        } catch (error) {
            return inertia.render("errors/verification-failed", {})
        }
    }
}
