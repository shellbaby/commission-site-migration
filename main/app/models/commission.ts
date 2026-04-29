import { CommissionSchema } from "#database/schema"
import Client from "#models/client"
import { beforeCreate, belongsTo } from "@adonisjs/lucid/orm"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"
import { randomUUID } from "node:crypto"

export default class Commission extends CommissionSchema {
    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>

    @beforeCreate()
    public static generateUUID(commission: Commission) {
        commission.commissionUuid = randomUUID()
    }
}
