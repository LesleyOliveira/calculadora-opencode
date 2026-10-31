# AGENTS.md

## Project

React 18 + Vite 6 calculator SPA in plain JavaScript (no TypeScript). UI text, code comments and docs are in Brazilian Portuguese (pt-BR) — keep new text consistent.

## Commands

- `npm install`
- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built `dist/`

There is **no** test runner, linter, formatter or typechecker configured. The README's ESLint section is leftover Vite template boilerplate: `npm test` and `npm run lint` do not exist. Don't add tooling unless asked.

## Structure

- `src/main.jsx` — entrypoint; mounts `<App />` into `#root` under StrictMode and imports the only stylesheet.
- `src/App.jsx` — owns all state (`display`, `anterior`, `operador`, `novoNumero`) and keypad wiring.
- `src/components/Display.jsx`, `src/components/Botao.jsx` — presentational only.
- `src/utils/operacoes.js` — pure arithmetic functions.
- `src/index.css` — single global stylesheet with plain classes (no CSS modules, no Tailwind).

## Conventions and gotchas

- Comente o código em português.
- Components: PascalCase filenames, `export default function`. Utils: named exports.
- `Botao` invokes `onClick(valor)`, so every handler receives the button label as its argument.
- Adding an operator requires three coordinated edits: implement it in `operacoes.js`, add it to `OPERADORES`, and handle it in `calcular()` in `App.jsx`. All four (`+`, `-`, `×`, `÷`) are wired up; the button label doubles as the operator key.
- Input handling is a flag-based state machine, not an expression parser: `novoNumero` decides replace-vs-append for digits, while `anterior`/`operador` hold the pending operation.
- The decimal point uses its own `digitarPonto`, not `digitarNumero`: with `novoNumero` it starts `"0."`, otherwise it appends `.` only if `display` has no `.` yet (one point per number). Numbers are read with `Number()`, so trailing dots like `"5."` are fine.
- `dividir` returns `null` for division by zero; `App` renders that as `"Erro"` and resets the pending operation.
- `arredondar` (in `operacoes.js`) caps results at 12 significant digits, so floating-point noise like `0.1 + 0.2` shows as `0.3`. `calcular()` in `App.jsx` wraps every operation with it; `null` and non-finite values pass through untouched.
- Known TODO: operation history in `App.jsx`.
