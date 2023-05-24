import './selection.css';
import React, { useState } from 'react';

function Selection (props) {

    const [shouldDisplayFoundBtn, setShouldDisplayFoundBtn] = useState(true);
    const [shouldDisplayOopsBtn, setShouldDisplayOopsBtn] = useState(false);

    function handleFoundButtonClick () {
        setShouldDisplayFoundBtn(false);
        setShouldDisplayOopsBtn(true);
    }

    function handleOopsButtonClick () {
        props.setShouldDisplaySelection(false);
    }


    return (<div className='Selection' style={{ left: props.selectionX, top: props.selectionY }}>
        
        { shouldDisplayFoundBtn 
            ? <div className='foundButton' onClick={handleFoundButtonClick}>I found Waldo!</div>
            : '' 
        }

        { shouldDisplayOopsBtn
            ? <div className='oopsButton' onClick={handleOopsButtonClick} >Oops, Keep looking!</div>
            : ''
        }
    </div>);
}

export default Selection;