import DatabaseConnection from "./DatabaseConnection.js";
const db1 = DatabaseConnection.getInstance();
db1.connect();

const db2 = DatabaseConnection.getInstance();
db2.connect(); // You'll notice it says "An active connection already exists" because it's the SAME instance.

// Checking that they are exactly the same object
console.log(`Are db1 and db2 the same instance?: ${db1 === db2}`); // true
