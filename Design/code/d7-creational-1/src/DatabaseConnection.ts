export default class DatabaseConnection {
  // 1. Static variable to store the single instance.

  private static instance: DatabaseConnection;

  // Example variable to simulate the connection state

  private isConnected: boolean = false;

  // 2. The constructor is PRIVATE to prevent it from being created with 'new' from outside.

  private constructor() {
    // Initial configurations would normally go here

    console.log("--- Initializing the Database Connection ---");
  }

  // 3. Static method that controls access to the instance.

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      // If it doesn't exist, create it.

      DatabaseConnection.instance = new DatabaseConnection();
    }
    // If it already exists, return it.

    return DatabaseConnection.instance;
  }

  // Example method to simulate a connection action

  public connect(): void {
    if (this.isConnected) {
      console.log("An active connection already exists.");

      return;
    }
    this.isConnected = true;

    console.log("Connection successfully established.");
  }

  // Example method to simulate a disconnection

  public disconnect(): void {
    this.isConnected = false;

    console.log("Connection closed.");
  }
}
