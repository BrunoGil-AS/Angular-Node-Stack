// Define the generic interface
interface Box<T> {
  contents: T;
}

// Create a generic variable for a string
const stringBox: Box<string> = {
  contents: "Hello TypeScript",
};

// Create a generic variable for a number
const numberBox: Box<number> = {
  contents: 42,
};

// Assuming the User interface from context
interface User {
  id: number;
  name: string;
  email: string;
}

// Function to update a user using Partial
function updateUser(currentUser: User, updates: Partial<User>): User {
  // Spread the current user properties, then overwrite with updates
  return { ...currentUser, ...updates };
}

// --- Usage Example ---

const existingUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

// Update ONLY the email.
// TypeScript allows this because 'name' and 'id' are optional in Partial<User>
const updatedUser = updateUser(existingUser, {
  email: "alice.new@example.com",
});

console.log(updatedUser);
