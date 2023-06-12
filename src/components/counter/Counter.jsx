import React, { useContext } from "react";
import { PlayersContext } from "../../context/Player.context";
import "./Counter.scss";

const Counter = () => {
  const { playersData } = useContext(PlayersContext);

  return (
    <div className="float_counter">
      <div className="player">
        <p>Jugador {playersData?.playerOne?.name}</p>
        <span>Puntos: {playersData?.playerOne?.score}</span>
      </div>
      <div className="player">
        <p>Jugador {playersData?.playerTwo?.name}</p>
        <span>Puntos: {playersData?.playerTwo?.score}</span>
      </div>
    </div>
  );
};

export default Counter;
