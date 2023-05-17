// ====== IMPORTS ======
import React, { useState, useRef, useEffect } from "react";

// ====== COMPONENT ======
function Cloud (props) {
    // Init

    const [cloudImg, setCloudImg] = useState();
    const renderCounter = useRef(0);

    // Hooks

    useEffect(() => {
        if (renderCounter.current === 0) {
            setCloudImg(props.cloudsImgs[Math.floor(Math.random() * props.cloudsImgs.length)]);
            renderCounter.current = renderCounter.current + 1;
        }
    }, []);

    // Render

    return (
        <img src={cloudImg}/>
    );
}

export default Cloud;