/**
 * Helper functions for determining if a player has one.
 */

import Colors from "../Types/Colors";

/**
 * Check if a player has won with their last move.
 * @param {nunmber} rowIndex. The row index where the player clicked.
 * @param {number} columnIndex. The column index where the player clicked.
 * @param {Color} playerColor. The color of the piece the player placed.
 */
export function checkWin(arr: Colors[][], winNumber: number, rowIndex: number, columnIndex: number, playerColor: Colors): boolean {
    const checks: boolean[] = [];

    const trueWinNumber = winNumber - 1;

    // Check for n in a row in all directions.
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "up", "none"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "down", "none"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "none", "left"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "none", "right"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "up", "left"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "up", "right"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "down", "left"));
    checks.push(checkForNValuesInARow(arr, trueWinNumber, playerColor, "transparent", rowIndex, columnIndex, "down", "right"));

    return checks.some((c) => c === true);
}

/**
 * Checks if there's N colors of 'color' horizantally, vertically or diagonaly.
 * @param {Colors} color. The color to check.
 * @param {number} rowIndex. The row index used to check up and down.
 * @param {number} columnIndex. The column index used to check left and right.
 * @param {up | down | none} verticalDirection. The vertical direction to check.
 * @param {left | right | none } horizantalDirection. The horizantal direction to check.
 */
export function checkForNValuesInARow<T>(
    arr: T[][],
    match: number,
    value: T,
    ignoreValue: T,
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

    const content: T[] = [];
    for (let i = 0; i < match; i++) {
        content.push(get2DArrayContent(arr, rowIndex + x++ * rowMultiplier, columnIndex + y++ * colMultiplier, ignoreValue));
    }

    return content.every((c) => c === value);
}

/**
 * Attempts to read the content from a 2d array. If the location exists it returns the value, otherwise it returns the default value.
 * @param {number} rowIndex. The row index used to retieve a value.
 * @param {number} column. The column index used to retrieve a values.
 */
function get2DArrayContent<T>(arr: T[][], rowIndex: number, column: number, defaultValue: T): T {
    let returnValue: T = defaultValue;

    if (arr.length > rowIndex && rowIndex > -1 && arr[rowIndex].length > column) {
        returnValue = arr[rowIndex][column];
    }

    return returnValue;
}