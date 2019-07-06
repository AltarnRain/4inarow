import React, { useState } from "react";
import Colors from "../Types/Colors";
import Cell from "./Cell/Cell";
import Properties from "./Properties";

const Grid: React.FC<Properties> = (props) => {

    const totalRows = 6;
    const totalColumns = 7;

    const [currentPlayer, setCurrentPlayer] = useState(props.player1Name);
    const [cells, setCells] = useState(createGrid());
    const [won, setWon] = useState(false);

    /**
     * Creates an empty grid
     * @returns {Colors[][]}. 2d array with color transparent.
     */
    function createGrid(): Colors[][] {
        const grid: Colors[][] = [];
        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            if (typeof (grid[rowIndex]) === "undefined") {
                grid[rowIndex] = [];
            }
            const row = grid[rowIndex];
            for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
                row.push("transparent");
            }
        }

        return grid;
    }

    /**
     * Triggered when a cell is clicked.
     * @param {number} rowIndex. The row index.
     * @param {number} columnIndex. The column index.
     */
    function cellClicked(rowIndex: number, columnIndex: number): void {

        if (won === true) {
            return;
        }

        let newColor: Colors;
        let nextPlayer: string;
        if (currentPlayer === props.player1Name) {
            newColor = "red";
            nextPlayer = props.player2Name;
        } else {
            newColor = "yellow";
            nextPlayer = props.player1Name;
        }

        const clickedField = cells[rowIndex][columnIndex];

        if (clickedField === "transparent") {
            let allowMove = false;
            // Bottow row, always allow
            if (rowIndex === totalRows - 1) {
                allowMove = true;
            } else {
                const fieldBelowField = cells[rowIndex + 1][columnIndex];
                if (fieldBelowField !== "transparent") {
                    allowMove = true;
                }
            }

            if (allowMove) {
                cells[rowIndex][columnIndex] = newColor;
                setCells(cells);

                if (checkWin(rowIndex, columnIndex, newColor)) {
                    setWon(true);
                    return;
                }

                setCurrentPlayer(nextPlayer);
            }
        } else {
            // do nothing.
        }
    }

    /**
     * Check if a player has one with their last move.
     * @param {nunmber} rowIndex. The row index where the player clicked.
     * @param {number} columnIndex. The column index where the player clicked.
     * @param {Color} playerColor. The color of the piece the player placed.
     */
    function checkWin(rowIndex: number, columnIndex: number, playerColor: Colors): boolean {
        const checks: boolean[] = [];

        // Check for 4 in a row in all directions.
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "up", "none"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "down", "none"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "none", "left"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "none", "right"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "up", "left"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "up", "right"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "down", "left"));
        checks.push(checkFourColorsInARow(playerColor, rowIndex, columnIndex, "down", "right"));

        // Check if four slots have the same color either horizontally or vertically.
        return checks.some((c) => c === true);
    }

    /**
     * Restarts the game.
     */
    function playAgain(): void {
        setWon(false);
        setCells(createGrid());
    }

    /**
     * Checks if there's 4 colors of 'color' horizantally, vertically or diagonaly.
     * @param {Colors} color. The color to check.
     * @param {number} rowIndex. The row index used to check up and down.
     * @param {number} columnIndex. The column index used to check left and right.
     * @param {up | down | none} verticalDirection. The vertical direction to check.
     * @param {left | right | none } horizantalDirection. The horizantal direction to check.
     */
    function checkFourColorsInARow(
        color: Colors,
        rowIndex: number,
        columnIndex: number,
        verticalDirection: "up" | "down" | "none",
        horizantalDirection: "left" | "right" | "none"): boolean {

        let rowMultiplier = 0;
        let colMultiplier = 0;

        if (verticalDirection === "up") {
            rowMultiplier = -1;
        } else if (verticalDirection === "down") {
            rowMultiplier = 1;
        }

        if (horizantalDirection === "left") {
            colMultiplier = -1;
        } else if (horizantalDirection === "right") {
            colMultiplier = 1;
        }

        let x = 1;
        let y = 1;

        const c1 = getCellContent(rowIndex + x++ * rowMultiplier, columnIndex + y++ * colMultiplier);
        const c2 = getCellContent(rowIndex + x++ * rowMultiplier, columnIndex + y++ * colMultiplier);
        const c3 = getCellContent(rowIndex + x++ * rowMultiplier, columnIndex + y++ * colMultiplier);

        return [c1, c2, c3].every((c) => c === color);
    }

    /**
     * Gets content from the cells array. If the location is not available, transparent is returned.
     * @param {number} rowIndex. The row index used to retieve a color.
     * @param {number} column. The column index used to retrieve a color.
     */
    function getCellContent(rowIndex: number, column: number): Colors {
        let returnValue: Colors = "transparent";

        if (cells.length > rowIndex && rowIndex > -1 && cells[rowIndex].length > column) {
            returnValue = cells[rowIndex][column];
        }

        return returnValue;
    }

    return (
        <div>
            {won ?
                <div>
                    <h1>{currentPlayer} has won the game</h1>
                    <button onClick={playAgain}>Play again?</button>
                </div>
                : <h2>Current player: {currentPlayer} </h2>
            }
            <table style={{ border: "1px solid black", width: "500px", height: "450px" }}>
                <tbody>
                    {cells.map((row, rowindex) => {
                        return (
                            <tr key={rowindex} style={{ border: "1px solid black" }}>
                                {row.map((color, columnIndex) => {
                                    return (
                                        <Cell key={columnIndex} color={color} rowIndex={rowindex} colIndex={columnIndex} onClick={cellClicked} />
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
};

export default Grid;
