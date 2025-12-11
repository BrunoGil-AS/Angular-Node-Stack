import express from "express";
import router from "./routes/router.js";

const tasksRouter = router;

const app = express();

app.use(express.json());

// API routes
app.use("/api/tasks", tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
