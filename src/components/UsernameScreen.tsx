
import React, { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { Button } from "./ui/button";

const UsernameScreen = () => {
  const { username, setUsername, startGame } = useGameContext();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    
    setUsername(inputValue);
    startGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">MathBlitz</h1>
        <p className="text-monkeyLight opacity-80">Test your math skills against the clock!</p>
      </div>
      
      <div className="w-full max-w-md bg-monkeyDark border border-monkeyGray rounded-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-6 w-full">
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Enter your username
            </label>
            <input
              id="username"
              type="text"
              className="username-input"
              placeholder="Username"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              autoFocus
            />
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>
          
          <Button 
            type="submit" 
            className="game-button w-full"
            disabled={!inputValue.trim()}
          >
            Start Game
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UsernameScreen;
