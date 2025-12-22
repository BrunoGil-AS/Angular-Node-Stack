import type Task from "../models/Task.js";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Learn Express",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let nextId = 2;

export function getNextId(): number {
  return nextId++;
}
