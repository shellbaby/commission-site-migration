import PasswordChangeNotification from "#mails/password_change_notification"
import { updateValidator } from "#validators/password"
import type { HttpContext } from "@adonisjs/core/http"
import hash from "@adonisjs/core/services/hash"
import mail from "@adonisjs/mail/services/main"

export default class PasswordController {
    async update({ auth, request, response, session }: HttpContext) {
        const { password_current, password } =
            await request.validateUsing(updateValidator)

        const client = auth.getUserOrFail()

        const isCorrectCurrentPassword = await hash.verify(
            client.password,
            password_current
        )

        if (!isCorrectCurrentPassword) {
            session.flash("error", "The current password is incorrect")
            return response.redirect().status(303).back()
        }

        client.password = password
        await client.save()

        await mail.send(new PasswordChangeNotification(client))

        session.flash("success", "Password changed successfully")
        return response.redirect().status(303).back()
    }

    async test({ auth, response }: HttpContext) {
        const client = auth.getUserOrFail()
        await mail.send(new PasswordChangeNotification(client))
        return response.redirect().status(303).back()
    }
}
