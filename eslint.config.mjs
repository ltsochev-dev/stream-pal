import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactCompiler from 'eslint-plugin-react-compiler'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "art/*",
      "dist/*",
      "src/public/webOSTVjs-1.2.10/*",
      "webpack.config.js",
    ],
  },
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": ["error", {
        args: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        args: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      }]
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-restricted-syntax': 'off',
    }
  },
  {
    files: [
      "**/*.{config.js,cjs}",
      "**/postcss.config.js",
      "**/webpack.config.js",
    ],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "no-undef": "off",
    },
  },
];
