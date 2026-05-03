import Commission from "#models/commission"
import CommissionTransformer from "#transformers/commission_transformer"
import { commissionValidator } from "#validators/commission"
import string from "@adonisjs/core/helpers/string"
import type { HttpContext } from "@adonisjs/core/http"
import drive from "@adonisjs/drive/services/main"
import { faker } from "@faker-js/faker"
import { CommissionCode, CommissionType } from "@shellbaby/shared/types"

export default class CommissionsController {
    /**
     * Display a list of resource
     */
    async index({ auth, response, inertia }: HttpContext) {
        const client = auth.getUserOrFail()

        if (client) {
            const clientUuid = client.clientUuid
            const commissions = await Commission.query().where(
                "clientUuid",
                clientUuid
            )
            return inertia.render("commission-history", {
                commissions: CommissionTransformer.transform(commissions),
            })
        }
    }

    /**
     * Display form to create a new record
     */
    async create({ inertia, request }: HttpContext) {
        const commType = request.input("type")
        const cleanedCommType = CommissionType.includes(commType)
            ? commType
            : undefined

        return inertia.render("form", { commType: cleanedCommType })
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response, auth, session }: HttpContext) {
        const { ref_sheets, commission_type, ...data } =
            await request.validateUsing(commissionValidator)

        if (ref_sheets.length === 0) {
            session.flash("error", "Please upload at least one file")
            return response.badRequest()
        }

        const client = auth.getUserOrFail()
        let uuid = null

        if (client) {
            uuid = client.clientUuid
        }

        const getCommissionNumber = async () => {
            let unique = false
            let commissionNumber = ""

            while (!unique) {
                commissionNumber = `${CommissionCode[commission_type]}${faker.string.numeric(7)}`

                const existingCommission = await Commission.query()
                    .where("commission_number", commissionNumber)
                    .first()

                if (!existingCommission) {
                    unique = true
                }
            }

            return commissionNumber
        }

        const commissionNumber = await getCommissionNumber()

        const fileURLs: string[] = []

        for (const file of ref_sheets) {
            const fileName = `commissions/${commissionNumber}/${string.random(16)}.${file.extname}`
            await file.moveToDisk(fileName)
            const fileURL = await drive.use().getUrl(fileName)
            fileURLs.push(fileURL)
        }

        const newCommData = {
            ...data,
            commissionNumber,
            type: commission_type,
            clientUuid: uuid,
            refSheets: JSON.stringify(fileURLs),
        }

        const comm = await Commission.create({ ...newCommData })

        return response.ok(comm)
    }

    /**
     * Show individual record
     */
    async show({ params }: HttpContext) {
        const commissionUuid = params.commission_uuid
        const commission = await Commission.query()
            .where("commission_uuid", commissionUuid)
            .first()

        if (!commission) {
            return
        }
    }

    /**
     * Edit individual record
     */
    async edit({ params }: HttpContext) {}

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {}

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {}
}
