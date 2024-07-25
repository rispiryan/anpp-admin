module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: process.cwd(),
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:perfectionist/recommended-line-length"
  ],
  plugins: ["unused-imports"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      typescript: './tsconfig.json',
    },
  },
  ignorePatterns: ["node_modules", "dist", "public", "*.js"],
  rules: {
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react",
            importNames: ["default"],
          },
        ],
      },
    ],
    "@typescript-eslint/ban-ts-comment": ["off", { "ts-expect-error": true }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],

    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        singleQuote: false,
        tabWidth: 2,
        arrowParens: "always",
      },
      {
        usePrettierrc: false,
      },
    ],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "unused-imports/no-unused-vars": "off",
    "no-unused-vars": "off",

    "unused-imports/no-unused-imports": "error",

    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",

    "linebreak-style": ["error", "unix"],
    "jsx-quotes": ["error", "prefer-double"],
    "no-debugger": "warn",
    curly: ["error"],
    "object-curly-newline": [
      "off",
      {
        ObjectExpression: "always",
        ObjectPattern: {
          minProperties: 2,
        },
      },
    ],
    "object-shorthand": ["error", "properties"],

    "react/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never",
      },
    ],
    "react/jsx-boolean-value": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "perfectionist/sort-imports": [
      "error",
      {
        "type": "line-length",
        "order": "desc",
        "groups": [
          "react",
          "globalScss",
          "side-effect",
          "type",
          ["builtin", "external"],
          "pegasus",
          "internal-type",
          "internal",
          "local",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "style",
          "object",
          "unknown"
        ],
        "custom-groups": {
          "value": {
            "react": ["react", "react-dom"],
            "globalScss": "@/scss/**",
            "local": "@/**",
          },
          "type": {
            "react": "react"
          }
        },
        "newlines-between": "always"
      }
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        "type": "line-length",
        "order": "desc",
        "partition-by-new-line": true,
        "groups": ["queryKey", "queryFn", "unknown"],
        'custom-groups': {
          queryKey: 'queryKey',
          queryFn: 'queryFn'
        },
      }
    ],
    "perfectionist/sort-jsx-props": [
      "error",
      {
        "type": "line-length",
        "order": "desc",
        "groups": ["multiline", "unknown", "shorthand"]
      }
    ],

    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-autofocus": "off",

    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: ["return", "block-like", "case"] },
      { blankLine: "always", prev: "block-like", next: "*" },
      { blankLine: "any", prev: "case", next: "case" },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": "off",
  },
}
