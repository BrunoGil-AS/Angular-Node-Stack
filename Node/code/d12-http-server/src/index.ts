// Your TypeScript code goes here
import NativeHttp from "./NativeHttp.js";
import * as readline from "readline";
import ExpressServer from "./ExpressServer.js";

function main() {
  console.log("Select the HTTP server implementation to run:");
  console.log("1. Native HTTP Server");
  console.log("2. Express.js Server");
  console.log("Enter the number of your choice:");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("> ", (answer) => {
    switch (answer.trim()) {
      case "1":
        NativeHttp();
        break;
      case "2":
        ExpressServer();
        break;
      default:
        console.log("Invalid choice. Exiting.");
        break;
    }
    rl.close();
  });
}

main();
