import Commission from "#models/commission"
import { commissionValidator } from "#validators/commission"
import string from "@adonisjs/core/helpers/string"
import type { HttpContext } from "@adonisjs/core/http"
import drive from "@adonisjs/drive/services/main"
import { CommissionType } from "@shellbaby/shared/types"

export default class CommissionsController {
    /**
     * Display a list of resource
     */
    async index({}: HttpContext) {}

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

        const commissionUuid = string.uuid()
        const fileURLs: string[] = []

        for (const file of ref_sheets) {
            const fileName = `commissions/${commissionUuid}/${string.random(16)}.${file.extname}`
            await file.moveToDisk(fileName)
            const fileURL = await drive.use().getUrl(fileName)
            fileURLs.push(fileURL)
        }

        const newCommData = {
            ...data,
            commissionUuid,
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
    async show({ params }: HttpContext) {}

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
