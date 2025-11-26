# Day 2 Exercises — Objects & Enums

1. Create an enum `TaskStatus` with values: `Pending`, `InProgress`, `Completed`, `Failed`.
2. Create an interface `Task` with properties: `id: number`, `name: string`, `status: TaskStatus`.
3. Create an array of `Task` objects and implement a small helper that:
   - Lists tasks grouped by status, and
   - Checks whether a given status is final (Completed | Failed).
4. Put `TaskStatus` in its own file and import it from another folder to verify cross-file/module resolution.

---

## Report of the Exercise

1. Added `TaskStatus` enum in `src/TaskStatus.ts` and exported it (prefer named exports for clarity).
2. Created `Task` interface in `src/Task.ts` and used `import type` when only the type is needed.
3. Implemented example usage in `src/index.ts` that:
   - Builds an example `tasks` array,
   - Prints grouped counts, and
   - Demonstrates a runtime comparison against the enum values.
4. Verified module resolution with NodeNext:
   - Use explicit `.js` extension in import paths in source files (e.g., `import { TaskStatus } from "./TaskStatus.js";`) when `moduleResolution` is `node16`/`nodenext`.
   - Ensure `package.json` `type` field is set appropriately (or adjust `tsconfig` to compile to CommonJS).

## Scripts

Add or use these scripts in the package where this code lives:

```json
"scripts": {
  "build": "tsc -p .",
  "watch": "tsc -p . --watch",
  "exec": "node ./dist/index.js"
}
```

## Notes

- Enums are runtime values: do not use `import type` for values you compare at runtime.
- If you see errors about `.js` extensions or ESM/CommonJS, check the nearest `package.json` `type` and `tsconfig` `module`/`moduleResolution`/`verbatimModuleSyntax`.
- See related notes in `../../Notes.md` for TypeScript configuration rationale.
