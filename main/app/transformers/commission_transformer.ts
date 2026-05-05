import Commission from "#models/commission"
import { BaseTransformer } from "@adonisjs/core/transformers"
import {
    CommissionStatus,
    CommissionType,
    CommissionTypeMapping,
    PaymentStatus,
} from "@shellbaby/shared/types"

export default class CommissionTransformer extends BaseTransformer<Commission> {
    toObject() {
        return {
            ...this.pick(this.resource, [
                "commissionNumber",
                "createdAt",
                "idea",
                "notes",
            ]),
            type: CommissionTypeMapping[this.resource.type as CommissionType],
            status: this.resource.status as CommissionStatus,
            refSheets: this.resource.refSheets as string[],
            paymentStatus: this.resource.paymentStatus as PaymentStatus,
        }
    }

    forBriefView() {
        return {
            ...this.pick(this.resource, ["commissionNumber", "createdAt"]),
            type: CommissionTypeMapping[this.resource.type as CommissionType],
            status: this.resource.status as CommissionStatus,
            paymentStatus: this.resource.paymentStatus as PaymentStatus,
        }
    }
}
