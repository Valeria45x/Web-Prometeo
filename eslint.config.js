import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "node_modules"] },

  // Archivos de configuración (entorno Node).
  {
    files: ["*.config.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // Código de la aplicación (entorno navegador).
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "off",
      // Reglas de hooks clásicas y de alto valor.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Permite descartar variables intencionadas con prefijo _ o en MAYÚSCULAS.
      "no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" },
      ],
      // Señal de modularidad: si un archivo crece demasiado, avisa para
      // repartirlo en components/hooks/sections. No bloquea, solo orienta.
      "max-lines": [
        "warn",
        { max: 400, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  // Los archivos de datos son listas largas a propósito: no aplica max-lines.
  {
    files: ["src/data/**/*.js"],
    rules: { "max-lines": "off" },
  },

  // Desactiva reglas de estilo que choquen con Prettier (debe ir al final).
  prettier,
];
