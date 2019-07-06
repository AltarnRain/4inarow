import React, { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import Properties from "./Properties";

const PlayerNamesComponent: React.FC<Properties> = (props) => {

    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

    /**
     * Passes the entered name back.
     */
    function onDoneClick() {
        props.onEnteredNamed(player1Name, player2Name);
    }

    return (
        <div>
            <h1>Welcome to four in a row</h1>
            <InputComponent text="Enter player 1's name: " onChange={setPlayer1Name} />
            <InputComponent text="Enter player 2's name: " onChange={setPlayer2Name} />
            {player1Name !== "" && player2Name !== "" ? <button onClick={onDoneClick}>Done</button> : undefined}
        </div>
    );
};

export default PlayerNamesComponent;