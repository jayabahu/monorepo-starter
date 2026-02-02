import nextjsConfig from "@myapp/eslint-config/nextjs";

export default [
  { ignores: [".next/**"] },
  ...nextjsConfig,
];
