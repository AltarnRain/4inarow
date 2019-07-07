/**
 * Main app for N in a row.
 */

import React, { useState } from "react";
import SetupModel from "../Models/Setup";
import "./App.css";
import GridComponent from "./Grid/GridComponent";
import SetupComponent from "./Setup/SetupComponent";

const App: React.FC = () => {

    const [setupComplete, setSetupComplete] = useState(false);
    const [currentSetup, setCurrentSetup] = useState<SetupModel>();

    /**
     * Sets the current setup and begins the game.
     * @param {string} name1. First name.
     * @param {string} name2. Second name.
     */
    function onSetupDone(setup: SetupModel) {
        setCurrentSetup(setup);
        setSetupComplete(true);
    }

    return (
        <div>
            {setupComplete
                ?
                <GridComponent setup={currentSetup} />
                :
                <SetupComponent onSetup={onSetupDone} />
            }
        </div>
    );
};

export default App;
