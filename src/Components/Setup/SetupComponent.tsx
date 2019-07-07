import React, { useState } from "react";
import SetupModel from "../../Models/Setup";
import InputComponent from "../InputComponent/InputComponent";
import Properties from "./Properties";

const SetupComponent: React.FC<Properties> = (props) => {

    const [player1Name, setPlayer1Name] = useState("Player 1");
    const [player2Name, setPlayer2Name] = useState("Player 2");
    const [gridX, setGridX] = useState("7");
    const [gridY, setGridY] = useState("6");
    const [winNumber, setWinNumber] = useState("4");

    /**
     * Passes the entered name back.
     */
    function onDoneClick() {

        const setup: SetupModel = getSetupModel();
        props.onSetup(setup);
    }

    function onChange(name: string, value: string) {
        switch (name) {
            case "player1Name":
                setPlayer1Name(value);
                break;
            case "player2Name":
                setPlayer2Name(value);
                break;
            case "gridX":
                setGridX(value);
                break;
            case "gridY":
                setGridY(value);
                break;
            case "winNumber":
                setWinNumber(value);
                break;
            default:
                throw new Error(`${name} is not supported.`);
        }
    }

    function getSetupModel(): SetupModel {
        return {
            player1Name,
            player2Name,
            gridX: parseInt(gridX, 10),
            gridY: parseInt(gridY, 10),
            winNumber: parseInt(winNumber, 10),
        };
    }

    return (
        <div>
            <h1>Welcome to {winNumber} in a row</h1>
            <p>Feel free to setup the game to you liking. Click "Done" when you're done.</p>
            <InputComponent value={player1Name} name="player1Name" text="Enter player 1's name: " onChange={onChange} />
            <InputComponent value={player2Name} name="player2Name" text="Enter player 2's name: " onChange={onChange} />
            <InputComponent value={gridX} name="gridX" text="Number of rows: " onChange={onChange} />
            <InputComponent value={gridY} name="gridY" text="Number of columns: " onChange={onChange} />
            <InputComponent value={winNumber} name="winNumber" text="Win number: " onChange={onChange} />
            <button onClick={onDoneClick}>Done</button>
        </div>
    );
};

export default SetupComponent;