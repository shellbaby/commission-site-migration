import Client from "#models/client"
import Commission from "#models/commission"
import { BasePolicy } from "@adonisjs/bouncer"
import type { AuthorizerResponse } from "@adonisjs/bouncer/types"
import { CommissionStatus } from "@shellbaby/shared/types"

export default class CommissionPolicy extends BasePolicy {
    // index(client: Client, commission: Commission): AuthorizerResponse {
    //     return client.clientUuid === commission.clientUuid
    // }

    // create(client: Client): AuthorizerResponse {}

    // store(client: Client): AuthorizerResponse {}

    show(client: Client, commission: Commission): AuthorizerResponse {
        return client.clientUuid === commission.clientUuid
    }

    delete(client: Client, commission: Commission): AuthorizerResponse {
        const clientCheck = client.clientUuid === commission.clientUuid
        const statusCheck =
            (commission.status as CommissionStatus) === "pending"

        return clientCheck && statusCheck
    }
}
