
import React from "react";
import { useGameContext } from "../context/GameContext";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ResultsScreen = () => {
  const { score, setGameMode, gameMode, username, resetLeaderboard } = useGameContext();
  
  const handleResetLeaderboard = () => {
    resetLeaderboard();
    toast("Leaderboard has been reset successfully", {
      description: "All previous scores have been cleared",
    });
  };
  
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
            onClick={() => setGameMode("addition")}
            className="bg-monkeyDark border border-monkeyYellow text-monkeyYellow hover:bg-monkeyGray flex-1"
          >
            Change Mode
          </Button>
        </div>
      </div>
      
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Leaderboard</h2>
          <Button 
            onClick={handleResetLeaderboard}
            variant="destructive"
            className="text-sm"
          >
            Reset Leaderboard
          </Button>
        </div>
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
      <table className="leaderboard-table w-full">
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
