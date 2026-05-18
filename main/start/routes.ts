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

router.where("commission_uuid", router.matchers.uuid())

router
    .group(() => {
        // Static links //
        router
            .group(() => {
                router.on("/").renderInertia("home", {}).as("home")
                router.on("/price").renderInertia("price", {}).as("price")
                router.on("/tos").renderInertia("tos", {}).as("tos")
                router.on("/gallery").renderInertia("gallery", {}).as("gallery")
                router.on("/contact").renderInertia("contact", {}).as("contact")
            })
            .as("static")

        // Commission links //
        router
            .group(() => {
                router
                    .get("/form", [
                        controllers.commission.Commissions,
                        "create",
                    ])
                    .as("create")

                router
                    .group(() => {
                        router
                            .get("/", [
                                controllers.commission.Commissions,
                                "index",
                            ])
                            .as("index")

                        router
                            .get("/:commission_uuid", [
                                controllers.commission.Commissions,
                                "show",
                            ])
                            .as("show")
                    })
                    .as("auth")
                    .use(middleware.auth())

                router
                    .group(() => {
                        router
                            .get("/:commission_uuid", [
                                controllers.commission.guest.Commissions,
                                "show",
                            ])
                            .as("show")
                    })
                    .as("guest")
                    .prefix("guest")
                    .use(middleware.guest())
            })
            .as("commissions")
            .prefix("commissions")

        // Client-specific links //
        router
            .group(() => {
                router
                    .get("/profile", [controllers.client.Clients, "edit"])
                    .as("profile")
            })
            .as("clients")
            .use(middleware.auth())

        // Auth links //
        router
            .group(() => {
                // Sign in //
                router
                    .get("/signin", [controllers.auth.Session, "create"])
                    .as("signin")
                router
                    .get("/sign-in", ({ response }) => {
                        return response
                            .redirect()
                            .toRoute("link.registration.signin")
                    })
                    .as("signin-alias")

                // Sign up //
                router
                    .get("/signup", [controllers.client.Clients, "create"])
                    .as("signup")
                router
                    .get("/sign-up", ({ response }) => {
                        return response
                            .redirect()
                            .toRoute("link.registration.signup")
                    })
                    .as("signup-alias")
            })
            .as("registration")
            .use(middleware.guest())

        // Email-related links //
        router
            .group(() => {
                router
                    .get("/:uuid", [controllers.email.Emails, "verify"])
                    .as("verify")
                router
                    .get("/", [controllers.email.Emails, "show"])
                    .as("verify.instruction")
            })
            .as("email")
            .prefix("verify")
    })
    .as("link")

router
    .group(() => {
        router
            .group(() => {
                router
                    .resource("clients", controllers.client.Clients)
                    .except(["create", "edit", "index", "update", "destroy"])
                    .use(["show"], middleware.auth())

                router
                    .group(() => {
                        router.patch("clients", [
                            controllers.client.Clients,
                            "update",
                        ])
                        router.delete("clients", [
                            controllers.client.Clients,
                            "destroy",
                        ])
                    })
                    .use(middleware.auth())

                router
                    .resource("commissions", controllers.commission.Commissions)
                    .except(["create", "edit", "update", "show", "index"])
                    .params({
                        commissions: "commission_uuid",
                    })
                    .use(["destroy"], middleware.auth())
            })
            .as("client")

        router
            .group(() => {
                router
                    .resource(
                        "commissions",
                        controllers.commission.guest.Commissions
                    )
                    .except([
                        "index",
                        "create",
                        "edit",
                        "update",
                        "destroy",
                        "show",
                    ])
                    .params({
                        commissions: "commission_uuid",
                    })
            })
            .as("guest")
            .prefix("guest")
        // .use(middleware.guest())

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

                router
                    .get("signout", [controllers.auth.Session, "destroy"])
                    .use(middleware.auth())
            })
            .prefix("auth")
            .as("auth")
    })
    .prefix("api/v1")
