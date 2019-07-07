import React, { useState } from "react";
import SetupModel from "../Models/Setup";
import "./App.css";
import GridComponent from "./Grid/GridComponent";
import SetupComponent from "./Setup/SetupComponent";

const App: React.FC = () => {

    const [setupComplete, setSetupComplete] = useState(false);
    const [currentSetup, setCurrentSetup] = useState<SetupModel>();

    /**
     * Sets both player names.
     * @param {string} name1. First name.
     * @param {string} name2. Second name.
     */
    function doneEnteredNames(setup: SetupModel) {
        setSetupComplete(true);
        setCurrentSetup(setup);
    }

    return (
        <div>
            {!setupComplete
                ?
                <GridComponent setup={currentSetup} />
                :
                <SetupComponent onSetup={doneEnteredNames} />
            }
        </div>
    );
};

export default App;
