// ====== IMPORTS ======
import React, { useState, useRef, useEffect, useContext } from "react";
import { MainContext } from "../Main";
import './cloud.css';

// ====== COMPONENT ======
function Cloud (props) {
    // Init

    const [cloudImg, setCloudImg] = useState();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const renderCounter = useRef(0);
    const animationCounter = useRef(0);
    const clouds = useContext(MainContext);
    const [cloudHeight, setCloudHeight] = useState(0);

    // Hooks

    useEffect(() => {
        if (renderCounter.current === 0) {
            // Set the image used for the cloud
            setCloudImg(props.cloudsImgs[Math.floor(Math.random() * props.cloudsImgs.length)]);

            // Set the height of the element
            setupCloudHeight();

            // Initialize animation
            initAnimate();

            // Different setup if clouds are initial
            if (props.initial) {
                setUpInitialCloud();
            } else {
            // Standard Cloud Setup
                setUpCloud();
            }

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

    function setupCloudHeight () {
        setCloudHeight(Math.random() * window.innerHeight * .6);
    }

    function setUpInitialCloud () {
        const randomOnScreenX = Math.floor(Math.random() * window.innerWidth);
        const randomOnScreenY = Math.floor(Math.random() * window.innerHeight);

        setPosition({x: randomOnScreenX, y: randomOnScreenY});
    }

    function setUpCloud () {
        const randomOffScreenX = 0 - Math.random() * 300;
        const randomOnScreenY = Math.floor(Math.random() * window.innerHeight);

        setPosition({x: randomOffScreenX, y: randomOnScreenY});
    }

    function handleOnLoad () {
        setPosition({
            x: position.x - getDomCloudElement().getBoundingClientRect().width / 2,
            y: position.y - getDomCloudElement().getBoundingClientRect().height / 2 
        });
    }

    function getDomCloudElement () {
        const cloudDomElements = [...document.querySelectorAll('.Cloud')];
        return cloudDomElements.filter((cloudElement) => {
            return cloudElement.getAttribute("data-key") === props.idKey;
        })[0];
    }

    function initAnimate () {
        if (animationCounter.current%3 === 0) {
            updatePosition();
        }
        window.requestAnimationFrame(initAnimate);
        animationCounter.current = animationCounter.current + 1;
    }

    function setSpeed (rangeLow, rangeHigh) {
        return Math.random() * (rangeHigh - rangeLow);
    }

    function updatePosition () {
        setPosition((position) => ({x: position.x + 1, y: position.y}));
    }

    function removeSelf () {
        props.setClouds(clouds.filter((cloud) => {
            return props.idKey != cloud.props.idKey;
        }));
    }

    // Render

    return (
        <img onLoad={handleOnLoad} data-key={props.idKey} style={{ right: position.x + 'px', top: position.y + 'px', height: cloudHeight + 'px' }} className="Cloud" src={cloudImg}/>
    );
}

export default Cloud;