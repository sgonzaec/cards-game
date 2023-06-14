import generalValues from "./generalValues.json"


const sortCardsByOrders = {
  sortCards: (cardsArray) => {
    cardsArray.sort((a, b) => {
      const pintaA = generalValues.orderSymbol.indexOf(a.suit);
      const pintaB = generalValues.orderSymbol.indexOf(b.suit);

      if (pintaA !== pintaB) {
        return pintaA - pintaB;
      } else {
        const valorA = generalValues.orderValues.indexOf(a.value);
        const valorB = generalValues.orderValues.indexOf(b.value);
        return valorA - valorB;
      }
    });
  },
};
  
  export default sortCardsByOrders;