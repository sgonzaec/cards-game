import React, { useContext, useEffect, useState } from "react";
import "./GamePage.scss";
import { PlayersContext } from "../../context/Player.context";
import DeckClient from "../../client/deckClient";
import sortCardsByOrders from "../../helpers/sortCards";
import generalValues from "../../helpers/generalValues.json";
import helpersFunctions from "../../helpers/helpersFunctions";

const GamePage = ({ readyToStart, setReadyToStart }) => {
  const { playersData, setPlayersData } = useContext(PlayersContext);

  const [idPlayerOne, setIdPlayerOne] = useState(null);
  const [idPlayertwo, setIdPlayertwo] = useState(null);
  const [cardsPlayerOne, setCardsPlayerOne] = useState([]);
  const [cardsPlayertwo, setCardsPlayertwo] = useState([]);
  const [matchCounter, setMatchCounter] = useState(0);
  const [actionActive, setActionActive] = useState({
    playerOne: false,
    playerTwo: false,
  });
  const [newCard, setNewCard] = useState([]);

  sortCardsByOrders.sortCards(cardsPlayerOne);
  sortCardsByOrders.sortCards(cardsPlayertwo);

  let thereTerna = 0;
  let thereCuarta = 0;
  let thereStepTerna = 0;
  let thereStepCuarta = 0;

  useEffect(() => {
    DeckClient.getPlayerId(setIdPlayerOne);
    DeckClient.getPlayerId(setIdPlayertwo);
  }, []);

  useEffect(() => {
    if (idPlayerOne && idPlayertwo) {
      DeckClient.getCarts(10, idPlayerOne, setCardsPlayerOne);
      DeckClient.getCarts(10, idPlayertwo, setCardsPlayertwo);
    }
  }, [idPlayerOne, idPlayertwo]);

  useEffect(() => {
    let contador = {};

    function FindRules(cartas) {
      
      for (const carta of cartas) {
        if (contador[carta.value]) {
          contador[carta.value]++;
        } else {
          contador[carta.value] = 1;
        }
      }

      for (const valor in contador) {
        if (contador[valor] === 3) {
          thereTerna++;
        }

        if (contador[valor] === 4) {
          thereCuarta++;
        }
      }

      for (let i = 0; i < cartas.length - 3; i++) {
        const cartaActual = cartas[i];
        const siguienteCarta = cartas[i + 1];
        const segundaSiguienteCarta = cartas[i + 2];
        const terceraSiguienteCarta = cartas[i + 3];

        const pintaActual = cartaActual.suit;
        const pintaSiguiente = siguienteCarta.suit;
        const pintaSegundaSiguiente = segundaSiguienteCarta.suit;
        const pintaTerceraSiguiente = terceraSiguienteCarta.suit;

        const valorActual = cartaActual.value;
        const valorSiguiente = siguienteCarta.value;
        const valorSegundaSiguiente = segundaSiguienteCarta.value;
        const valorTerceraSiguiente = terceraSiguienteCarta.value;

        if (
          generalValues.orderValues.indexOf(valorActual) ===
            generalValues.orderValues.indexOf(valorSiguiente) - 1 &&
          generalValues.orderValues.indexOf(valorActual) ===
            generalValues.orderValues.indexOf(valorSegundaSiguiente) - 2 &&
          generalValues.orderValues.indexOf(valorActual) ===
            generalValues.orderValues.indexOf(valorTerceraSiguiente) - 3 &&
          pintaActual === pintaSiguiente &&
          pintaActual === pintaSegundaSiguiente &&
          pintaActual === pintaTerceraSiguiente
        ) {
          thereStepCuarta++;
        }
      }

      for (let i = 0; i < cartas.length - 2; i++) {
        const cartaActual = cartas[i];
        const siguienteCarta = cartas[i + 1];
        const segundaSiguienteCarta = cartas[i + 2];

        const pintaActual = cartaActual.suit;
        const pintaSiguiente = siguienteCarta.suit;
        const pintaSegundaSiguiente = segundaSiguienteCarta.suit;

        const valorActual = cartaActual.value;
        const valorSiguiente = siguienteCarta.value;
        const valorSegundaSiguiente = segundaSiguienteCarta.value;

        if (
          generalValues.orderValues.indexOf(valorActual) ===
            generalValues.orderValues.indexOf(valorSiguiente) - 1 &&
          generalValues.orderValues.indexOf(valorActual) ===
            generalValues.orderValues.indexOf(valorSegundaSiguiente) - 2 &&
          pintaActual === pintaSiguiente &&
          pintaActual === pintaSegundaSiguiente
        ) {
          thereStepTerna++;
        }
      }
    }

    if (playersData?.playerOne?.activeShift) {
      FindRules(cardsPlayerOne);
    } else {
      FindRules(cardsPlayertwo);
    }

    helpersFunctions.validateWinner(
      thereTerna,
      thereCuarta,
      thereStepTerna,
      thereStepCuarta,
      playersData,
      setReadyToStart,
      setMatchCounter,
      readyToStart
    );

    // eslint-disable-next-line
  }, [cardsPlayerOne, cardsPlayertwo]);

  return (
    <>
      {matchCounter === 16 ? (
        <div className="GamePage">
          <div className="center">
            <button
              onClick={() =>
                helpersFunctions.restarMatch(
                  setReadyToStart,
                  readyToStart,
                  setMatchCounter
                )
              }
              className="btn"
            >
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
              <span>Nueva partida</span>
            </button>
          </div>
          <p>Rondas terminadas reinicia la partida para seguir jugando</p>
        </div>
      ) : (
        <div className="GamePage">
          <button
            className="namesButton"
            onClick={() => setReadyToStart(!readyToStart)}
          >
            Cambiar Nombres
          </button>
          <div className="containerButton">
            {newCard.length ? (
              <div
                className={`Game_player_new_card ${
                  playersData?.playerOne?.activeShift ? "left" : "right"
                }`}
              >
                <div className="container-img">
                  <h2>
                    Carta para el Jugador{" "}
                    {playersData?.playerOne?.activeShift
                      ? playersData?.playerOne?.name
                      : playersData?.playerTwo?.name}
                  </h2>
                  <img src={newCard[0].image} alt={newCard[0].code} />
                </div>
                {actionActive.playerOne || actionActive.playerTwo ? (
                  <h2>Tire una carta</h2>
                ) : (
                  <div className="container-buttoms-new-card">
                    <div
                      onClick={() =>
                        helpersFunctions.AddCard(
                          playersData,
                          newCard,
                          setCardsPlayerOne,
                          setActionActive,
                          setCardsPlayertwo
                        )
                      }
                      className="buttom-new-card"
                    >
                      Aceptar
                    </div>
                    <div
                      onClick={() =>
                        helpersFunctions.askForCard(
                          playersData,
                          idPlayerOne,
                          setNewCard,
                          idPlayertwo,
                          setPlayersData,
                          setMatchCounter,
                          matchCounter
                        )
                      }
                      className="buttom-new-card"
                    >
                      Rechazar
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="center">
                <button
                  onClick={() =>
                    helpersFunctions.askForCard(
                      playersData,
                      idPlayerOne,
                      setNewCard,
                      idPlayertwo,
                      setPlayersData,
                      setMatchCounter,
                      matchCounter
                    )
                  }
                  className="btn"
                >
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
            )}
          </div>
          <div className="Game_player playerOne">
            <h2>Jugador {playersData?.playerOne?.name}</h2>
            <ul
              className={`cards ${
                playersData?.playerOne?.activeShift ? "active" : ""
              }`}
            >
              {cardsPlayerOne.map((card, i) => (
                <li key={`${card.code}-${i}`}>
                  <button
                    onClick={() =>
                      helpersFunctions.deleteCard(
                        card.code,
                        playersData,
                        cardsPlayerOne,
                        setCardsPlayerOne,
                        () =>
                          helpersFunctions.askForCard(
                            playersData,
                            idPlayerOne,
                            setNewCard,
                            idPlayertwo,
                            setPlayersData,
                            setMatchCounter,
                            matchCounter
                          ),
                        setActionActive,
                        cardsPlayertwo,
                        setCardsPlayertwo
                      )
                    }
                    className={`butom-card ${
                      actionActive.playerOne ? "" : "isInactive"
                    }`}
                  >
                    <img src={card.image} alt={card.code} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="Game_player playerTwo">
            <h2>Jugador {playersData?.playerTwo?.name}</h2>
            <ul
              className={`cards ${
                playersData?.playerTwo?.activeShift ? "active" : ""
              }`}
            >
              {cardsPlayertwo.map((card, i) => (
                <li key={`${card.code}-${i}`}>
                  <button
                    onClick={() =>
                      helpersFunctions.deleteCard(
                        card.code,
                        playersData,
                        cardsPlayerOne,
                        setCardsPlayerOne,
                        () =>
                          helpersFunctions.askForCard(
                            playersData,
                            idPlayerOne,
                            setNewCard,
                            idPlayertwo,
                            setPlayersData,
                            setMatchCounter,
                            matchCounter
                          ),
                        setActionActive,
                        cardsPlayertwo,
                        setCardsPlayertwo
                      )
                    }
                    className={`butom-card ${
                      actionActive.playerTwo ? "" : "isInactive"
                    }`}
                  >
                    <img src={card.image} alt={card.code} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
