import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { ESLint } from "@typescript-eslint/eslint-plugin";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

export default ESLint.config({
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/no-floating-promises": "error", // Valid rule
  },
  env: {
    node: true,
    jest: true, // If using Jest for testing
  },
});