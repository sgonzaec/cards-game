import React, { createContext, useState } from 'react';

export const PlayersContext = createContext(null);

const PlayerContextContainer = ({ children }) => {
  const [playersData, setPlayersData] = useState({
    playerOne: {
        name: 'Uno',
        id: null,
        score: 0,
        cards: [],
    },
    playerTwo: {
        name: 'Dos',
        id: null,
        score: 0,
        cards: [],
    }
  });

  console.log({playersData})

  const value = {
    playersData,
    setPlayersData
  };

  return (
    <PlayersContext.Provider value={value}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayerContextContainer;