import User from '#models/user'
import Client from '#models/client'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ClientPolicy extends BasePolicy {
    // update(client: Client)
}