import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import "./PlayerCustomization.scss";
import { PlayersContext } from "../../context/Player.context";

const PlayerCustomization = ({ readyToStart, setReadyToStart }) => {
  const { setPlayersData } = useContext(PlayersContext);

  return (
    <>
      <div className="PlayerCustomization">
        <div className="form-group">
          <span>
            <FontAwesomeIcon icon={faGamepad} />
          </span>
          <input
            className="form-field"
            type="text"
            placeholder="Jugador 1"
            onBlur={(e) => {
              e.target.value !== "" &&
                setPlayersData((prevState) => ({
                  ...prevState,
                  playerOne: {
                    ...prevState.playerOne,
                    name: e.target.value,
                  },
                }));
            }}
          />
        </div>

        <div className="form-group">
          <span>
            <FontAwesomeIcon icon={faGamepad} />
          </span>
          <input
            className="form-field"
            type="text"
            placeholder="Jugador 2"
            onBlur={(e) => {
              e.target.value !== "" &&
                setPlayersData((prevState) => ({
                  ...prevState,
                  playerTwo: {
                    ...prevState.playerTwo,
                    name: e.target.value,
                  },
                }));
            }}
          />
        </div>
      </div>
      <button
        className="glow-on-hover"
        type="button"
        onClick={() => setReadyToStart(!readyToStart)}
      >
        Iniciar
      </button>
    </>
  );
};

export default PlayerCustomization;
