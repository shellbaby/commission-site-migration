import Commission from "#models/commission"
import CommissionPolicy from "#policies/commission_policy"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import { BaseTransformer } from "@adonisjs/core/transformers"
import {
    CommissionStatus,
    CommissionType,
    CommissionTypeMapping,
    PaymentStatus,
} from "@shellbaby/shared/types"

export default class CommissionTransformer extends BaseTransformer<Commission> {
    @inject()
    async toObject({ bouncer }: HttpContext) {
        const policy = bouncer.with(CommissionPolicy)

        return {
            ...this.pick(this.resource, [
                "commissionNumber",
                "createdAt",
                "idea",
                "notes",
            ]),
            type: CommissionTypeMapping[this.resource.type as CommissionType],
            status: this.resource.status as CommissionStatus,
            refSheetsUrls: this.resource.refSheetUrls as string[],
            paymentStatus: this.resource.paymentStatus as PaymentStatus,
            permissions: {
                delete: await policy.allows("delete", this.resource),
            },
        }
    }

    @inject()
    async forBriefView({ bouncer }: HttpContext) {
        const policy = bouncer.with(CommissionPolicy)

        return {
            ...this.pick(this.resource, [
                "commissionNumber",
                "createdAt",
                "commissionUuid",
            ]),
            type: CommissionTypeMapping[this.resource.type as CommissionType],
            status: this.resource.status as CommissionStatus,
            paymentStatus: this.resource.paymentStatus as PaymentStatus,
            permissions: {
                delete: await policy.allows("delete", this.resource),
            },
        }
    }
}
