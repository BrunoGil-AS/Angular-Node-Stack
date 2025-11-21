# Weeks 3 & 6: Node.js Backend

**Goal:** Build the "Server Side" of your stack. API -> Database -> Security.

---

## Week 3: Node.js Fundamentals

### Day 1 (Day 11): The Runtime & Event Loop

- **Objective:** Understand how Node.js works under the hood (Single Threaded, Non-blocking).
- **Resources:**
  - [Node.js Event Loop (Video)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- **Topics:**
  1. **Node vs Browser:** No DOM, file system access (`fs`), `process`.
  2. **CommonJS (`require`) vs ES Modules (`import`):** Setting `"type": "module"` in `package.json`.
  3. **The Event Loop:** Why you shouldn't block the main thread.

### Day 2 (Day 12): HTTP & Express Setup

- **Objective:** Create your first server.
- **Topics:**
  1. **Native HTTP:** Creating a server with `http` module (just to know how hard it is).
  2. **Express Framework:** `npm install express`.
  3. **Basic Server:** `app.listen(3000)`.

### Day 3 (Day 13): REST API Architecture

- **Objective:** Structure your URLs and methods correctly.
- **Topics:**
  1. **Verbs:** GET (Read), POST (Create), PUT/PATCH (Update), DELETE (Remove).
  2. **Status Codes:** 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error).
  3. **Route Params:** `/users/:id` vs Query Params `/users?page=2`.

### Day 4 (Day 14): Middleware

- **Objective:** The "pipeline" of Express.
- **Topics:**
  1. **What is Middleware?** Functions that run between the Request and the Response.
  2. **Built-in:** `express.json()` (Parsing Body).
  3. **Custom:** Creating a logger middleware or an auth check middleware.

### Day 5 (Day 15): Mini-Project (In-Memory API)

- **Task:** Build a "Task API" without a database (use a generic array).
  - `GET /tasks`: List all.
  - `POST /tasks`: Create one.
  - `DELETE /tasks/:id`: Delete one.
  - Use **Postman** or **Insomnia** to test your endpoints.

---

## Week 6: Advanced Node.js (DB & Auth)

### Day 1 (Day 26): Database Connection

- **Objective:** Persistence. Data shouldn't vanish when the server restarts.
- **Topics:**
  1. **NoSQL (MongoDB):** Easier for JS developers (JSON-like).
  2. **ODM (Mongoose):** Schemas and Models.
  3. **Connection:** `mongoose.connect(process.env.MONGO_URI)`.

### Day 2 (Day 27): Full CRUD with DB

- **Objective:** Connecting the API routes to the Database.
- **Topics:**
  1. **Async/Await:** Database calls are asynchronous.
  2. **Mongoose Methods:** `.find()`, `.create()`, `.findByIdAndUpdate()`, `.findByIdAndDelete()`.
  3. **Services:** Separation of concerns (Controller handles HTTP, Service handles DB).

### Day 3 (Day 28): Authentication (JWT)

- **Objective:** Securing the API.
- **Topics:**
  1. **Passwords:** Never store plain text. Use `bcrypt` to hash.
  2. **JWT (JSON Web Token):** Creating a token on login (`sign`) and sending it to the client.
  3. **Auth Middleware:** Verifying the token on protected routes.

### Day 4 (Day 29): Best Practices & Architecture

- **Objective:** Organizing code for scale.
- **Topics:**
  1. **Folder Structure:** `controllers/`, `routes/`, `models/`, `middleware/`, `utils/`.
  2. **Environment Variables:** Using `dotenv` to hide secrets.
  3. **Error Handling:** Global Error Handler middleware.

### Day 5 (Day 30): Deployment & Capstone

- **Objective:** Go Live.
- **Topics:**
  1. **Production build:** Build the TS code to JS (if using TS in Node).
  2. **Cloud:** Deploying the API to **Render** or **Railway** (easiest free tiers).
  3. **Final Test:** Connect your Angular App (Frontend) to your deployed Node API (Backend).

**Congratulations! You are now a Full Stack Developer.**
