import express, { type Express, type Request, type Response } from "express";

export default function ExpressServer(): void {
  const app: Express = express();
  const PORT = 3000;
  // In-memory users data
  let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  // Middleware to parse JSON bodies
  app.use(express.json());
  // Route: GET / (Home)
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, World!" });
  });

  // Route: GET /api/users (List all users)
  app.get("/api/users", (req: Request, res: Response) => {
    res.json(users);
  });

  // Route: GET /api/users/:id (Dynamic parameters)
  app.get("/api/users/:id", (req: Request, res: Response) => {
    if (req.params.id !== undefined) {
      const userId = parseInt(req.params.id, 10);
      const user = users.find((u) => u.id === userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(400).json({ error: "User ID is required" });
    }
  });

  // Route: POST /api/users (Create new user)
  app.post("/api/users", (req: Request, res: Response) => {
    if (req.body && req.body.name) {
      const newUser = {
        id: users.length + 1,
        name: req.body.name,
      };
      users.push(newUser);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Name is required" });
    }
  });
  // 404 Handler (Must be last)
  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
