import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid/Grid";
import PlayerNamesComponent from "./PlayerNamesComponent/PlayerNamesComponent";

const App: React.FC = () => {

    const [playerNamesEntered, setPlayerNamesEntered] = useState(false);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

    /**
     * Sets both player names.
     * @param {string} name1. First name.
     * @param {string} name2. Second name.
     */
    function doneEnteredNames(name1: string, name2: string) {
        setPlayerNamesEntered(true);

        setPlayer1Name(name1);
        setPlayer2Name(name2);
    }

    return (
        <div>
            {playerNamesEntered
                ?
                <Grid player1Name={player1Name} player2Name={player2Name} />
                :
                <PlayerNamesComponent onEnteredNamed={doneEnteredNames} />
            }
        </div>
    );
};

export default App;
