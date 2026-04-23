import Client from "#models/client"
import type { HttpContext } from "@adonisjs/core/http"

export default class EmailsController {
    async verify({ request, response, params }: HttpContext) {
        if (!request.hasValidSignature("email-verification")) {
            return response.badRequest({
                message: "Invalid or expired verification link",
            })
        }

        const client = await Client.findByOrFail("client_uuid", params.uuid)
        client.isVerified = true
        client.verificationToken = null
        await client.save()

        response.clearCookie("signup_status")

        return response.redirect().withQs(false).toPath("/?verified=true")
    }
}
