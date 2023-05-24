import './game.css';
import React, { useEffect, useRef, useState } from 'react';
import waldo1 from '../../../../../assets/waldo/waldo1.jpg';
import waldo2 from '../../../../../assets/waldo/waldo2.jpg';
import waldo3 from '../../../../../assets/waldo/waldo3.jpg';
import waldo4 from '../../../../../assets/waldo/waldo4.jpg';

import Selection from './Selection/Selection';

const waldos = [
    { 
        img: waldo1,
        x: 544,
        left: 525,
        right: 563,
        y: 393,
        top: 356,
        bottom: 413,
        width: 1024,
        height: 768
    }, 
    { 
        img: waldo2,
        x: 1924,
        left: 1907,
        right: 1938,
        y: 103,
        top: 55,
        bottom: 120,
    }, 
    { 
        img: waldo3,
        x: 179,
        left: 160,
        right: 194,
        y: 171,
        top: 141,
        bottom: 193
    }, 
    {
        img: waldo4 ,
        x: 1292,
        left: 1238,
        right: 1336,
        y: 888,
        top: 800,
        bottom: 1051
    }
];

function Game (props) {

    const [shouldDisplaySelection, setShouldDisplaySelection] = useState(false);
    const [selectionPosition, setSelectionPosition] = useState({x: 0, y: 0});
    const [resetting, setResetting] = useState(false);
    const resetCounter = useRef(0);
    const [waldoImgObj, setWaldoImgObj] = useState(getRandomWaldo());
    const [waldoImg, setWaldoImg] = useState(waldoImgObj.img);
    const mouseDownPos = useRef({ x: 0, y: 0 });
    const mouseDown = useRef(false);
    
    // Resets selection component when moving it
    useEffect(() => {
        if (resetting) {
            setResetting(false);
            setShouldDisplaySelection(false);
        } else if (!resetting && resetCounter.current > 0){
            setShouldDisplaySelection(true);
        }

        if (resetCounter.current === 0 ) {
            resetCounter.current = 1;
        }
    }, [resetting]);

    useEffect(() => {
        if (shouldDisplaySelection) {
            checkForWaldo(selectionPosition);
        }
    }, [selectionPosition]);


    // Check for Waldo when selection is placed
    function checkForWaldo () {
        let waldoSelected;

        const selection = document.querySelector('.Selection');
        const selectionWidth = selection.getBoundingClientRect().width;
        const boundingBox = {
            left: selectionPosition.x - (selectionWidth / 2),
            right: selectionPosition.x + (selectionWidth / 2),
            top: selectionPosition.y - (selectionWidth / 2),
            bottom: selectionPosition.y + (selectionWidth / 2)
        };
        // const boundingBox = selection.getBoundingClientRect();
        const imgBoundingBox = document.querySelector('.gameBoard').getBoundingClientRect();

        console.clear();
        console.log('Image:');
        console.log(imgBoundingBox);
        console.log('\nSelection:');
        console.log(boundingBox);
        console.log('\nWaldo Left: ' + waldoImgObj.left);
        console.log('Selection Left: ' + boundingBox.left);
        console.log('Waldo Right: ' + waldoImgObj.right);
        console.log('Selection Right: ' +boundingBox.right );
        console.log('Waldo Top: ' + waldoImgObj.top);
        console.log('Selection Top: ' + boundingBox.top);
        console.log('Waldo Bottom: ' + waldoImgObj.bottom);
        console.log('Selection Bottom: ' + boundingBox.bottom);

        if (
            boundingBox.left < waldoImgObj.right 
            && boundingBox.right > waldoImgObj.left
            && boundingBox.top < waldoImgObj.bottom
            && boundingBox.bottom > waldoImgObj.top
            ) {
            console.log('found waldo');
        }


    }

    // Get a random waldo game image
    function getRandomWaldo () {
        const index = Math.floor(Math.random() * 4);
        
        return waldos[index];
    }


    function handleMouseDown (event) {
        mouseDownPos.current = { x: event.screenX, y: event.screenY};

        mouseDown.current = true;
    }

    function handleMouseUp (event) {

        if (mouseDownPos.current.x === event.screenX && mouseDownPos.current.y === event.screenY) {
            handleClickEvent(event.pageX, event.pageY);
        } else {
            console.log('not a click');
        }

        mouseDown.current = false;
    }

    function resetSelection () {
        if (shouldDisplaySelection) {
            setResetting(true);
        }
    }

    function handleClickEvent (eventX, eventY) {
        resetSelection();
        setShouldDisplaySelection(true);

        
        // Calculate img offset
        
        const gameBoardImg = document.querySelector('.gameBoard');
        
        const SelectionPosOnImg = {
            x: eventX - gameBoardImg.getBoundingClientRect().x,
            y: eventY - gameBoardImg.getBoundingClientRect().y
        };


        setSelectionPosition({
            x: SelectionPosOnImg.x, 
            y: SelectionPosOnImg.y
        });
        
    }


    function handleMouseMove (event) {
        if (mouseDown.current) {

            // Get gameBoard and scroll it on drag
            const gameBoard = document.querySelector('.Game');
            gameBoard.scrollBy(-event.movementX, -event.movementY);
        }

    }

    function handleMouseLeave () {
        mouseDown.current = false;
    }

    return (<div className='Game'>
        <div className='imgWrapper'>
            { shouldDisplaySelection ? <Selection setShouldDisplaySelection={setShouldDisplaySelection} selectionX={selectionPosition.x} selectionY={selectionPosition.y}/> : ''}
            <img  onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseDownCapture={handleMouseDown} onMouseUpCapture={handleMouseUp} draggable='false' className='gameBoard' src={waldoImg}/>
        </div>
    </div>);
}

export default Game;