import React, { useContext } from "react";
import { PlayersContext } from "../../context/Player.context";
import "./Counter.scss";

const Counter = () => {
  const { playersData } = useContext(PlayersContext);

  return (
    <div className="float_counter">
      <div className="player">
        <p>Jugador {playersData?.playerOne?.name}</p>
        <span>Ronda: {playersData?.playerOne?.round}</span>
      </div>
      <div className="player">
        <p>Jugador {playersData?.playerTwo?.name}</p>
      </div>
    </div>
  );
};

export default Counter;
