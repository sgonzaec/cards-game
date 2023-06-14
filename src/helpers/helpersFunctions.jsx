import DeckClient from "../client/deckClient";

const helpersFunctions = {
  askForCard: (
    playersData,
    idPlayerOne,
    setNewCard,
    idPlayertwo,
    setPlayersData,
    setMatchCounter,
    matchCounter
  ) => {
    let temActiveShiftPlayerOne;
    let temActiveShiftPlayerTwo;

    if (playersData?.playerOne?.activeShift) {
      DeckClient.getCarts(1, idPlayerOne, setNewCard);
      temActiveShiftPlayerOne = false;
      temActiveShiftPlayerTwo = true;
    } else {
      DeckClient.getCarts(1, idPlayertwo, setNewCard);
      temActiveShiftPlayerTwo = false;
      temActiveShiftPlayerOne = true;
      setMatchCounter(matchCounter + 1);
    }

    setPlayersData((prevState) => ({
      playerOne: {
        ...prevState.playerOne,
        activeShift: temActiveShiftPlayerOne,
        round: matchCounter,
      },
      playerTwo: {
        ...prevState.playerTwo,
        activeShift: temActiveShiftPlayerTwo,
        round: matchCounter,
      },
    }));
  },

  AddCard: (
    playersData,
    newCard,
    setCardsPlayerOne,
    setActionActive,
    setCardsPlayertwo
  ) => {
    if (playersData?.playerOne?.activeShift) {
      setCardsPlayerOne((prevState) => [...prevState, newCard[0]]);
      setActionActive({
        playerOne: true,
        playerTwo: false,
      });
    } else {
      setCardsPlayertwo((prevState) => [...prevState, newCard[0]]);
      setActionActive({
        playerOne: false,
        playerTwo: true,
      });
    }
  },

  deleteCard: (
    code,
    playersData,
    cardsPlayerOne,
    setCardsPlayerOne,
    askForCard,
    setActionActive,
    cardsPlayertwo,
    setCardsPlayertwo
  ) => {
    if (playersData?.playerOne?.activeShift) {
      const filterValues = cardsPlayerOne.filter((item) => item.code !== code);
      setCardsPlayerOne(filterValues);
      askForCard();
      setActionActive({
        playerOne: false,
        playerTwo: false,
      });
    } else {
      const filterValues = cardsPlayertwo.filter((item) => item.code !== code);
      setCardsPlayertwo(filterValues);
      askForCard();
      setActionActive({
        playerOne: false,
        playerTwo: false,
      });
    }
  },

  validateWinner: (
    thereTerna,
    thereCuarta,
    thereStepTerna,
    thereStepCuarta,
    playersData,
    setReadyToStart,
    setMatchCounter,
    readyToStart
  ) => {
    if (
      (thereTerna === 3 && thereCuarta === 1) ||
      (thereTerna === 2 && thereCuarta === 1) ||
      (thereTerna === 2 && thereStepCuarta === 1) ||
      (thereStepTerna === 4 && thereStepCuarta === 1) ||
      (thereStepTerna === 2 && thereCuarta === 1) ||
      (thereTerna === 2 && thereStepTerna === 1 && thereCuarta === 1) ||
      (thereTerna === 1 && thereStepTerna === 3 && thereStepCuarta === 1)
    ) {
      if (playersData?.playerOne?.activeShift) {
        window.alert(`Gana el jugador ${playersData?.playerOne?.name}`);
        setReadyToStart(!readyToStart);
        setMatchCounter(0);
      } else {
        window.alert(`Gana el jugador ${playersData?.playerTwo?.name}`);
        setReadyToStart(!readyToStart);
        setMatchCounter(0);
      }
    }
  },

  restarMatch: (setReadyToStart, readyToStart, setMatchCounter) => {
    setReadyToStart(!readyToStart);
    setMatchCounter(0);
  },
};

export default helpersFunctions;
