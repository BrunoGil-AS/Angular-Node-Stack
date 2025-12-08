import type Observer from "./Observer.js";
import type Subject from "./Subject.js";

export default class FootballScores implements Subject<Map<string, number>> {
  private observers: Observer<Map<string, number>>[];
  private TeamScores: Map<string, number>;

  constructor() {
    this.observers = [];
    this.TeamScores = new Map();
    this.TeamScores.set("Real Madrid", 0);
    this.TeamScores.set("Barcelona", 0);
    this.TeamScores.set("Bayern Munich", 0);
    this.TeamScores.set("Paris Saint German", 0);
  }

  subscribe(observer: Observer<Map<string, number>>): void {
    const exist = this.observers.includes(observer);
    if (exist) {
      console.log("This Observer is already Subscribed.");
      return;
    }
    this.observers.push(observer);
    console.log("Observer subscribed");
  }
  unsubscribe(observer: Observer<Map<string, number>>): void {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      console.log("Observer not found.");
      return;
    }
    this.observers.splice(index, 1);
    console.log("Observer unsubscribed successfully.");
  }
  notify(): void {
    console.log(`\nNotifying ${this.observers.length} observers...`);
    for (const observer of this.observers) {
      observer.update(this.TeamScores);
    }
  }

  // --- Simulation Logic ---
  public async realTimeInGameMetrics(): Promise<void> {
    console.log("--- MATCH STARTED ---");

    // Simulating 5 events for demonstration (instead of 90)
    for (let i = 0; i < 5; i++) {
      // Wait for 1.5 seconds between events using a Promise
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const random: number = Math.floor(Math.random() * 4 + 1);
      let key: string = "";

      // Select a random team
      switch (random) {
        case 1:
          key = "Real Madrid";
          break;
        case 2:
          key = "Barcelona";
          break;
        case 3:
          key = "Bayern Munich";
          break;
        case 4:
          key = "Paris Saint German";
          break;
      }

      const currentScore = this.TeamScores.get(key);

      // Update score and Notify ONLY if the team exists
      if (currentScore !== undefined && key !== "") {
        const newScore = currentScore + 1;
        this.TeamScores.set(key, newScore);

        console.log(`\n⚽ GOAL!!! ${key} scored!`);

        // Trigger the Observer Pattern
        this.notify();
      }
    }
    console.log("\n--- MATCH ENDED ---");
  }
}
