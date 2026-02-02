import base from "./base.mjs";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...base,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
