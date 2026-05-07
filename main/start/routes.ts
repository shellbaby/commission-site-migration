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

router
    .group(() => {
        // Static links //
        router.on("/").renderInertia("home", {}).as("home")
        router.on("/price").renderInertia("price", {}).as("price")
        router.on("/tos").renderInertia("tos", {}).as("tos")
        router.on("/gallery").renderInertia("gallery", {}).as("gallery")
        router.on("/contact").renderInertia("contact", {}).as("contact")

        // Commission links //
        router
            .get("/form", [controllers.commission.Commissions, "create"])
            .as("form")
        router
            .get("/commissions", [controllers.commission.Commissions, "index"])
            .as("commissions")
            .use(middleware.auth())
        router
            .get("/commissions/:commission_number", [
                controllers.commission.Commissions,
                "show",
            ])
            .as("commission-details")

        // Client-specific links //
        router
            .get("/profile", [controllers.client.Clients, "edit"])
            .as("profile")
            .use(middleware.auth())

        // Sign in/up/out links //
        router
            .get("/signin", [controllers.auth.Session, "create"])
            .as("signin")
            .use(middleware.guest())
        router
            .get("/sign-in", ({ response }) => {
                return response.redirect().toRoute("link.signin")
            })
            .as("signin-alias")

        router
            .get("/signout", [controllers.auth.Session, "destroy"])
            .as("signout")
            .use(middleware.auth())
        router
            .get("sign-out", ({ response }) => {
                return response.redirect().toRoute("link.signout")
            })
            .as("signout-alias")

        router
            .get("/signup", [controllers.client.Clients, "create"])
            .as("signup")
            .use(middleware.guest())
        router
            .get("/sign-up", ({ response }) => {
                return response.redirect().toRoute("link.signup")
            })
            .as("signup-alias")

        // Email-related links //
        router.get("/verify/:uuid", [controllers.email.Emails, "verify"])
        router
            .get("/verify", [controllers.email.Emails, "show"])
            .as("verify-instruction")
    })
    .as("link")

router
    .group(() => {
        router
            .group(() => {
                router
                    .resource("clients", controllers.client.Clients)
                    .except(["create", "edit", "index"])
                    .use(["destroy", "show", "update"], middleware.auth())

                router
                    .resource("commissions", controllers.commission.Commissions)
                    .except(["create", "edit", "update", "show", "index"])
                    .params({
                        commissions: "commission_number",
                    })
                    .use(["destroy"], middleware.auth())
            })
            .as("client")

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
                router.post("signin", [controllers.auth.Session, "store"])
            })
            .prefix("auth")
            .as("auth")
    })
    .prefix("api/v1")
