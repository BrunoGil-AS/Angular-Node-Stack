import FootballScores from "./FootballScores.js";
import type Observer from "./Observer.js";

// --- Concrete Observer 1: TV Scoreboard ---
// This observer displays the full table every time a goal is scored.
class TVScoreboard implements Observer<Map<string, number>> {
  update(scores: Map<string, number>): void {
    console.log("\n\n--- 📺 LIVE TV SCOREBOARD 📺 ---");
    scores.forEach((score, team) => {
      console.log(`${team.padEnd(20)} : ${score}`);
    });
    console.log("--------------------------------\n\n");
  }
}

// --- Concrete Observer 2: Football Fan ---
// This observer only cares about one specific team.
class FootballFan implements Observer<Map<string, number>> {
  private favoriteTeam: string;

  constructor(team: string) {
    this.favoriteTeam = team;
  }

  update(scores: Map<string, number>): void {
    const myTeamScore = scores.get(this.favoriteTeam);

    // The fan checks if their team score has changed or just reacts to the game
    if (myTeamScore !== undefined) {
      console.log(
        `[Fan of ${this.favoriteTeam}]: "I see the score is now ${myTeamScore} for my team!"`
      );
    }
  }
}

// --- MAIN EXECUTION ---

// 1. Create the Subject (The Match)
const championsLeagueMatch = new FootballScores();

// 2. Create Observers (The Audience)
const mainScoreboard = new TVScoreboard();
const madridFan = new FootballFan("Real Madrid");
const barcaFan = new FootballFan("Barcelona");

// 3. Subscribe Observers to the Subject
console.log(">>> System: Registering observers...");
championsLeagueMatch.subscribe(mainScoreboard);
championsLeagueMatch.subscribe(madridFan);
championsLeagueMatch.subscribe(barcaFan);

// 4. Start the simulation
// Since the method is async, we can use .then() or just let it run
championsLeagueMatch.realTimeInGameMetrics();
