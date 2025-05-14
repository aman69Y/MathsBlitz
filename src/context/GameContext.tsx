
import React, { createContext, useContext, useState, useEffect } from "react";

type GameModes = "addition" | "subtraction" | "multiplication" | "division" | "integers" | "equations" | "pythagorean";

interface Player {
  username: string;
  score: number;
  mode: GameModes;
  timestamp: number;
}

interface GameContextType {
  username: string;
  setUsername: (name: string) => void;
  gameStarted: boolean;
  startGame: () => void;
  endGame: () => void;
  gameMode: GameModes;
  setGameMode: (mode: GameModes) => void;
  timeLeft: number;
  score: number;
  incrementScore: () => void;
  currentQuestion: string;
  currentAnswer: string | number;
  generateQuestion: () => void;
  checkAnswer: (answer: string) => boolean;
  leaderboard: Player[];
  addToLeaderboard: () => void;
  isGameActive: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Game state
  const [username, setUsername] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<GameModes>("addition");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string | number>("");
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  
  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem("mathGameLeaderboard");
    if (savedLeaderboard) {
      try {
        setLeaderboard(JSON.parse(savedLeaderboard));
      } catch (error) {
        console.error("Failed to parse leaderboard data", error);
      }
    }
  }, []);

  // Save leaderboard to localStorage
  useEffect(() => {
    if (leaderboard.length > 0) {
      localStorage.setItem("mathGameLeaderboard", JSON.stringify(leaderboard));
    }
  }, [leaderboard]);
  
  // Timer countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameActive) {
      setIsGameActive(false);
      addToLeaderboard();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameActive, timeLeft]);
  
  // Start game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setIsGameActive(true);
    generateQuestion();
  };
  
  // End game
  const endGame = () => {
    setIsGameActive(false);
    addToLeaderboard();
  };
  
  // Increment score
  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };
  
  // Generate a random integer within a range
  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Generate question based on selected mode
  const generateQuestion = () => {
    let question = "";
    let answer: string | number = "";
    
    switch (gameMode) {
      case "addition":
        const num1 = getRandomInt(1, 100);
        const num2 = getRandomInt(1, 100);
        question = `${num1} + ${num2} = ?`;
        answer = num1 + num2;
        break;
      
      case "subtraction":
        const minuend = getRandomInt(10, 100);
        const subtrahend = getRandomInt(1, minuend);
        question = `${minuend} - ${subtrahend} = ?`;
        answer = minuend - subtrahend;
        break;
      
      case "multiplication":
        const factor1 = getRandomInt(2, 12);
        const factor2 = getRandomInt(2, 12);
        question = `${factor1} × ${factor2} = ?`;
        answer = factor1 * factor2;
        break;
      
      case "division":
        const divisor = getRandomInt(2, 12);
        const quotient = getRandomInt(1, 10);
        const dividend = divisor * quotient;
        question = `${dividend} ÷ ${divisor} = ?`;
        answer = quotient;
        break;
      
      case "integers":
        const int1 = getRandomInt(-20, 20);
        const int2 = getRandomInt(-20, 20);
        const ops = ["+", "-", "×"];
        const selectedOp = ops[getRandomInt(0, 2)];
        
        question = `${int1} ${selectedOp} ${int2} = ?`;
        
        if (selectedOp === "+") {
          answer = int1 + int2;
        } else if (selectedOp === "-") {
          answer = int1 - int2;
        } else {
          answer = int1 * int2;
        }
        break;
      
      case "equations":
        const x = getRandomInt(1, 10);
        const b = getRandomInt(1, 20);
        const c = x + b;
        
        question = `x + ${b} = ${c}, x = ?`;
        answer = x;
        break;
      
      case "pythagorean":
        // Generate a Pythagorean triple using common patterns
        const triples = [
          [3, 4, 5],
          [5, 12, 13],
          [8, 15, 17],
          [7, 24, 25]
        ];
        
        const triple = triples[getRandomInt(0, triples.length - 1)];
        const a = triple[0];
        const b = triple[1];
        const c = triple[2];
        
        // Randomly decide which value to solve for
        const missing = getRandomInt(0, 2);
        
        if (missing === 0) {
          question = `In a right triangle, if b = ${b} and c = ${c}, find a.`;
          answer = a;
        } else if (missing === 1) {
          question = `In a right triangle, if a = ${a} and c = ${c}, find b.`;
          answer = b;
        } else {
          question = `In a right triangle, if a = ${a} and b = ${b}, find c.`;
          answer = c;
        }
        break;
    }
    
    setCurrentQuestion(question);
    setCurrentAnswer(answer);
  };
  
  // Check player answer
  const checkAnswer = (answer: string): boolean => {
    const numAnswer = Number(answer);
    
    // Handle non-numeric answers
    if (isNaN(numAnswer)) {
      return false;
    }
    
    if (numAnswer === Number(currentAnswer)) {
      incrementScore();
      generateQuestion();
      return true;
    }
    
    return false;
  };
  
  // Add current player's score to leaderboard
  const addToLeaderboard = () => {
    if (score > 0 && username) {
      const newEntry: Player = {
        username,
        score,
        mode: gameMode,
        timestamp: Date.now(),
      };
      
      setLeaderboard((prevLeaderboard) => {
        const newLeaderboard = [...prevLeaderboard, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10); // Keep only top 10 scores
          
        return newLeaderboard;
      });
    }
  };
  
  const value = {
    username,
    setUsername,
    gameStarted,
    startGame,
    endGame,
    gameMode,
    setGameMode,
    timeLeft,
    score,
    incrementScore,
    currentQuestion,
    currentAnswer,
    generateQuestion,
    checkAnswer,
    leaderboard,
    addToLeaderboard,
    isGameActive
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
