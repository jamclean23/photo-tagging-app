import './selection.css';
import React, { useContext, useEffect, useState } from 'react';

import Game, { GameContext } from '../Game';

function Selection (props) {

    const [shouldDisplayFoundBtn, setShouldDisplayFoundBtn] = useState(true);
    const [shouldDisplayOopsBtn, setShouldDisplayOopsBtn] = useState(false);
    const [translateAmount, setTranslateAmount] = useState({x: 100, y: 0});
    const selectionOnWaldo = useContext(GameContext);

    // Listen for found and oops buttons
    useEffect(() => {
        if (shouldDisplayFoundBtn) {
            checkForOffscreen('foundButton');
        } else if (shouldDisplayOopsBtn) {
            checkForOffscreen('oopsButton');
        }
    }, [shouldDisplayFoundBtn, shouldDisplayOopsBtn]);

    function checkForOffscreen (button = '') {
        if (button) {
            const gameBoardBox = document.querySelector('.gameBoard').getBoundingClientRect();

            let offsetXPct = translateAmount.x;
            let offsetYPct = translateAmount.y;

            if (props.selectionPosition.x > gameBoardBox.width - 150) {
                offsetXPct = -80;
                if (button === 'oopsButton') {
                    offsetXPct += 25;
                }
            }
            
            if (props.selectionPosition.y < 40) {
                offsetYPct = 120;
            }

            setTranslateAmount({x: offsetXPct, y: offsetYPct});
        }
    }

    function handleFoundButtonClick () {
        setShouldDisplayFoundBtn(false);

        if (selectionOnWaldo.current) {
            props.setWaldoFound(true);
        } else {
            setShouldDisplayOopsBtn(true);
        }
    }

    function handleOopsButtonClick () {
        props.setShouldDisplaySelection(false);
    }


    return (<div className='Selection' style={{ left: props.selectionX, top: props.selectionY }}>
        
        { shouldDisplayFoundBtn 
            ? <div className='foundButton' 
                    style={{ transform: `translate(${translateAmount.x}%, ${translateAmount.y}%)`}} 
                    onClick={handleFoundButtonClick}>I found Waldo!</div>
            : '' 
        }

        { shouldDisplayOopsBtn
            ? <div className='oopsButton' 
                    style={{ transform: `translate(${translateAmount.x}%, ${translateAmount.y}%)`}} 
                    onClick={handleOopsButtonClick} >Oops, Keep looking!</div>
            : ''
        }
    </div>);
}

export default Selection;