# Week 2: Design Patterns in TypeScript

**Goal:** Learn the "vocabulary" of senior developers. Don't reinvent the wheel; use proven solutions for common problems.
**Focus:** Patterns heavily used in the Angular/Node ecosystem.

---

## Day 1 (Day 6): Introduction & Classification

- **Objective:** Understand why we need patterns and how to group them.
- **Resources:**
  - [Refactoring.guru (The Bible of Patterns)](https://refactoring.guru/design-patterns)
- **Topics:**
  1. **The 3 Categories:**
     - **Creational:** How objects are born (e.g., Singleton).
     - **Structural:** How objects fit together (e.g., Adapter).
     - **Behavioral:** How objects talk to each other (e.g., Observer).
  2. **Anti-patterns:** What _not_ to do (e.g., God Object, Spaghetti Code).

## Day 2 (Day 7): Creational I (Singleton & Factory)

- **Objective:** Control object creation.
- **Topics:**
  1. **Singleton:** Ensuring a class has only one instance.
     - _Context:_ **Angular Services** are Singletons by default. Database connections in Node.js are often Singletons.
  2. **Factory Method:** Creating objects without specifying the exact class.
- **Exercise:**
  - Implement a `DatabaseConnection` class in TS that follows the Singleton pattern (private constructor, static `getInstance` method).

## Day 3 (Day 8): Creational II (Builder & Abstract Factory)

- **Objective:** Handling complex object construction.
- **Topics:**
  1. **Builder:** Constructing complex objects step-by-step.
     - _Context:_ Used when an object has 10+ optional parameters (e.g., building a complex HTTP Request).
  2. **Abstract Factory:** Families of related objects.
- **Exercise:**
  - Create a `PizzaBuilder` that allows chaining methods: `.addCheese()`, `.addPepperoni()`, `.setSize('L')`, `.build()`.

## Day 4 (Day 9): Structural (Adapter, Decorator, Facade)

- **Objective:** Making incompatible interfaces work together.
- **Topics:**
  1. **Adapter:** Converting one interface to another.
     - _Context:_ Making a 3rd party library work with your code without rewriting it.
  2. **Decorator:** Adding behavior to objects dynamically.
     - _Context:_ **Angular Decorators** (`@Component`, `@Input`) are the prime example.
  3. **Facade:** A simple interface to a complex system.
     - _Context:_ Creating a clean `ApiService` that hides the complexity of HTTP headers and error handling from the UI.

## Day 5 (Day 10): Behavioral (Observer & Strategy)

- **Objective:** Managing communication and algorithms.
- **Topics:**
  1. **Observer:** Subscription mechanism to notify multiple objects about events.
     - _Context:_ **RxJS** and **Angular Signals** are implementations of this pattern.
  2. **Strategy:** interchangeable algorithms.
     - _Context:_ Switching between "CreditCardPayment" and "PayPalPayment" strategies at runtime.
- **Exercise:**
  - Implement a basic `Subject` class (Observer pattern) that has `subscribe()` and `notify()` methods.

---
