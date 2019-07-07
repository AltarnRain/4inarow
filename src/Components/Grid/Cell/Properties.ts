import colors from "../../../Types/Colors";

interface Properties {
    color: colors;

    rowIndex: number;

    colIndex: number;

    onClick?: (rowIndex: number, colIndex: number) => void;
}

export default Properties;