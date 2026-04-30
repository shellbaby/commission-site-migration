import { CommissionSchema } from "#database/schema"
import Client from "#models/client"
import { belongsTo } from "@adonisjs/lucid/orm"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"

export default class Commission extends CommissionSchema {
    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>
}
