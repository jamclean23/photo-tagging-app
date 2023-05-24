// ====== IMPORTS ======

import './summaryscreen.css';
import React from 'react';

// ====== COMPONENT ======
function SummaryScreen (props) {


return (<div className='SummaryScreen'>
    <div className='summaryModal'>
        <h2>You found Waldo!</h2>
        <span>It only took PLACEHOLDER seconds.</span>
        <span>Enter your name to record your results!</span>
        <input type='text'/>
        <button>Submit</button>
    </div>
</div>);
}

// ====== EXPORT COMPONENT ======
export default SummaryScreen;