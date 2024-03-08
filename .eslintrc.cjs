module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react/recommended",
    "react-app",
    "airbnb",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-multiple-empty-lines": 1,
    "no-console": 0,
    "react/prop-types": 0,
    "linebreak-style": 0,
    "react/react-in-jsx-scope": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
