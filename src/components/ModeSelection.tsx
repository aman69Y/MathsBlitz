
import React from "react";
import { useGameContext } from "../context/GameContext";
import { Button } from "./ui/button";

const ModeSelection = () => {
  const { gameMode, setGameMode, startGame } = useGameContext();

  const modes = [
    { id: "addition", label: "Addition" },
    { id: "subtraction", label: "Subtraction" },
    { id: "multiplication", label: "Multiplication" },
    { id: "division", label: "Division" },
    { id: "integers", label: "Integers" },
    { id: "equations", label: "Equations" },
    { id: "pythagorean", label: "Pythagorean" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Select Game Mode</h1>
        <p className="text-monkeyLight opacity-80">Choose your math challenge</p>
      </div>
      
      <div className="w-full max-w-3xl bg-monkeyDark border border-monkeyGray rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className={`mode-button ${gameMode === mode.id ? "active" : ""}`}
              onClick={() => setGameMode(mode.id as any)}
            >
              {mode.label}
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="game-button" onClick={startGame}>
            Start Challenge
          </Button>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-medium mb-2">Mode Description</h2>
        <p className="text-monkeyLight opacity-80 max-w-lg">
          {gameMode === "addition" && "Practice your addition skills with numbers between 1 and 100."}
          {gameMode === "subtraction" && "Test your subtraction abilities with a variety of problems."}
          {gameMode === "multiplication" && "Challenge your multiplication knowledge with factors up to 12."}
          {gameMode === "division" && "Solve division problems with divisors between 2 and 12."}
          {gameMode === "integers" && "Work with both positive and negative numbers in various operations."}
          {gameMode === "equations" && "Solve for x in simple linear equations."}
          {gameMode === "pythagorean" && "Apply the Pythagorean theorem to find missing sides of right triangles."}
        </p>
      </div>
    </div>
  );
};

export default ModeSelection;
