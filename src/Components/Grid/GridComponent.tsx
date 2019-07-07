/**
 * This component draws the game board and handles user interaction.
 */

import React, { useState } from "react";
import { gridStyle } from "../../Lib/Styles";
import { checkWin } from "../../Lib/WinHelper";
import Colors from "../../Types/Colors";
import Cell from "./Cell/Cell";
import Properties from "./Properties";

const GridComponent: React.FC<Properties> = (props) => {

    const totalRows = typeof (props.setup) !== "undefined" ? props.setup.gridX : 7;
    const totalColumns = typeof (props.setup) !== "undefined" ? props.setup.gridY : 6;
    const player1Name = typeof (props.setup) !== "undefined" ? props.setup.player1Name : "player 1";
    const player2Name = typeof (props.setup) !== "undefined" ? props.setup.player2Name : "player 2";
    const winNumber = typeof (props.setup) !== "undefined" ? props.setup.winNumber : 4;

    const [grid, setGrid] = useState(createGrid());
    const [won, setWon] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<string>(player1Name);
    const [currentColor, setCurrentColor] = useState<Colors>("red");

    /**
     * Creates an empty grid
     * @returns {Colors[][]}. 2d array with color transparent.
     */
    function createGrid(): Colors[][] {

        const newGrid: Colors[][] = [];
        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            if (typeof (newGrid[rowIndex]) === "undefined") {
                newGrid[rowIndex] = [];
            }
            const row = newGrid[rowIndex];
            for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
                row.push("white");
            }
        }

        return newGrid;
    }

    /**
     * Triggered when a cell is clicked.
     * @param {number} rowIndex. The row index.
     * @param {number} columnIndex. The column index.
     */
    function onCellClicked(columnIndex: number): void {
        fillCell(columnIndex);
    }

    function fillCell(columnIndex: number): void {
        // Game is one, do not fill a cell.
        if (won === true) {
            return;
        }

        // Find the first available transparent cell for this column
        let rowIndex = -1;
        for (let r = totalRows - 1; r > -1; r--) {
            if (grid[r][columnIndex] === "white") {
                rowIndex = r;
                break;
            }
        }

        // A cell was found, let's fill in its color.
        if (rowIndex !== -1) {
            const g = grid.map((row) => [...row]);
            g[rowIndex][columnIndex] = currentColor as Colors;
            setGrid(g);

            if (checkWin(grid, winNumber, rowIndex, columnIndex, currentColor as Colors)) {
                setWon(true);
                return;
            }

            // No one won, next player's turn.
            nextPlayer();
        }
    }

    /**
     * Set the next player. This function also sets the color since player and color are linked.
     */
    function nextPlayer() {
        if (currentPlayer === player1Name) {
            setCurrentColor("yellow");
            setCurrentPlayer(player2Name);
        } else {
            setCurrentColor("red");
            setCurrentPlayer(player1Name);
        }
    }

    /**
     * Restarts the game.
     */
    function reset(): void {
        setWon(false);
        setGrid(createGrid());

        // The losing player gets to go first.
        nextPlayer();
    }

    return (
        <div style={{ textAlign: "center" }} >
            {won ?
                <div>
                    <h1>{currentPlayer} has won the game</h1>
                    <button onClick={reset}>Play again?</button>
                </div>
                : <div>
                    <h2>Current player: {currentPlayer}</h2>
                    <span style={{ backgroundColor: currentColor }}><b>Current color</b></span>
                </div>
            }
            <br />
            <table style={gridStyle()}>
                <tbody>
                    {grid.map((row, rowindex) => {
                        return (
                            <tr key={rowindex}>
                                {row.map((color, columnIndex) => {
                                    return (
                                        <Cell key={columnIndex} color={color} colIndex={columnIndex} onClick={onCellClicked} />
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

export default GridComponent;
