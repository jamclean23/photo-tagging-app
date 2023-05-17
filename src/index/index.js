// Entry point


// ====== IMPORTS ======

// Firebase integration
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase-config';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
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
} from 'firebase/firestore';

// Styling
import css from './styles.css';

// React
import React from 'react';
import { createRoot } from 'react-dom/client';

// Main React App
import { App } from './React/App.js';

// ====== WINDOW INIT ======

// CSS VARIABLES
function setCssWindowVars () {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', window.innerHeight + 'px');
    doc.style.setProperty('--doc-width', window.innerWidth + 'px');
}

// Set initial variables
setCssWindowVars();

// Event Listener to set variables when window size changes
window.addEventListener('resize', setCssWindowVars);

// DETERMINE ENVIRONMENT
function determineEnvironment () {
    if (window.location.href === 'http://127.0.0.1:5500/dist/index.html') {
        console.log('Environment: Local Test Environment');
        return 'local';
    } else if (window.location.href.split('https://')[1].split('/')[0] === 'jamclean23.github.io') {
        console.log('Environment: Github Pages');
        return 'gh-pages';
    } else {
        console.log('Environment: Other');
        return 'other'
    }
}
const environment = determineEnvironment();

function setPrefix (environment) {
        // Set prefix for path on mount
        if (environment === 'local') {
            return '/dist/index.html';     
        } else if (environment === 'gh-pages') {
            return '/shopping-cart';
        } else {
            return '/';
        }
}
const prefix = setPrefix(environment);

// ====== FIREBASE INIT ======

const app = initializeApp(firebaseConfig);

// ====== RENDER ======

const reactRoot = createRoot(document.querySelector('#root'));

reactRoot.render(<App />);