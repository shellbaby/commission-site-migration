import Client from "#models/client"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ClientTransformer extends BaseTransformer<Client> {
    toObject() {
        return this.pick(this.resource, [
            "username",
            "name",
            "email",
            "clientUuid",
        ])
    }
}
