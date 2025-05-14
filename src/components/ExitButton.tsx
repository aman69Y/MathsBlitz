
import React from "react";
import { useGameContext } from "../context/GameContext";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const ExitButton = () => {
  const { endGame } = useGameContext();
  
  return (
    <Button 
      variant="outline" 
      className="absolute top-4 left-4 flex items-center gap-1 border-monkeyYellow text-monkeyYellow hover:bg-monkeyYellow hover:text-monkeyDark" 
      onClick={endGame}
    >
      <ArrowLeft className="h-4 w-4" /> Exit
    </Button>
  );
};

export default ExitButton;
