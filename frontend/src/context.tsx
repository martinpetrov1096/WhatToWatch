import React from 'react';

enum GameStatus {
   'new',
   'lobby',
   'playing'
};

const gameStatus: GameStatus = GameStatus['new'];

export const GameContext = React.createContext(gameStatus);