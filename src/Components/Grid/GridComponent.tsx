import React, { useState } from "react";
import { checkWin } from "../../Lib/WinHelper";
import Colors from "../../Types/Colors";
import Cell from "./Cell/Cell";
import "./GridComponent.css";
import Properties from "./Properties";

const GridComponent: React.FC<Properties> = (props) => {

    const totalRows = typeof (props.setup) !== "undefined" ? props.setup.gridX : 6;
    const totalColumns = typeof (props.setup) !== "undefined" ? props.setup.gridY : 7;
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
                row.push("transparent");
            }
        }

        return newGrid;
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

        const clickedField = grid[rowIndex][columnIndex];

        if (clickedField === "transparent") {
            let allowMove = false;

            // Bottow row, always allow
            if (rowIndex === totalRows - 1) {
                allowMove = true;
            } else {
                const fieldBelowField = grid[rowIndex + 1][columnIndex];
                if (fieldBelowField !== "transparent") {
                    allowMove = true;
                }
            }

            if (allowMove) {

                const g = grid.map((row) => [...row]);
                g[rowIndex][columnIndex] = currentColor as Colors;

                setGrid(g);

                if (checkWin(grid, winNumber, rowIndex, columnIndex, currentColor as Colors)) {
                    setWon(true);
                    return;
                }

                SetNextPlayerAndColor();
            }
        } else {
            // do nothing.
        }
    }

    function SetNextPlayerAndColor() {
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
        SetNextPlayerAndColor();
    }

    return (
        <div>
            {won ?
                <div>
                    <h1>{currentPlayer} has won the game</h1>
                    <button onClick={reset}>Play again?</button>
                </div>
                : <div>
                    <h2>Current player: {currentPlayer}</h2>
                    <span className={currentColor}><b>Current color</b></span>
                </div>
            }
            <br/>
            <table className="gridSize gridBorders">
                <tbody>
                    {grid.map((row, rowindex) => {
                        return (
                            <tr key={rowindex}>
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

export default GridComponent;
