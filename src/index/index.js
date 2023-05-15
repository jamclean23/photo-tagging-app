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


// ====== Initialize Firebase ======

const app = initializeApp(firebaseConfig);

// ====== RENDER ======

const reactRoot = createRoot(document.querySelector('#root'));

reactRoot.render(<App />);