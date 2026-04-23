/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from "#generated/controllers"
import router from "@adonisjs/core/services/router"
import { middleware } from "./kernel.ts"

router.get("/", () => {
    return { hello: "world" }
})

router
    .group(() => {
        router.post("client", [controllers.client.Clients, "store"])
        router
            .group(() => {
                router.get("/", [controllers.client.Clients, "show"])
                router.patch("/", [controllers.client.Clients, "update"])
                router.delete("/", [controllers.client.Clients, "destroy"])
            })
            .prefix("client")
            .as("client")
            .use(middleware.auth({ guards: ["api"] }))

        // router
        //     .group(() => {
        //         router.resource("clients", controllers.admin.Clients).apiOnly()
        //         router
        //             .resource("commissions", controllers.admin.Commissions)
        //             .apiOnly()
        //     })
        //     .prefix("admin")
        //     .as("admin")

        router
            .group(() => {
                router.get("verify/:uuid", [controllers.email.Emails, "verify"])
                // router.get("signup-status", [controllers.auth.Signup, "status"])

                router.post("signin", [controllers.auth.Session, "store"])
                router.get("signout", [controllers.auth.Session, "destroy"])
            })
            .prefix("auth")
            .as("auth")
    })
    .prefix("/v1")
