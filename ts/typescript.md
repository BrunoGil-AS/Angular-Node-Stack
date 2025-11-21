# Week 1: TypeScript Fundamentals

**Goal:** Stop "fighting" the compiler and start using types to catch errors before running the code. Focus on features heavily used in Angular.

---

## Day 1: The Foundation (Types & Interfaces)

- **Objective:** Understand how to define shapes of data and avoid the usage of `any`.
- **Resources:**
- [Official Docs: The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript Interfaces vs Types (Video)](https://www.youtube.com/watch?v=zM9UPcIyyhQ)

### 📚 Day 1 Topics

1. **Primitive Types:** `string`, `number`, `boolean`, `null`, `undefined`.
2. **The "Any" Trap:** Difference between `any` (disable checking) vs `unknown` (safe dynamic type).
3. **Arrays:** Syntax `number[]` vs `Array<number>`.
4. **Interfaces:** Defining the "shape" of an object (Crucial for API responses in Angular).
5. **Type Aliases:** When to use `type` vs `interface`.

### 💻 Day 1 Exercises

1. Create an `interface User` with properties: `id` (number), `name` (string), `email` (optional string), and `role` (literal type: 'admin' | 'user').
2. Create an array of `User` objects.
3. Write a function that accepts a `User` and returns a string greeting. Try passing an object missing the `id` and observe the error.

---

## Day 2: Functions, Objects & Enums

- **Objective:** Master typing function arguments, return values, and using Enums for fixed states.
- **Resources:**
- [Official Docs: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Official Docs: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

### 📚 Day 2 Topics

1. **Typed Functions:** Parameter types and Return types (`: void`, `: Promise<T>`).
2. **Optional Parameters:** Using `?` in arguments.
3. **Arrow Functions:** Syntax review and typing variables that hold functions.
4. **Enums:** String Enums vs Numeric Enums (e.g., `Status.Loading`, `Status.Success`).

### 💻 Day 2 Exercises

1. Create an Enum `TaskStatus` with values: `Pending`, `InProgress`, `Completed`.
2. Create a function `updateTask(id: number, status: TaskStatus): void`.
3. Try calling `updateTask(1, 'finished')` (string) and see it fail. Call it correctly with the Enum.

---

## Day 3: Classes & Object-Oriented TS

- **Objective:** Understand Classes, as every Angular Component and Service is a Class.
- **Resources:**
- [Official Docs: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

### 📚 Day 3 Topics

1. **Class Structure:** Properties, Methods, Constructors.
2. **Access Modifiers:** `public`, `private`, `protected`.
3. **Parameter Properties (Vital for Angular):** The shorthand syntax `constructor(private name: string) {}`. _You will see this in every Angular Service injection._
4. **Abstract Classes:** Creating base classes that cannot be instantiated directly.

### 💻 Day 3 Exercises

1. Create a class `TaskService`.
2. Use the "Parameter Property" shorthand to inject a private variable `api_url` in the constructor.
3. Add a public method `getTasks()` that logs "Fetching from " + `api_url`.

---

## Day 4: Generics & Utility Types

- **Objective:** Understand how to write reusable code. This is the "filter" topic; if you get this, you get Angular.
- **Resources:**
- [Generics in 120 Seconds (Fireship)](https://www.youtube.com/watch?v=LI4MZvQPWSk)
- [Official Docs: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### 📚 Day 4 Topics

1. **What are Generics?** The `<T>` syntax. Making components work with any data type.
2. **Generic Functions:** `function identity<T>(arg: T): T`.
3. **Generic Interfaces:** `interface ApiResponse<T> { data: T; status: number; }`.
4. **Utility Types:** `Partial<T>`, `Omit<T, K>`, `Pick<T, K>`.

### 💻 Day 4 Exercises

1. Create a generic interface `Box<T>` that has a property `contents: T`.
2. Create variable `stringBox` of type `Box<string>` and `numberBox` of type `Box<number>`.
3. Create a function that takes `Partial<User>` (from Day 1) to allow updating just the email of a user without requiring the name.

---

## Day 5: Configuration & Mini-Project

- **Objective:** Set up a real TS environment and build a console app that mimics an API handler.
- **Resources:**
- [Intro to tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

### 📚 Day 5 Topics

1. **The Compiler:** `tsc` command.
2. **tsconfig.json:** strict mode, target (ES6/ESNext), outDir.
3. **Debugging:** How to read the red lines in VS Code efficiently.

### 🏆 Weekly Project: "Mock API Handler"

Create a pure TypeScript console application (no HTML/CSS yet) that combines everything:

1. Define an **Interface** `Product` (id, name, price, category).
2. Create a **Generic Class** `DataStorage<T>` that holds an array of items.
   - Methods: `addItem(item: T)`, `removeItem(id: number)`, `getAll()`.
3. Create an **Enum** `Category` for the products.
4. Instantiate `DataStorage<Product>` and add 3 products.
5. **Bonus:** Use a Utility Type to create a method `updateItem` that takes an ID and `Partial<T>`.
