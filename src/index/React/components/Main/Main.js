// ====== IMPORTS ======
import React, { useEffect, useRef, useState} from "react";
import cloud1 from '../../../../assets/clouds/cloud1.png';
import cloud2 from '../../../../assets/clouds/cloud2.png';
import cloud3 from '../../../../assets/clouds/cloud3.png';
import cloud4 from '../../../../assets/clouds/cloud4.png';
const cloudImgs = [cloud1, cloud2, cloud3, cloud4];

import uniqid from 'uniqid';

import Cloud from "./Cloud/Cloud";

// Create context

export const MainContext = React.createContext()

// ====== Component =======


function Main (props) {
    // Init
    const [clouds, setClouds] = useState([]);
    const renderCounter = useRef(0);
    const cloudCounter = useRef(0);
    const leastCloudNum = 3;
    const mostCloudNum = 9;

    // Hooks

    useEffect(() => {
        if (renderCounter.current === 0) {
            generateInitialClouds(cloudImgs, leastCloudNum, mostCloudNum);
            renderCounter.current = renderCounter.current + 1;
        }        

    }, []);

    useEffect(() => {
        if (cloudCounter.current) {
            initCloudGeneration(clouds);
        }

        cloudCounter.current = cloudCounter.current + 1;
    }, [clouds]);

    // Local functions

    function initCloudGeneration (clouds) {
        console.log(clouds);
        if (clouds.length < mostCloudNum) {
            createCloud();
        }
    }

    function createCloud () {
        console.log('Creating Cloud');
        let cloudsCopy = [...clouds];

        const key = uniqid();
        cloudsCopy.push(<Cloud initial={false} key={key} idKey={key} setClouds={setClouds} cloudsImgs={cloudImgs}/>);

        setClouds(cloudsCopy);
    }

    function generateInitialClouds (cloudImgs, leastCloudNum, mostCloudNum) {
        // Pick a random number between leastCloudNum and mostCloudNum
        const numToGenerate = Math.floor((Math.random() * (mostCloudNum - leastCloudNum + 1)) + leastCloudNum);

        // Create cloud components
        createInitialClouds(numToGenerate);
    }

    function createInitialClouds (numToGenerate) {
        let cloudsCopy = [...clouds];

        for (let i = 0; i < numToGenerate; i++) {
            const key = uniqid();
            cloudsCopy.push(<Cloud initial={true} key={key} idKey={key} setClouds={setClouds} cloudsImgs={cloudImgs}/>);
        }

        setClouds(cloudsCopy);
    }

    // Render

    return (
        <main className="Main">
            <MainContext.Provider value={clouds}>
                { clouds }
            </MainContext.Provider>
        </main>
    );
}

export default Main;