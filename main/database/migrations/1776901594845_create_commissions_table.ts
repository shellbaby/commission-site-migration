import { BaseSchema } from "@adonisjs/lucid/schema"
import {
    CommissionStatus,
    CommissionType,
    PaymentStatus,
} from "@shellbaby/shared/types"

export default class extends BaseSchema {
    protected tableName = "commissions"

    async up() {
        this.schema.raw('DROP TYPE IF EXISTS "commission_type"')
        this.schema.raw('DROP TYPE IF EXISTS "commission_status"')
        this.schema.raw('DROP TYPE IF EXISTS "payment_status"')

        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary().unique()

            // Generate at backend //
            table.uuid("commission_uuid").notNullable().unique()
            table.string("commission_number").notNullable()
            table
                .uuid("client_uuid")
                .references("client_uuid")
                .inTable("clients")
                .onDelete("CASCADE")
                .nullable()
                .index()
            table.jsonb("ref_sheet_urls").notNullable()
            table.jsonb("ref_sheet_paths").notNullable()
            table.timestamp("created_at", { useTz: true }).notNullable()
            table.timestamp("updated_at", { useTz: true }).nullable()

            // From frontend //
            table.string("email", 255).notNullable()
            table.string("name", 255).notNullable()
            table
                .enum("type", CommissionType, {
                    useNative: true,
                    enumName: "commission_type",
                    existingType: false,
                })
                .notNullable()
            table.jsonb("contacts").nullable()
            table.text("idea").notNullable()
            table.text("notes").nullable()
            table
                .enum("status", CommissionStatus, {
                    useNative: true,
                    enumName: "commission_status",
                    existingType: false,
                })
                .defaultTo("pending")
                .notNullable()
            table
                .enum("payment_status", PaymentStatus, {
                    useNative: true,
                    enumName: "payment_status",
                    existingType: false,
                })
                .defaultTo("pending")
                .notNullable()
            table.boolean("tos_agreement").notNullable()
            table.boolean("no_reserve_agreement").notNullable()
        })
    }

    async down() {
        this.schema.raw('DROP TYPE IF EXISTS "commission_type"')
        this.schema.raw('DROP TYPE IF EXISTS "commission_status"')
        this.schema.raw('DROP TYPE IF EXISTS "payment_status"')
        this.schema.dropTable(this.tableName)
    }
}
