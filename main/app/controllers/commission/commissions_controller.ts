import Commission from "#models/commission"
import CommissionTransformer from "#transformers/commission_transformer"
import { commissionValidator } from "#validators/commission"
import type { HttpContext } from "@adonisjs/core/http"
import drive from "@adonisjs/drive/services/main"
import { faker } from "@faker-js/faker"
import { CommissionCode, CommissionType } from "@shellbaby/shared/types"

import CommissionPolicy from "#policies/commission_policy"
import string from "@adonisjs/core/helpers/string"

export default class CommissionsController {
    /**
     * Display a list of resource
     */
    async index({ auth, inertia }: HttpContext) {
        const client = auth.getUserOrFail()

        if (client) {
            const { clientUuid } = client
            const commissions = await Commission.query().where(
                "clientUuid",
                clientUuid
            )
            return inertia.render("commission-history", {
                commissions:
                    CommissionTransformer.transform(commissions).useVariant(
                        "forBriefView"
                    ),
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

        const client = auth.user
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

        const clientIdentifier = uuid ?? data.email
        const rootPath = `${clientIdentifier}/commissions/${commissionNumber}`

        for (const file of ref_sheets) {
            const randomAdj = faker.word.adjective({
                length: { min: 3, max: 7 },
            })
            const randomColor = faker.color.human()
            const randomAnimal = faker.animal.type()
            const randomFileName = string.pascalCase(
                `${randomAdj} ${randomColor} ${randomAnimal}`
            )
            const filePath = `${rootPath}/${randomFileName}.${file.extname}`
            await file.moveToDisk(filePath)
            const fileURL = await drive.use().getUrl(filePath)
            fileURLs.push(fileURL)
        }

        const newCommData = {
            ...data,
            commissionNumber,
            type: commission_type,
            clientUuid: uuid,
            refSheets: JSON.stringify(fileURLs),
        }

        await Commission.create({ ...newCommData })

        session.flash("success", "Commission created!")

        return response.redirect().toRoute("link.commissions")
    }

    /**
     * Show individual record
     */
    async show({ params, inertia, bouncer, response }: HttpContext) {
        const commissionNumber = params.commission_number
        const commission = await Commission.query()
            .where("commission_number", commissionNumber)
            .first()

        if (!commission) {
            response.notFound()
            return inertia.render("errors/not-found/commission", {})
        }

        if (await bouncer.with(CommissionPolicy).denies("show", commission)) {
            response.notFound()
            return inertia.render("errors/not-found/commission", {})
        }

        return inertia.render("commission-details", {
            commission:
                CommissionTransformer.transform(commission) ?? undefined,
        })
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
    async destroy({ params, response, bouncer }: HttpContext) {
        const commissionNumber = params.commission_number

        const commission = await Commission.query()
            .where("commission_number", commissionNumber)
            .first()

        if (!commission) {
            return response.redirect().status(303).back()
        }

        if (await bouncer.with(CommissionPolicy).denies("delete", commission)) {
            return response.redirect().status(303).back()
        }

        await commission.delete()
        return response.redirect().status(303).back()
    }
}
