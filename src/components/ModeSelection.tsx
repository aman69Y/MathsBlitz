
import React from "react";
import { useGameContext } from "../context/GameContext";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Plus, Minus, X as Multiply, Divide, Award } from "lucide-react";

const ModeSelection = () => {
  const { gameMode, setGameMode, difficulty, setDifficulty, startGame } = useGameContext();

  const modes = [
    { id: "addition", label: "Addition", icon: <Plus className="h-5 w-5" /> },
    { id: "subtraction", label: "Subtraction", icon: <Minus className="h-5 w-5" /> },
    { id: "multiplication", label: "Multiplication", icon: <Multiply className="h-5 w-5" /> },
    { id: "division", label: "Division", icon: <Divide className="h-5 w-5" /> },
    { id: "integers", label: "Integers", icon: <Award className="h-5 w-5" /> },
    { id: "equations", label: "Equations", icon: null },
    { id: "pythagorean", label: "Pythagorean", icon: null },
  ];

  const difficultyLevels = [
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" },
    { id: "very-hard", label: "Very Hard" }
  ];

  const getDifficultyDescription = () => {
    switch (difficulty) {
      case "easy": return "Small numbers from 1-10, perfect for beginners.";
      case "medium": return "Moderate numbers from 5-25, good for practice.";
      case "hard": return "Challenging numbers from 10-50, test your skills.";
      case "very-hard": return "Advanced problems with numbers up to 100, for true math wizards.";
    }
  };

  const getModeDescription = () => {
    switch (gameMode) {
      case "addition": return "Practice your addition skills with varying difficulty levels.";
      case "subtraction": return "Test your subtraction abilities with a variety of problems.";
      case "multiplication": return "Challenge your multiplication knowledge with increasing complexity.";
      case "division": return "Solve division problems with adjustable difficulty.";
      case "integers": return "Work with both positive and negative numbers in various operations.";
      case "equations": return "Solve for x in simple linear equations with increasing complexity.";
      case "pythagorean": return "Apply the Pythagorean theorem to find missing sides of right triangles.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Select Game Mode</h1>
        <p className="text-monkeyLight opacity-80">Choose your math challenge</p>
      </div>
      
      <div className="w-full max-w-3xl bg-monkeyDark border border-monkeyGray rounded-lg p-8 mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Operation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                className={`mode-button flex items-center justify-center gap-2 ${gameMode === mode.id ? "active" : ""}`}
                onClick={() => setGameMode(mode.id as any)}
              >
                {mode.icon}
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Difficulty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {difficultyLevels.map((level) => (
              <button
                key={level.id}
                className={`mode-button ${difficulty === level.id ? "active" : ""}`}
                onClick={() => setDifficulty(level.id as any)}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="game-button" onClick={startGame}>
            Start Challenge
          </Button>
        </div>
      </div>
      
      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-medium mb-2">Mode: {modes.find(m => m.id === gameMode)?.label}</h2>
        <p className="text-monkeyLight opacity-80 mb-4">
          {getModeDescription()}
        </p>
        
        <h2 className="text-2xl font-medium mb-2">Difficulty: {difficultyLevels.find(d => d.id === difficulty)?.label}</h2>
        <p className="text-monkeyLight opacity-80">
          {getDifficultyDescription()}
        </p>
      </div>
    </div>
  );
};

export default ModeSelection;
