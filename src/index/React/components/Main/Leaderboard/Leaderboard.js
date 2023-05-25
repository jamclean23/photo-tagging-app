// ====== IMPORTS ======

import React, { useEffect, useRef, useState } from "react";
import './leaderboard.css';
import uniqid from 'uniqid';

// Firebase
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../../../../../firebase-config';
import {
    getFirestore,
    collection,
    getDocs,
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
function Leaderboard (props) {
    // ====== VARIABLES ======
    
    const mountCounter = useRef(0);
    const [highScores, setHighScores] = useState([]);
    const [highScoresDom, setHighScoresDom] = useState([]);

    // ====== HOOKS ======


    useEffect(() => {
        if (mountCounter.current === 0) {
            getHighScores();
            mountCounter.current = 1;
        }
    }, []);

    useEffect(() => {
        if (highScores.length > 0) {
            buildHighScoresDom();
            fadeIn();
        }
    }, [highScores]);

    useEffect(() => {
        if (highScoresDom.length > 0) {

        }
    }, [highScoresDom]);
    // ====== FUNCTIONS ======

    function buildHighScoresDom () {
        let highScoresJsx = [];
        highScores.forEach((highScore) => {
            highScoresJsx.push(
                <div key={uniqid()} className="highScore">
                    <span><strong>{highScore.name}:  </strong></span><span>{highScore.score} seconds</span>
                </div>
            );
        });
        setHighScoresDom(highScoresJsx);
    }

    async function getHighScores () {
        const querySnapshot = await getDocs(collection(firestoreDB, "high-scores"));

        let highScores = [];
        querySnapshot.forEach((doc) => {
            highScores.push(doc.data());
        });

        highScores.sort((a, b) => {
            console.log(a.score);
            if (+(a.score) > +(b.score)) {
                return -1;
            } else {
                return 1;
            }
        });

        setHighScores(highScores);
    }

    function fadeIn () {
        const leaderboardElement = document.querySelector('.Leaderboard');
        let currentOpacity = window.getComputedStyle(leaderboardElement).getPropertyValue('opacity');
        
        if (currentOpacity < 1) {
            currentOpacity = +currentOpacity + .03;
            leaderboardElement.style.opacity = currentOpacity;
        } else {
            return;
        }

        requestAnimationFrame(fadeIn);
    }

    // ====== RENDER ======

    return (<div className="Leaderboard" >
        <div className="leaderboardModal" >
            <h2>Leaderboard</h2>
            {highScoresDom}
        </div>
    </div>);
}

// ====== EXPORT COMPONENT ======

export default Leaderboard;