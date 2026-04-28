import type { HttpContext } from "@adonisjs/core/http"
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
    async store({ request }: HttpContext) {}

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
