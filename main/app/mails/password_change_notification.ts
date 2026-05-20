import Client from "#models/client"
import { BaseMail } from "@adonisjs/mail"

export default class PasswordChangeNotification extends BaseMail {
    subject = "Password Change"

    constructor(private client: Client) {
        super()
    }

    /**
     * The "prepare" method is called automatically when
     * the email is sent or queued.
     */
    prepare() {
        this.message.to(this.client.email).htmlView("email/password_change", {
            client: this.client,
        })
    }
}
