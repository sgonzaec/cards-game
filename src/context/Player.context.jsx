import React, { createContext, useState } from 'react';

export const PlayersContext = createContext(null);

const PlayerContextContainer = ({ children }) => {
  const [playersData, setPlayersData] = useState({
    playerOne: {
        name: 'Uno',
        score: 0,
    },
    playerTwo: {
        name: 'Dos',
        score: 0,
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