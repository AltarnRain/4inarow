/**
 * Generic input component.
 */

import React from "react";
import Properties from "./Properties";

const InputComponent: React.SFC<Properties> = (props) => {
    return (
        <div>
            <span>{props.text}</span>
            <input value={props.value} onChange={onChange} />
        </div>
    );

    function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (props.onChange) {
            props.onChange(props.name, event.target.value);
        }
    }
};

export default InputComponent;