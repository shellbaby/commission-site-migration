import Commission from "#models/commission"
import CommissionTransformer from "#transformers/commission_transformer"
import { commissionValidator } from "#validators/commission"
import { base64 } from "@adonisjs/core/helpers"
import string from "@adonisjs/core/helpers/string"
import type { HttpContext } from "@adonisjs/core/http"
import drive from "@adonisjs/drive/services/main"
import { faker } from "@faker-js/faker"
import { CommissionCode } from "@shellbaby/shared/types"

export default class CommissionsController {
    /**
     * NOT ALLOWED - Display a list of resource
     */
    async index({}: HttpContext) {}

    /**
     * REUSE FROM THE OTHER ONE - Display form to create a new record
     */
    async create({}: HttpContext) {}

    /**
     * Handle form submission for the create action
     */
    async store({ request, response, session }: HttpContext) {
        const { ref_sheets, commission_type, ...data } =
            await request.validateUsing(commissionValidator)

        if (ref_sheets.length === 0) {
            session.flash("error", "Please upload at least one file")
            return response.badRequest()
        }

        const commissionNumber = `${CommissionCode[commission_type]}${faker.string.numeric(7)}`
        const commissionUuid = string.uuid()

        const fileURLs: string[] = []
        const filePaths: string[] = []

        const encodedEmail = base64.urlEncode(data.email)

        const rootPath = `guests/${encodedEmail}/commissions/${commissionUuid}`

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
            clientUuid: null,
            refSheetUrls: JSON.stringify(fileURLs),
            refSheetPaths:JSON.stringify(filePaths)
        })

        session.flash("success", "Commission created!")
        return response
            .redirect()
            .status(303)
            .toRoute("link.commissions.guest.show", {
                commission_uuid: commissionUuid,
            })
    }

    /**
     * Show individual record
     */
    async show({ params, inertia, response }: HttpContext) {
        const commissionUuid = params.commission_uuid
        const commission = await Commission.query()
            .where("commission_uuid", commissionUuid)
            .first()

        if (!commission) {
            response.notFound()
            return inertia.render("errors/not-found/commission", {})
        }

        return inertia.render("commission-details", {
            commission:
                CommissionTransformer.transform(commission) ?? undefined,
        })
    }

    /**
     * NOT ALLOWED - Edit individual record
     */
    async edit({ params }: HttpContext) {}

    /**
     * NOT ALLOWED - Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {}

    /**
     * NOT ALLOWED - Delete record
     */
    async destroy({ params }: HttpContext) {}
}
