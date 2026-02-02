import base from "./base.mjs";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...base,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },
];
