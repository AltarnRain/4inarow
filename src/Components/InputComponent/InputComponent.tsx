/**
 * Generic input component.
 */

import React from "react";
import Properties from "./Properties";

const InputComponent: React.FC<Properties> = (props) => {
    return (
        <div style={{display: "flex"}}>
            <span style={{display: "flex", width: "10%"}}>{props.text}</span>
            <input style={{display: "flex", width: "5%"}} value={props.value} onChange={onChange} />
        </div>
    );

    function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (props.onChange) {
            props.onChange(props.name, event.target.value);
        }
    }
};

export default InputComponent;