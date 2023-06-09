// ====== IMPORTS ======

import './game.css';
import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';

import waldo1 from '../../../../../assets/waldo/waldo1.jpg';
import waldo2 from '../../../../../assets/waldo/waldo2.jpg';
import waldo3 from '../../../../../assets/waldo/waldo3.jpg';
import waldo4 from '../../../../../assets/waldo/waldo4.jpg';

import Selection from './Selection/Selection';

// Firebase
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../../../../../firebase-config';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
    Timestamp,
    } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

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

// ====== CONTEXT ======
export const GameContext = React.createContext();

function Game (props) {
    // ====== VARIABLES ======

    const [waldoFound, setWaldoFound] = useState(false);
    const [shouldDisplaySelection, setShouldDisplaySelection] = useState(false);
    const [selectionPosition, setSelectionPosition] = useState({x: 0, y: 0});
    const [resetting, setResetting] = useState(false);
    const resetCounter = useRef(0);
    const [waldoImgObj, setWaldoImgObj] = useState(getRandomWaldo());
    const [waldoImg, setWaldoImg] = useState(waldoImgObj.img);
    const mouseDownPos = useRef({ x: 0, y: 0 });
    const mouseDown = useRef(false);
    const selectionOnWaldo = useRef(false);
    
    // ====== LISTENERS ======

    // Listen for waldo found
    useEffect(() => {
        if (waldoFound) {
            handleWaldoFound();
        }
    }, [waldoFound]);

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

    //  ====== LOCAL FUNCTIONS ======

    function fadeOut () {
        const Game = document.querySelector('.Game');
        if (Game) {
            const currentOpacity = window.getComputedStyle(Game).getPropertyValue('opacity');
            Game.style.opacity = currentOpacity - .06;
            if (currentOpacity <= 0) {
                props.setShouldDisplayGame(false);
                props.setWaldoWasFound(true);
            }
        } else {
            return;
        }

        requestAnimationFrame(fadeOut);
    }

    // Handle the user finding waldo
    function handleWaldoFound () {
        sendEndTime();
        fadeOut();
    }

    async function sendEndTime () {
        console.log('Sending end time');
        await setDoc(doc(firestoreDB, "end-time", props.sessionId.current), {endTime: Timestamp.now()});
    }

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

        if (
            boundingBox.left < waldoImgObj.right 
            && boundingBox.right > waldoImgObj.left
            && boundingBox.top < waldoImgObj.bottom
            && boundingBox.bottom > waldoImgObj.top
            ) {
            selectionOnWaldo.current = true;
        } else {
            selectionOnWaldo.current = false;
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

    async function handleOnLoad () {

        // Send timestamp to server to start timer
        console.log('sending start time');
        await setDoc(doc(firestoreDB, "start-time", props.sessionId.current), {startTime: Timestamp.now()});
    }

// ====== RENDER ======

    return (<div className='Game'>
        <GameContext.Provider value={selectionOnWaldo} >
            <div className='imgWrapper'>
                { shouldDisplaySelection ? <Selection selectionPosition={selectionPosition} setWaldoFound={setWaldoFound} setShouldDisplaySelection={setShouldDisplaySelection} selectionX={selectionPosition.x} selectionY={selectionPosition.y}/> : ''}
                <img onLoad={handleOnLoad} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseDownCapture={handleMouseDown} onMouseUpCapture={handleMouseUp} draggable='false' className='gameBoard' src={waldoImg}/>
            </div>
        </GameContext.Provider>
    </div>);
}

// ====== EXPORT COMPONENT ======

export default Game;