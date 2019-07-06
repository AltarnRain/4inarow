/**
 * Generic input component.
 */

import React from "react";
import Properties from "./Properties";

const InputComponent: React.FC<Properties> = (props) => {
    return (
        <div>
            <span>{props.text}</span>
            <input onChange={onChange} />
        </div>
    );

    function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    }
};

export default InputComponent;