import type { User } from "./User";

const greeting: string = "Hello, TypeScript!";
console.log(greeting);
//day 1 exercise

let users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "user" },
];

console.log("User List:");
users.forEach((user) => {
  console.log(
    `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: ${user.role}`
  );
});

function greetUser(user: User): string {
  return `Welcome, ${user.name}! You are logged in as a ${user.role}.`;
}
// "!" is used to assert that users[0] is not undefined
let UserToGreet: User = users[0]!;
console.log(greetUser(UserToGreet));

let userwithoutId: Omit<User, "id"> = {
  name: "Dave",
  email: "dave@example.com",
  role: "user",
};
// console.log(greetUser(userwithoutId )); // This would cause a TypeScript error because 'id' is missing
console.log(greetUser({ ...userwithoutId, id: 4 }));
//day 1 exercise end
