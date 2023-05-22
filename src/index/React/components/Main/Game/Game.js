import './game.css';
import React, { useRef } from 'react';
import waldo1 from '../../../../../assets/waldo/waldo1.jpg';
import waldo2 from '../../../../../assets/waldo/waldo2.jpg';
import waldo3 from '../../../../../assets/waldo/waldo3.jpg';
import waldo4 from '../../../../../assets/waldo/waldo4.jpg';

const waldos = [waldo1, waldo2, waldo3, waldo4];

function Game (props) {

    const waldoImg = useRef(getRandomWaldo());

    function getRandomWaldo () {
        const index = Math.floor(Math.random() * 4);
        console.log('index: ' + index);

        return waldos[index];
    }

    return (<div className='Game'>
        <p>game goes here</p>
    </div>);
}

export default Game;