// ====== IMPORTS ======

import './summaryscreen.css';
import React, { useRef, useEffect, useState } from 'react';

// Firebase
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../../../../../firebase-config';
import {
    getFirestore,
    collection,
    getDoc,
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


// ====== COMPONENT ======
function SummaryScreen (props) {

    // ====== VARIABLES ======

    const [timeTaken, setTimeTaken] = useState(0);
    const mountCounter = useRef(0);
    const [inputValue, setInputValue] = useState('');

    // ====== HOOKS ======

    useEffect(() => {
        const input = document.querySelector('.nameInput');
        
        if (inputValue) {
            input.style.border = "1px solid green";
        } else {
            input.style.border = "1px solid red";
        }
    }, [inputValue]);

    useEffect(() => {
        if (mountCounter.current === 0) {
            getTimeTaken();
        } else {
            mountCounter.current = mountCounter.current + 1;
        }

    }, []);

    useEffect(() => {
        if (timeTaken > 0) {
            fadeIn();
        }
    }, [timeTaken]);

    // ====== FUNCTIONS ======

    function fadeIn () {
        const summaryElement = document.querySelector('.SummaryScreen');
        let currentOpacity = window.getComputedStyle(summaryElement).getPropertyValue('opacity');
        
        if (currentOpacity < 1) {
            currentOpacity = +currentOpacity + .03;
            summaryElement.style.opacity = currentOpacity;
        } else {
            return;
        }

        requestAnimationFrame(fadeIn);
    }

    function fadeOut () {
        const summaryElement = document.querySelector('.SummaryScreen');
        let currentOpacity = window.getComputedStyle(summaryElement).getPropertyValue('opacity');
        
        if (currentOpacity > 0) {
            currentOpacity = +currentOpacity - .03;
            summaryElement.style.opacity = currentOpacity;
        } else {
            props.setShouldDisplaySummary(false);
            props.setShouldDisplayLeaderboard(true);
            return;
        }

        requestAnimationFrame(fadeOut);
    }

    async function getTimeTaken () {

        const startTime = await getDoc(doc(firestoreDB, "start-time", props.sessionId.current));
        const startNano = startTime.data().startTime;

        const endTime = await getDoc(doc(firestoreDB, "end-time", props.sessionId.current));
        const endNano = endTime.data().endTime;

        const totalTime = (endNano - startNano);
        setTimeTaken(totalTime.toFixed(3));
    }

    function handleOnChange (event) {
        
        setInputValue(event.target.value);
    }

    async function handleSubmitClick () {
        if (inputValue) {
            console.log("Submitting " + inputValue + " with a score of " + timeTaken + ".");
            await addDoc(collection(firestoreDB, "high-scores"), { name: inputValue, score: timeTaken});
            fadeOut();
        }
    }

    // ====== RENDER ======

    return (<div className='SummaryScreen'>
        <div className='summaryModal'>
            <h2>You found Waldo!</h2>
            <span>It only took {timeTaken} seconds.</span>
            <span>Enter your name to record your results!</span>
            <input className='nameInput' onChange={handleOnChange} value={inputValue} type='text'/>
            <button className='submitBtn' onClick={handleSubmitClick} >Submit</button>
        </div>
</div>);
}

// ====== EXPORT COMPONENT ======
export default SummaryScreen;