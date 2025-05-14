
import React from "react";
import { useGameContext } from "../context/GameContext";
import UsernameScreen from "./UsernameScreen";
import ModeSelection from "./ModeSelection";
import GameScreen from "./GameScreen";
import ResultsScreen from "./ResultsScreen";
import ExitButton from "./ExitButton";

const Game = () => {
  const { username, gameStarted, timeLeft, isGameActive } = useGameContext();
  
  // Game flow logic
  if (!username) {
    return <UsernameScreen />;
  }
  
  if (gameStarted && !isGameActive && timeLeft === 0) {
    return <ResultsScreen />;
  }
  
  if (gameStarted && isGameActive) {
    return (
      <div className="relative">
        <ExitButton />
        <GameScreen />
      </div>
    );
  }
  
  return <ModeSelection />;
};

export default Game;
