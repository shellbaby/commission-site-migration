import { default as Client } from "#models/client"
import {
    emailValidator,
    passwordValidator,
    usernameValidator,
} from "#validators/client"
import type { HttpContext } from "@adonisjs/core/http"
import { APIResponse } from "@shellbaby/shared/api-response"
import { HttpStatus } from "@shellbaby/shared/http-status"
import { ValidationError } from "@vinejs/vine"

export default class SessionController {
    async store({ request, response, auth }: HttpContext) {
        const { username, password } = request.only(["username", "password"])

        const uidUsername = await usernameValidator
            .validate({ username })
            .catch((error: ValidationError) => {})

        const uidEmail = await emailValidator
            .validate({ email: username })
            .catch((error: ValidationError) => {})

        const pwdValidated = await passwordValidator.validate({
            password,
        })

        const uid = uidUsername
            ? uidUsername.username
            : uidEmail
              ? uidEmail.email
              : null

        if (!uid) {
            return response.unprocessableEntity<APIResponse>({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                success: false,
                errors: [
                    {
                        message: "Please use a valid username",
                        field: "username",
                    },
                ],
            })
        }

        if (!pwdValidated) {
            return response.unprocessableEntity<APIResponse>({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                success: false,
                errors: [
                    {
                        message: "Invalid password type",
                        field: "password",
                    },
                ],
            })
        }

        try {
            const client = await Client.verifyCredentials(uid, password)
            const token = await Client.accessTokens.create(client)

            return response.send({
                statusCode: HttpStatus.FOUND,
                success: true,
                data: {
                    token: token.value!.release(),
                    type: "bearer",
                },
            } as APIResponse<{ token: string; type: "bearer" }>)
        } catch (error) {
            return response.badRequest<APIResponse>({
                statusCode: HttpStatus.BAD_REQUEST,
                success: false,
                errors: [
                    {
                        message: "Invalid credentials",
                    },
                ],
            })
        }
    }

    async destroy({ auth, response }: HttpContext) {
        const currentClient = auth.user!
        const currentToken = currentClient.currentAccessToken
        const tokenId = currentToken!.identifier
        await Client.accessTokens.delete(currentClient, tokenId)

        response.ok<APIResponse>({
            statusCode: HttpStatus.OK,
            success: true,
            data: {
                message: "Signed out",
            },
        })
    }
}
