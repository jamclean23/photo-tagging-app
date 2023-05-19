// ====== IMPORTS ======
import React from "react";

import './startmenu.css';

import stamp from '../../../../../assets/stamp.png';

function Start (props) {
    return (<div className="StartMenu">
        <h2>Click to start your search!</h2>
        <div className="startWrapper">
            <img className="stamp" src={stamp} alt="stamp" draggable="false" />
            <span className="startBtnText">Ready</span>

        </div>
    </div>);
}

export default Start;