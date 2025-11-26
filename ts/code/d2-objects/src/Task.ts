import type TaskStatus from "./TaskStatus.js";

export default interface Task {
  id: number;
  name: string;
  status: TaskStatus;
}
