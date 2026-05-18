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

        const client = auth.getUserOrFail()

        const commissionNumber = `${CommissionCode[commission_type]}${faker.string.numeric(7)}`
        const commissionUuid = string.uuid()

        const fileURLs: string[] = []
        const filePaths: string[] = []

        const rootPath = `clients/${client.clientUuid}/commissions/${commissionUuid}`

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
            filePaths.push(filePath)
            const fileURL = await drive.use().getUrl(filePath)
            fileURLs.push(fileURL)
        }

        await Commission.create({
            ...data,
            commissionNumber,
            commissionUuid,
            type: commission_type,
            clientUuid: client ? client.clientUuid : null,
            refSheetUrls: JSON.stringify(fileURLs),
            refSheetPaths: JSON.stringify(filePaths),
        })

        session.flash("success", "Commission created!")
    }

    /**
     * Show individual record
     */
    async show({ params, inertia, bouncer, response }: HttpContext) {
        const commissionUuid = params.commission_uuid
        const commission = await Commission.query()
            .where("commission_uuid", commissionUuid)
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
        const commissionUuid = params.commission_uuid

        const commission = await Commission.query()
            .where("commission_uuid", commissionUuid)
            .first()

        if (!commission) {
            return response.notFound()
        }

        if (await bouncer.with(CommissionPolicy).denies("delete", commission)) {
            return response.forbidden()
        }

        await commission.delete()
        return response.noContent()
    }
}
