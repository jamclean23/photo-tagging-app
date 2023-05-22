// ====== IMPORTS ======
import React, { useState, useRef, useEffect, useContext } from "react";
import { MainContext } from "../Main";
import './cloud.css';

// ====== COMPONENT ======
function Cloud (props) {
    // Init

    const [cloudImg, setCloudImg] = useState();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cloudHeight, setCloudHeight] = useState(0);
    const [shouldDisplay, setShouldDisplay] = useState('none');
    
    const amWaldo = useRef(false);
    const renderCounter = useRef(0);
    const animationCounter = useRef(0);
    const speed = useRef(setSpeed());
    const speedup = useRef(false);

    const clouds = useContext(MainContext).clouds;
    const shouldGenerate = useContext(MainContext).shouldGenerate;

    // Hooks

    useEffect(() => {
        if (shouldGenerate === false) {
            speedup.current = true;
        }
    }, [shouldGenerate]);

    useEffect(() => {
        if (renderCounter.current === 0) {
            // If cloud is initial, do not allow waldo cloud
            let cloudsOffset = 0;

            if (props.initial || checkWaldoExists()) {
                cloudsOffset = 1;
            }
            

            // Set the image used for the cloud
            let imgIndex = Math.floor(Math.random() * (props.cloudsImgs.length - cloudsOffset));

            // If is waldo, set waldo
            if (imgIndex === 4) {
                amWaldo.current = true;
            }

            setCloudImg(props.cloudsImgs[imgIndex]);


            // Set the height of the element
            setupCloudHeight();

            // Initialize animation
            initAnimate(1);

            // 

            renderCounter.current = renderCounter.current + 1;
        }
    }, []);

    useEffect(() => {
        if (position.x > window.innerWidth) {
            removeSelf();
        }
    }, [position]);


    // Local functions

    function checkWaldoExists () {
        let waldoExists = false;
        const cloudDomElements = document.querySelectorAll('.Cloud');
        cloudDomElements.forEach((cloudElement) => {
            if (cloudElement.getAttribute('data-is-waldo') === 'true') {
                waldoExists = true;
            }
        });

        return waldoExists;
    }

    function setSpeed () {
        return Math.random() * .4 + .2;
    }

    function setupCloudHeight () {
        setCloudHeight(Math.random() * window.innerHeight * .6);
    }

    function setUpInitialCloud () {
        const randomOnScreenX = Math.floor(Math.random() * window.innerWidth);
        const randomOnScreenY = Math.floor(Math.random() * window.innerHeight);

        return { x: randomOnScreenX, y: randomOnScreenY };
    }

    function setUpCloud () {
        const randomOffScreenX = 0 - 800 + Math.random() * 200;
        const randomOnScreenY = Math.floor(Math.random() * window.innerHeight);

        return { x: randomOffScreenX, y: randomOnScreenY };
    }

    function handleOnLoad () {

        let positionObj = {};
        // Different setup if clouds are initial
        if (props.initial) {
            positionObj = setUpInitialCloud();
        } else {
        // Standard Cloud Setup
            positionObj = setUpCloud();
        }

        setPosition({
            x: positionObj.x - getDomCloudElement().getBoundingClientRect().width / 2,
            y: positionObj.y - getDomCloudElement().getBoundingClientRect().height / 2 
        });

        setShouldDisplay('block');
    }

    function getDomCloudElement () {
        const cloudDomElements = [...document.querySelectorAll('.Cloud')];
        return cloudDomElements.filter((cloudElement) => {
            return cloudElement.getAttribute("data-key") === props.idKey;
        })[0];
    }

    function initAnimate () {
        if (animationCounter.current%1 === 0) {
            if (speedup.current === true) {
                speed.current = speed.current + (speed.current * .08);
            }
            updatePosition();
        }
        window.requestAnimationFrame(initAnimate);
        animationCounter.current = animationCounter.current + 1;
    }

    function updatePosition () {
        setPosition((position) => ({x: position.x + speed.current, y: position.y}));
    }

    function removeSelf () {
        props.setClouds(clouds.filter((cloud) => {
            return props.idKey != cloud.props.idKey;
        }));
    }

    // Render

    return (
        <img draggable="false" data-is-waldo={amWaldo.current} onLoad={handleOnLoad} data-key={props.idKey} style={{ right: position.x + 'px', top: position.y + 'px', height: cloudHeight + 'px', display: shouldDisplay }} className="Cloud" src={cloudImg}/>
    );
}

export default Cloud;