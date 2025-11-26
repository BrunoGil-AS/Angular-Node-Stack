// Your TypeScript code goes here
import type Task from "./Task.js";
import TaskStatus from "./TaskStatus.js";

function updateTask(task: Task, status: TaskStatus): void {
  task.status = status;
}
export { updateTask };

function main() {
  let myTask: Task = {
    id: 1,
    name: "Sample Task",
    status: TaskStatus.Pending,
  };

  console.log("Task created:", myTask);

  updateTask(myTask, TaskStatus.Completed);
  console.log("Task updated:", myTask);
}

main();
