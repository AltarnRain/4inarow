import React from "react";
import Properties from "./Properties";

const Cell: React.FC<Properties> = (props) => {

    function onClick() {
        if (props.onClick) {
            props.onClick(props.rowIndex, props.colIndex);
        }
    }

    return (
        <td className={"gridBorders " + props.color } onClick={onClick}></td>
    );
};

export default Cell;