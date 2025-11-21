# Weeks 4-5: Modern Angular (v18+)

**Goal:** Build "Single Page Applications" (SPAs) that are fast, reactive, and scalable.
**Philosophy:** "Standalone First" and "Signals for State".

---

## Week 4: Core Concepts (The Building Blocks)

### Day 1 (Day 16): Architecture & Standalone Components

- **Objective:** Understand how Angular apps are structured and create your first component without Modules.
- **Resources:**
  - [Official Docs: Components](https://angular.dev/guide/components)
  - [Angular Standalone Components (Video)](https://www.youtube.com/watch?v=PqM1_c9_tew)
- **Topics:**

  1. **Mental Model:** The Tree of Components (Root -> Header, Main, Footer).
  2. **CLI:** `ng new my-app` and `ng generate component components/hello-world`.
  3. **Standalone:** Understanding `standalone: true` and the `imports` array inside the `@Component` decorator.
  4. **Files:** What are `.ts` (logic), `.html` (view), and `.css` (style) files doing together.

- **Exercise:**
  - Create a clean project. Delete the default boilerplate in `app.component.html`.
  - Create 3 components: `Navbar`, `Sidebar`, `Content`.
  - Arrange them in `app.component.html` using their selectors (e.g., `<app-navbar></app-navbar>`).

### Day 2 (Day 17): Templates & Control Flow

- **Objective:** Display data dynamically and control what the user sees.
- **Resources:**
  - [Angular Control Flow Syntax](https://angular.dev/guide/templates/control-flow)
- **Topics:**

  1. **Interpolation:** `{{ variable }}` to show text.
  2. **Property Binding:** `[src]="imageUrl"` (Data goes form Logic -> HTML).
  3. **Event Binding:** `(click)="doSomething()"` (Events go HTML -> Logic).
  4. **Modern Control Flow:**
     - `@if (isAdmin) { ... } @else { ... }`
     - `@for (user of users; track user.id) { ... }` (Note: `track` is mandatory for performance).

- **Exercise:**
  - Create a list of objects in your component (e.g., `products`).
  - Use `@for` to render a card for each product.
  - Use `@if` to show a "Sold Out" badge if `product.stock === 0`.

### Day 3 (Day 18): Reactivity with Signals

- **Objective:** Manage local state efficiently without complex RxJS.
- **Resources:**
  - [Angular Signals Guide](https://angular.dev/guide/signals)
- **Topics:**
  1. **Writable Signals:** `count = signal(0)`. Reading with `count()` and updating with `count.set(5)` or `count.update(v => v + 1)`.
  2. **Computed Signals:** `doubleCount = computed(() => this.count() * 2)`. Derived state that updates automatically.
  3. **Effects:** `effect(() => console.log(this.count()))`. To run side effects when data changes.

> **Note:** Signals replace many use cases of basic Observables, simplifying the reactive graph.

- **Exercise:**
  - Create a "Counter" component.
  - Display the count and the "Double Count".
  - Log a message to the console every time the count reaches a multiple of 10 using `effect()`.

### Day 4 (Day 19): Component Communication

- **Objective:** Pass data down to children and send events up to parents.
- **Resources:**
  - [Inputs and Outputs](https://angular.dev/guide/components/inputs)
- **Topics:**

  1. **Input (Parent -> Child):** Using the new Signal Inputs: `myInput = input<string>()`.
  2. **Output (Child -> Parent):** `myEvent = output<void>()` and emitting `this.myEvent.emit()`.
  3. **Dumb vs. Smart Components:** Logic lives in parents (Smart), children just display data (Dumb).

- **Exercise:**
  - Create a generic `ProductCard` (Child) that accepts a `product` object as Input.
  - Add a button "Add to Cart" in the card that emits an Output event to the Parent.
  - The Parent handles the event and increments a total cart counter.

### Day 5 (Day 20): Services & Dependency Injection (DI)

- **Objective:** Share logic and data across the app (Singleton pattern).
- **Resources:**
  - [Dependency Injection in Angular](https://angular.dev/guide/di)
- **Topics:**

  1. **Creating Services:** `ng g s services/task`.
  2. **The `providedIn: 'root'`:** Why this makes it a Singleton.
  3. **Injection:** Using `private taskService = inject(TaskService)` (The modern functional approach).
  4. **Sharing Data:** Storing a `signal` inside a service to share state between unrelated components.

- **Exercise:**
  - Move the "Cart" logic from Day 4 into a `CartService`.
  - Inject this service into the `Header` (to show cart count) and the `ProductList` (to add items).
  - Observe how the Header updates automatically when you click buttons in the Product List.

---

## Week 5: Building the Real App

### Day 6 (Day 21): Routing (SPA Navigation)

- **Objective:** Navigate between views without reloading the browser.
- **Resources:**
  - [Angular Router](https://angular.dev/guide/routing)
- **Topics:**
  1. **Routes Config:** `app.routes.ts`.
  2. **Directives:** `routerLink="/home"` and `<router-outlet>`.
  3. **Dynamic Routes:** `path: 'product/:id'`. Reading parameters with `input` binding (Router Component Input Binding).
  4. **Redirects & 404:** Handling "Path not found".

### Day 7 (Day 22): HTTP Client & API Consumption

- **Objective:** Fetch real data from the web.
- **Resources:**
  - [Making HTTP Requests](https://angular.dev/guide/http)
- **Topics:**

  1. **Setup:** Adding `provideHttpClient()` in `app.config.ts`.
  2. **Methods:** `http.get<T>()`, `http.post()`.
  3. **Observables:** Angular HTTP returns Observables. Usage of `.subscribe()` vs `AsyncPipe`.
  4. **RxJS interoperability:** Using `toSignal(observable$)` to convert API responses into Signals for easy template rendering.

- **Exercise:**
  - Fetch a list of users from `https://jsonplaceholder.typicode.com/users`.
  - Display them using `@for`.
  - Use `toSignal` to handle the asynchronous data without manually subscribing.

### Day 8 (Day 23): Forms Handling

- **Objective:** Capture user input securely.
- **Resources:**
  - [Template-driven Forms](https://angular.dev/guide/forms/template-driven-forms)
- **Topics:**
  1. **Template-driven:** `[(ngModel)]`. Best for simple forms (Login, Search).
  2. **Reactive Forms:** `FormControl`, `FormGroup`, `Validators`. Best for complex data (Sign Up with password confirmation).
  3. **Validation:** Displaying error messages (e.g., `*ngIf="email.invalid && email.touched"`).

### Day 9 (Day 24): State Management (Service with Signals)

- **Objective:** Managing complex app state without external libraries (like NgRx).
- **Resources:**
  - [Simple State Management with Signals (Article/Video)](https://www.youtube.com/watch?v=R7GZg9y0hYU)
- **Topics:**
  1. **The Pattern:** A Service holding a private `_state` signal and exposing `computed` values (selectors) and methods (actions).
  2. **Immutability:** Always updating state by creating new objects/arrays.

### Day 10 (Day 25): Integrated Frontend Project

- **Objective:** Build a complete "Task Manager Dashboard".
- **Requirements:**
  1. **Service:** `TaskService` to manage state (using Signals).
  2. **API:** Mock HTTP calls (use a JSON file or fake delay) to fetch/add tasks.
  3. **Views:**
     - `Home`: List of tasks with filters (All/Pending/Done).
     - `Detail`: Click a task to see details on a separate page (Routing).
  4. **Forms:** A reactive form to add a new task with validation (Required title).
  5. **Design:** Use a CSS framework (Tailwind or Bootstrap) via CDN.
