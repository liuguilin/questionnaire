module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  globals: {},
  plugins: ["prettier", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  rules: {
    "prettier/prettier": "error",
    "no-alert": "off",
    "no-eval": "error",
    "react/react-in-jsx-scope": "off",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "spaced-comment": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "react/prop-types": 0,
    "no-console": 0,
    "no-useless-escape": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/camelcase": 0,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "@typescript-eslint/no-this-alias": [
      "warn",
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ["self"], // Allow `const self = this`; `[]` by default
      },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/ban-ts-comment": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          "exposure-key",
          "click-key",
          "report-data",
          "report-exposure-data",
          "report-click-data",
        ],
      },
    ],
  },
};
