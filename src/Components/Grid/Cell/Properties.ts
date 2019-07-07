/**
 * Properties for a cell.
 */

import { CSSProperties } from "react";
import Colors from "../../../Types/Colors";

interface Properties {

    /**
     * The cell color
     */
    color: Colors;

    /**
     * The cells column index.
     */
    colIndex: number;

    /**
     * Called when a cell is clicked.
     */
    onClick?: (colIndex: number) => void;
}

export default Properties;