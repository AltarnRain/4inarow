import { number } from "prop-types";

interface SetupModel {
    player1Name: string;

    player2Name: string;

    winNumber: number;

    gridX: number;
    gridY: number;
}

export default SetupModel;