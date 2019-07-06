import React from "react";
import Properties from "./Properties";

const Cell: React.FC<Properties> = (props) => {

    function onClick() {
        if (props.onClick) {
            props.onClick(props.rowIndex, props.colIndex);
        }
    }

    return (
        <td style={{ border: "1px solid black", backgroundColor: props.color }} onClick={onClick}></td>
    );
};

export default Cell;