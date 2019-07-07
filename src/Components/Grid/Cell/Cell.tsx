/**
 * A component for a single cell in the game board.
 */
import React from "react";
import Properties from "./Properties";

const Cell: React.FC<Properties> = (props) => {

    /**
     * Handles a click in the cell.
     */
    function onClick() {
        if (props.onClick) {
            props.onClick(props.colIndex);
        }
    }

    return (
        <td style={{ backgroundColor: props.color }} onClick={onClick}></td>
    );
};

export default Cell;