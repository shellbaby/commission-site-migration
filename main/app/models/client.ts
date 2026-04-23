import { ClientSchema } from "#database/schema"
import Commission from "#models/commission"
import {
    AccessToken,
    DbAccessTokensProvider,
} from "@adonisjs/auth/access_tokens"
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid"
import { compose } from "@adonisjs/core/helpers"
import hash from "@adonisjs/core/services/hash"
import { beforeCreate, hasMany } from "@adonisjs/lucid/orm"
import type { HasMany } from "@adonisjs/lucid/types/relations"
import { randomUUID } from "node:crypto"

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
    uids: ["email", "username"],
    passwordColumnName: "password",
})

export default class Client extends compose(ClientSchema, AuthFinder) {
    currentAccessToken?: AccessToken

    @hasMany(() => Commission)
    declare commissions: HasMany<typeof Commission>

    @beforeCreate()
    public static generateUUID(client: Client) {
        client.clientUuid = randomUUID()
    }

    static accessTokens = DbAccessTokensProvider.forModel(Client, {
        expiresIn: "7 days",
    })
}
