import type { HttpContext } from "@adonisjs/core/http"
import { APIResponse } from "@shellbaby/shared/api-response"
import { HttpStatus } from "@shellbaby/shared/http-status"

export default class SignupController {
    async status({ request, response }: HttpContext) {
        const signupStatus = request.encryptedCookie("signup_status")

        if (!signupStatus || signupStatus.status !== "pending") {
            return response.forbidden<APIResponse>({
                statusCode: HttpStatus.FORBIDDEN,
                success: false,
                errors: [
                    {
                        message: "Acess denied",
                    },
                ],
            })
        }

        return response.accepted<APIResponse>({
            statusCode: HttpStatus.ACCEPTED,
            success: true,
            data: {
                email: signupStatus.email,
            },
        })
    }
}
