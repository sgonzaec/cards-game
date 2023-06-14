import React, { createContext, useState } from 'react';

export const PlayersContext = createContext(null);

const PlayerContextContainer = ({ children }) => {
  const [playersData, setPlayersData] = useState({
    playerOne: {
        name: 'Uno',
        round: 0,
        activeShift : false
    },
    playerTwo: {
        name: 'Dos',
        round: 0,
        activeShift : false
    }
  });

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