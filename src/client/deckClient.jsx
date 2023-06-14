const base = "https://deckofcardsapi.com/api/deck";

const DeckClient = {
    getPlayerId: async (callback) => {
      try {
        await fetch(`${base}/new/shuffle/`, {
          method: "GET",
        })
          .then((response) => {
            if (response.status >= 200 || response.status < 300) {
              return response.json();
            } else {
              throw new Error("Error al consultar las cartas");
            }
          })
          .then((data) => {
            callback(data.deck_id);
          });
      } catch (error) {
        console.error(error);
      }
    },
    getCarts: async (amountCards,playerId, callback) => {
      try {
        await fetch(`${base}/${playerId}/draw/?count=${amountCards}`, {
          method: "GET",
        })
          .then((response) => {
            if (response.status >= 200 || response.status < 300) {
              return response.json();
            }
          })
          .then((data) => {
            callback(data.cards);
          });
      } catch (error) {
        console.error(error);
      }
    },
  };
  
  export default DeckClient;