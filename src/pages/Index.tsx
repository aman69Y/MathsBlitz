
import React from "react";
import { GameProvider } from "../context/GameContext";
import Game from "../components/Game";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <GameProvider>
      <Layout>
        <Game />
      </Layout>
    </GameProvider>
  );
};

export default Index;
