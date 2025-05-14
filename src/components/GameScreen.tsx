
import React, { useState, useRef, useEffect } from "react";
import { useGameContext } from "../context/GameContext";

const GameScreen = () => {
  const { 
    timeLeft, 
    score, 
    currentQuestion, 
    checkAnswer, 
    gameMode, 
    username 
  } = useGameContext();
  
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus on the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) return;
    
    const result = checkAnswer(userAnswer);
    setIsCorrect(result);
    setUserAnswer("");
    
    // Short feedback then reset
    setTimeout(() => {
      setIsCorrect(null);
    }, 300);
  };
  
  // Calculate timer percentage
  const timerPercentage = (timeLeft / 60) * 100;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl">
        {/* Header with game info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-bold text-lg">{username}</h2>
            <p className="text-monkeyLight text-sm">Mode: {gameMode}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{score}</p>
            <p className="text-monkeyLight text-sm">Score</p>
          </div>
        </div>
        
        {/* Timer bar */}
        <div className="w-full bg-monkeyGray rounded-full h-1 mb-8">
          <div 
            className="timer-bar rounded-full" 
            style={{ width: `${timerPercentage}%` }}
          ></div>
        </div>
        
        {/* Timer display */}
        <div className="text-center mb-8">
          <p className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>
            {timeLeft}s
          </p>
        </div>
        
        {/* Question display */}
        <div className="text-center mb-10">
          <h1 className="math-question mb-10">{currentQuestion}</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              ref={inputRef}
              type="text"
              className={`answer-input ${
                isCorrect === true
                  ? "border-green-500"
                  : isCorrect === false
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              autoComplete="off"
            />
            
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        </div>
        
        {/* Keyboard shortcut help */}
        <div className="text-center mt-12">
          <p className="text-monkeyLight text-sm opacity-70">
            Type your answer and press Enter
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
