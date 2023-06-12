import React, { useContext, useEffect, useState } from "react";
import "./GamePage.scss";
import { PlayersContext } from "../../context/Player.context";
import DeckClient from "../../client/deckClient";

const GamePage = ({ readyToStart, setReadyToStart }) => {
  const { playersData } = useContext(PlayersContext);

  const [idPlayerOne, setIdPlayerOne] = useState(null);
  const [idPlayerOtwo, setIdPlayerOtwo] = useState(null);
  const [cardsPlayerOne, setCardsPlayerOne] = useState([]);
  const [cardsPlayerOtwo, setCardsPlayerOtwo] = useState([]);

  useEffect(() => {
    DeckClient.getPlayerId(setIdPlayerOne);
    DeckClient.getPlayerId(setIdPlayerOtwo);
  }, []);

  useEffect(() => {
    if (idPlayerOne && idPlayerOtwo) {
      DeckClient.getCarts(idPlayerOne, setCardsPlayerOne);
      DeckClient.getCarts(idPlayerOtwo, setCardsPlayerOtwo);
    }
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
        <ul className="cards">
            {cardsPlayerOne.map((card) => (
                <li key={card.code}>
                    <img src={card.image} alt={card.code} />
                </li>
            ))}
        </ul>
      </div>
      <div className="Game_player playerTwo">
        <h2>Jugador {playersData?.playerTwo?.name}</h2>
        <ul className="cards">
            {cardsPlayerOtwo.map((card) => (
                <li key={card.code}>
                    <img src={card.image} alt={card.code} />
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePage;
