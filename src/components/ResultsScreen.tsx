
import React from "react";
import { useGameContext } from "../context/GameContext";
import { Button } from "./ui/button";

const ResultsScreen = () => {
  const { score, setGameMode, startGame, gameMode, username } = useGameContext();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Time's Up!</h1>
        <p className="text-monkeyLight opacity-80">Let's see how you did</p>
      </div>
      
      <div className="w-full max-w-md bg-monkeyDark border border-monkeyGray rounded-lg p-8 mb-8">
        <div className="text-center">
          <p className="text-xl mb-2">{username}</p>
          <p className="text-5xl font-bold mb-6">{score}</p>
          <p className="text-monkeyLight">Questions answered in {gameMode} mode</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button 
            onClick={() => setGameMode(gameMode)}
            className="game-button flex-1"
          >
            Try Again
          </Button>
          <Button 
            onClick={() => startGame()}
            className="bg-monkeyDark border border-monkeyYellow text-monkeyYellow hover:bg-monkeyGray flex-1"
          >
            Change Mode
          </Button>
        </div>
      </div>
      
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
        <LeaderboardTable />
      </div>
    </div>
  );
};

const LeaderboardTable = () => {
  const { leaderboard } = useGameContext();
  
  if (leaderboard.length === 0) {
    return (
      <div className="text-center p-6 bg-monkeyDark border border-monkeyGray rounded-lg">
        <p className="text-monkeyLight">No scores recorded yet. Be the first!</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Mode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td className="font-bold">{index + 1}</td>
              <td>{entry.username}</td>
              <td className="font-bold">{entry.score}</td>
              <td>{entry.mode}</td>
              <td>{new Date(entry.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsScreen;
