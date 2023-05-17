// ====== IMPORTS ======
import React, { useEffect, useRef, useState } from "react";
import cloud1 from '../../../../assets/clouds/cloud1.png';
import cloud2 from '../../../../assets/clouds/cloud2.png';
import cloud3 from '../../../../assets/clouds/cloud3.png';
import cloud4 from '../../../../assets/clouds/cloud4.png';
const cloudImgs = [cloud1, cloud2, cloud3, cloud4];

import uniqid from 'uniqid';

import Cloud from "./Cloud/Cloud";

// ====== Component =======


function Main (props) {
    // Init
    const [clouds, setClouds] = useState([]);
    const renderCounter = useRef(0);

    // Hooks

    useEffect(() => {
        if (renderCounter.current === 0) {
            generateClouds(cloudImgs, 3, 6);
            renderCounter.current = renderCounter.current + 1;
        }        

    }, []);

    useEffect(() => {
        console.log(clouds);
    }, [clouds]);

    // Local functions

    function generateClouds (cloudImgs, leastCloudNum, mostCloudNum) {
        // Pick a random number between leastCloudNum and mostCloudNum
        const numToGenerate = Math.floor((Math.random() * (mostCloudNum - leastCloudNum + 1)) + leastCloudNum);
        
        createCloudImgs(numToGenerate);
    }

    function createCloudImgs (numToGenerate) {
        let cloudsCopy = [...clouds];

        for (let i = 0; i < numToGenerate; i++) {
            cloudsCopy.push(<Cloud key={uniqid()} cloudsImgs={cloudImgs}/>);
        }

        setClouds(cloudsCopy);
    }

    // Render

    return (
        <main className="Main">
            { clouds }
        </main>
    );
}

export default Main;