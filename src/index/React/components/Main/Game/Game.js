import './game.css';
import React, { useRef, useState } from 'react';
import waldo1 from '../../../../../assets/waldo/waldo1.jpg';
import waldo2 from '../../../../../assets/waldo/waldo2.jpg';
import waldo3 from '../../../../../assets/waldo/waldo3.jpg';
import waldo4 from '../../../../../assets/waldo/waldo4.jpg';

const waldos = [waldo1, waldo2, waldo3, waldo4];

function Game (props) {

    const [waldoImg, setWaldoImg] = useState(getRandomWaldo());
    const mouseDownPos = useRef({ x: 0, y: 0 });
    const mouseDown = useRef(false);

    function getRandomWaldo () {
        const index = Math.floor(Math.random() * 4);
        
        return waldos[index];
    }


    function handleMouseDown (event) {
        mouseDownPos.current = { x: event.screenX, y: event.screenY};

        mouseDown.current = true;
    }

    function handleMouseUp (event) {
        console.log(mouseDownPos);
        console.log({ x: event.screenX, y: event.screenY });

        if (mouseDownPos.current.x === event.screenX && mouseDownPos.current.y === event.screenY) {
            console.log('click');
        } else {
            console.log('not a click');
        }

        mouseDown.current = false;
    }

    function handleMouseMove (event) {
        if (mouseDown.current) {
            console.log({
                moveX: event.movementX,
                moveY: event.movementY
            });

            // Get gameBoard and scroll it
            const gameBoard = document.querySelector('.Game');
            gameBoard.scrollBy(-event.movementX, -event.movementY);
        }
    }

    function handleMouseLeave () {
        mouseDown.current = false;
    }

    return (<div className='Game'>
        <img onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} draggable='false' className='gameBoard' src={waldoImg}/>
    </div>);
}

export default Game;