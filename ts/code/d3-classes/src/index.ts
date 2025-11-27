import TaskService from "./TaskService.js";
function main() {
  console.log("D3 Classes Notes");
  const taskService = new TaskService("https://api.example.com/tasks");
  const tasks = taskService.getTasks();
  console.log(tasks);
}

main();
