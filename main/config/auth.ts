import { defineConfig } from "@adonisjs/auth"
import { sessionGuard, sessionUserProvider } from "@adonisjs/auth/session"
import type { Authenticators, InferAuthEvents } from "@adonisjs/auth/types"

const authConfig = defineConfig({
    /**
     * Default guard used when no guard is explicitly specified.
     */
    default: "web",

    guards: {
        /**
         * Token-based guard for stateless API authentication.
         */
        // api: tokensGuard({
        //     provider: tokensUserProvider({
        //         tokens: "accessTokens",
        //         model: () => import("#models/client"),
        //     }),
        // }),

        /**
         * Session-based guard for browser authentication.
         */
        web: sessionGuard({
            /**
             * Enable persistent login using remember-me tokens.
             */
            useRememberMeTokens: true,
            rememberMeTokensAge: "30d",

            provider: sessionUserProvider({
                model: () => import("#models/client"),
            }),
        }),
    },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module "@adonisjs/auth/types" {
    export interface Authenticators extends InferAuthenticators<
        typeof authConfig
    > {}
}
declare module "@adonisjs/core/types" {
    interface EventsList extends InferAuthEvents<Authenticators> {}
}
