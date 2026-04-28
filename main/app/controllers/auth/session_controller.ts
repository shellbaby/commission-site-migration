import Client from "#models/client"
import { signinValidator } from "#validators/client"
import type { HttpContext } from "@adonisjs/core/http"

export default class SessionController {
    async create({ inertia }: HttpContext) {
        return inertia.render("auth/signin", {})
    }

    async store({ request, response, auth }: HttpContext) {
        const payload = await request.validateUsing(signinValidator)

        const client = await Client.verifyCredentials(
            payload.username,
            payload.password
        )

        await auth.use("web").login(client)
        return response.redirect().back()
    }

    async destroy({ auth, response }: HttpContext) {
        await auth.use("web").logout()
        return response.redirect().toRoute("link.signin")
    }
}
