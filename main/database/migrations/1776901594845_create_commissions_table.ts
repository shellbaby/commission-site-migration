import { BaseSchema } from "@adonisjs/lucid/schema"
import { CommissionStatus, CommissionType } from "../../shared/types.ts"

export default class extends BaseSchema {
    protected tableName = "commissions"

    async up() {
        this.schema.raw('DROP TYPE IF EXISTS "commission_type"')
        this.schema.raw('DROP TYPE IF EXISTS "commission_status"')

        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary().unique()

            // Generate at backend //
            table.uuid("commission_uuid").notNullable()
            table
                .uuid("client_uuid")
                .references("client_uuid")
                .inTable("clients")
                .onDelete("CASCADE")
                .notNullable()
                .index()
            table.timestamp("created_at", { useTz: true }).notNullable()
            table.timestamp("updated_at", { useTz: true }).nullable()

            // From frontend //
            table
                .enum("type", CommissionType, {
                    useNative: true,
                    enumName: "commission_type",
                    existingType: false,
                })
                .notNullable()
            table.text("idea").notNullable()
            table.string("ref_sheet", 255).notNullable()
            table.text("notes", "mediumtext")
            table
                .enum("status", CommissionStatus, {
                    useNative: true,
                    enumName: "commission_status",
                    existingType: false,
                })
                .defaultTo("pending")
        })
    }

    async down() {
        this.schema.raw('DROP TYPE IF EXISTS "commission_type"')
        this.schema.raw('DROP TYPE IF EXISTS "commission_status"')
        this.schema.dropTable(this.tableName)
    }
}
