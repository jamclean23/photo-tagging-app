// ====== IMPORTS ======
import React from "react";
import './startmenu.css';
import stamp from '../../../../../assets/stamp.png';

function StartMenu (props) {

    function fadeout () {
        animate();
    }

    function animate () {

        // Reduce opacity and remove once it's zero
        const StartMenu = document.querySelector('.StartMenu');
        if (StartMenu) {
            const currentOpacity = window.getComputedStyle(StartMenu).getPropertyValue("opacity");
            StartMenu.style.opacity =  currentOpacity - .06;
            if (currentOpacity <= 0) {
                props.setShouldDisplayStart(false);
                props.setShouldDisplayGame(true);
            }
        } else {
            return;
        }
        

        requestAnimationFrame(fadeout);
    }

    function handleStartBtnClick () {
        props.handleStartBtnClick();
        fadeout();
    }

    return (<div className="StartMenu">
        <h2>Click to start your search!</h2>
        <div className="startWrapper" onClick={handleStartBtnClick}>
            <img className="stamp" src={stamp} alt="stamp" draggable="false" />
            <span className="startBtnText">Ready</span>

        </div>
    </div>);
}

export default StartMenu;