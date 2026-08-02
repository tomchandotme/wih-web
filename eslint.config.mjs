import nextVitals from "eslint-config-next/core-web-vitals"

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**"] },
  ...nextVitals,
]

export default eslintConfig
