import React, { useState } from "react";
import "./PrincipalPage.scss";
import PlayerCustomization from "../playerCustomization/PlayerCustomization";
import GamePage from "../gamePage/GamePage";

const PrincipalPage = () => {
  const [readyToStart, setReadyToStart] = useState(false);

  return (
    <div className="Container">
      {readyToStart ? (
        <GamePage
          setReadyToStart={setReadyToStart}
          readyToStart={readyToStart}
        />
      ) : (
        <PlayerCustomization
          setReadyToStart={setReadyToStart}
          readyToStart={readyToStart}
        />
      )}
    </div>
  );
};

export default PrincipalPage;
