import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema {
    protected tableName = "clients"

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").notNullable().primary().unique()

            // From frontend //
            table.string("username", 30).notNullable().unique()
            table.string("email", 255).notNullable().unique()
            table.string("name", 255).nullable()
            table.string("password", 255).notNullable()

            // Generated at backend //
            table.uuid("client_uuid").notNullable().unique()
            table.boolean("is_verified").defaultTo(false)
            table.string("verification_token").nullable()
            table.timestamp("created_at", { useTz: true }).notNullable()
            table.timestamp("updated_at", { useTz: true }).nullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
