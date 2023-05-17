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

    // Hooks

    useEffect(() => {
        if (renderCounter.current === 0) {
            setCloudImg(props.cloudsImgs[Math.floor(Math.random() * props.cloudsImgs.length)]);
            initAnimate();

            if (props.initial) {
                setUpInitialCloud();
            }

            renderCounter.current = renderCounter.current + 1;
        }
    }, []);

    useEffect(() => {
        if (position.x > window.innerWidth) {
            removeSelf();
        }
    }, [position]);


    // Local functions

    function setUpInitialCloud () {
        const randomOnScreenX = Math.floor(Math.random() * window.innerWidth);
        console.log('Random X: ');
        const randomOnScreenY = Math.floor(Math.random() * window.innerHeight);

        setPosition({x: randomOnScreenX, y: randomOnScreenY});
    }

    function handleOnLoad () {
        setPosition({ x: position.x - getDomCloudElement().getBoundingClientRect().width / 2, y: position.y - getDomCloudElement().getBoundingClientRect().height / 2 });
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
        <img onLoad={handleOnLoad} data-key={props.idKey} style={{ right: position.x + 'px', top: position.y + 'px' }} className="Cloud" src={cloudImg}/>
    );
}

export default Cloud;