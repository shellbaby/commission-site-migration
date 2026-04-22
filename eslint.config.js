import stylistic from "@stylistic/eslint-plugin"
import eslintReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import typescriptEslint from "typescript-eslint"

export default defineConfig([
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js"],
        languageOptions: {
            parser: typescriptEslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "@stylistic": stylistic,
            "@ts-eslint": typescriptEslint.plugin,
            react: eslintReact,
        },
        rules: {
            "@stylistic/quotes": ["warn", "double"],
            "@ts-eslint/no-empty-object-type": "warn",
            "react/react-in-jsx-scope": "off",
            "@stylistic/jsx-self-closing-comp": [
                "warn",
                { component: true, html: true },
            ],
        },
        ignores: [],
    },
])
