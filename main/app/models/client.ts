import { ClientSchema } from "#database/schema"
import Commission from "#models/commission"
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid"
import { compose } from "@adonisjs/core/helpers"
import hash from "@adonisjs/core/services/hash"
import { beforeCreate, hasMany } from "@adonisjs/lucid/orm"
import type { HasMany } from "@adonisjs/lucid/types/relations"
import { randomUUID } from "node:crypto"

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
    uids: ["username"],
    passwordColumnName: "password",
})

export default class Client extends compose(ClientSchema, AuthFinder) {
    @hasMany(() => Commission)
    declare commissions: HasMany<typeof Commission>

    @beforeCreate()
    public static generateUUID(client: Client) {
        client.clientUuid = randomUUID()
    }
}
