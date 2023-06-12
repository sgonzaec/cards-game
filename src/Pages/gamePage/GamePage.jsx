import React, { useContext, useEffect, useState } from "react";
import "./GamePage.scss";
import { PlayersContext } from "../../context/Player.context";
import DeckClient from "../../client/deckClient";

const GamePage = ({ readyToStart, setReadyToStart }) => {
  const { playersData } = useContext(PlayersContext);

  const [idPlayerOne, ] = useState(DeckClient.getPlayerId());
  const [idPlayerOtwo, ] = useState(DeckClient.getPlayerId());

  useEffect(() => {
    DeckClient.getPlayerId();
  }, []);

  useEffect(() => {
    console.log(idPlayerOne, idPlayerOtwo)
  }, [idPlayerOne, idPlayerOtwo]);

  return (
    <div className="GamePage">
      <button
        className="namesButton"
        onClick={() => setReadyToStart(!readyToStart)}
      >
        Cambiar Nombres
      </button>
      <div className="containerButton">
        <div className="center">
          <button className="btn">
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              className="border"
            >
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="bg-line"
              />
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="hl-line"
              />
            </svg>
            <span>Cartas</span>
          </button>
        </div>
      </div>
      <div className="Game_player playerOne">
        <h2>Jugador {playersData?.playerOne?.name}</h2>
        <ul className="carts"></ul>
      </div>
      <div className="Game_player playerTwo">
        <h2>Jugador {playersData?.playerTwo?.name}</h2>
        <ul className="carts"></ul>
      </div>
    </div>
  );
};

export default GamePage;
