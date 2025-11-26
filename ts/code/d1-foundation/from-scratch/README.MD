# Day 1 Exercises

1. Create an interface User with properties: id (number), name (string), email (optional string), and role (literal type: 'admin' | 'user').
2. Create an array of User objects.
3. Write a function that accepts a User and returns a string greeting. Try passing an object missing the id and observe the error.

---

## Report of the Exercise

1. Created a directory structure for the TypeScript project.
2. Initialized a TypeScript configuration file (tsconfig.json).
3. Implemented some scripts to compile and run TypeScript code.

   ```json
   "scripts": {
       "build": "tsc -p .",
       "watch": "tsc -p . --watch",
       "exec": "node ./dist/index.js"
   },
   ```

4. Created the User interface as specified, [see code](./src/User.ts).
5. Created an array of User objects, [see code](./src/index.ts).
6. Wrote a function that accepts a User and returns a greeting string, [see code](./src/index.ts).
   - When I tried passing an object missing the id property, TypeScript correctly raised an error indicating that the id property is missing, demonstrating the type safety provided by TypeScript. To solve this issue, I used the Omit utility type to create a new type that excludes the id property from the User interface, allowing me to pass objects without the id property when needed.
