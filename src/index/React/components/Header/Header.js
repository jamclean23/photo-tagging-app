// ====== IMPORTS ======
import React from "react";
import './header.css';

// cloud image
import cloud1 from '../../../../assets/clouds/cloud1.png';

// ====== Component ======

function Header (props) {
    return (<header className="Header">
        <div className="menuImageWrapper">
            <h1><span className="wheres">Where's </span><span className="waldo">Waldo?</span></h1>
            <img draggable="false" src={cloud1}/>
        </div>
    </header>);
}

export default Header;