// ==UserScript==
// @name         better fishing
// @namespace    https://pokefarm.com/
// @version      1
// @description  custom image above special ripples and better visuals. sound plays when sparkle happen
// @match        https://pokefarm.com/fishing/voyage*
// @grant        GM_xmlhttpRequest
// @connect      decomail.space
// @run-at       document-idle
// ==/UserScript==

(function () {
    "use strict";

    console.log("GM:", typeof GM);
console.log("GM_getResourceURL:", typeof GM_getResourceURL);
console.log("GM.getResourceUrl:", GM?.getResourceUrl);

    const CONFIG = {

        // configs you can adjust to your liking

        // leave "" blank to remove image
        image: "",

        // size of said image
        imageSize: 75,

        // leave "" blank for pfq's sprites
        rippleSprite: "https://i.postimg.cc/FKW7QT2h/ripples.png",

        // ripple sprite scale (1 for no scale)
        scale: 1,

        // brightness (1 for no brightness)
        brightness: 1,

        // glow (true/false)
        glow: true,

        // pulsing animation (true/false)
        pulse: true,

        // leave "" blank to disable sound
        sound: "https://decomail.space/noot.mp3",

        // adjust volume
        volume: 0.7

    };

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let sparkleBuffer = null;

if (CONFIG.sound) {

    GM_xmlhttpRequest({
        method: "GET",
        url: CONFIG.sound,
        responseType: "arraybuffer",

        onload(response) {

            audioContext.decodeAudioData(response.response)
                .then(buffer => {

                    sparkleBuffer = buffer;

                    console.log("sound effect decoded!");

                })
                .catch(err => {

                    console.error("couldn't decode sound effect...", err);

                });

        },

        onerror(err) {

            console.error("couldn't download sound effect...", err);

        }

    });

}
    const style = document.createElement("style");

    style.textContent = `

    button.map-spawn{
background-image:url("https://i.postimg.cc/FKW7QT2h/ripples.png") !important;
}

@keyframes pfqPulse{
0%{transform:translate(-50%,-50%) scale(1);}
50%{transform:translate(-50%,-50%) scale(1.10);}
100%{transform:translate(-50%,-50%) scale(1);}
}

.pfq-special{
transform:scale(${CONFIG.scale}) !important;
z-index:9999 !important;

${CONFIG.glow ? `
filter:
brightness(${CONFIG.brightness})
drop-shadow(0 0 2px white)
drop-shadow(0 0 6px black)
drop-shadow(0 0 7px white);
` : ""
}

}

.pfq-overlay {
position: absolute;
left: 50%;
top: 50%;
width: ${CONFIG.imageSize}px;
height: ${CONFIG.imageSize}px;
transform: translate(-50%,-50%);
background-position: center;
background-repeat: no-repeat;
background-size: contain;
overflow: visible;
pointer-events: none;
z-index: 10000;

${CONFIG.pulse ? `
animation: pfqPulse .8s ease-in-out infinite;
` : ""
}

}

`;


    document.head.appendChild(style);

    function parseY(button){

        const matches=[
            ...button.style.backgroundPosition.matchAll(/(-?\d+)px/g)
        ];

        if(matches.length<2)
            return null;

        return parseInt(matches[1][1],10);

    }

    function ensureOverlay(button){

        if(!CONFIG.image)
            return;

        if(button.querySelector(".pfq-overlay"))
            return;

        const overlay=document.createElement("div");

        overlay.className="pfq-overlay";

        overlay.style.backgroundImage=`url("${CONFIG.image}")`;

        button.appendChild(overlay);

    }

    function removeOverlay(button){

        button.querySelector(".pfq-overlay")?.remove();

    }

function playSparkleSound() {

if (!CONFIG.sound || !sparkleBuffer)
    return;

    if (audioContext.state === "suspended")
        audioContext.resume();

    const source = audioContext.createBufferSource();

    source.buffer = sparkleBuffer;

    const gain = audioContext.createGain();

    gain.gain.value = CONFIG.volume;

    source.connect(gain);
    gain.connect(audioContext.destination);

    source.start(0);

}
    function update(){

        document.querySelectorAll(".map-spawn").forEach(button=>{

            const y=parseY(button);

            console.log(
    button.style.backgroundPosition,
    y
);

            const special=(y===-16);

if (special) {

    button.classList.add("pfq-special");

    ensureOverlay(button);

    if (!button.dataset.sparklePlayed) {

        button.dataset.sparklePlayed = "1";

        console.log("sparkly found!");
playSparkleSound();

    }

}

else {

    button.classList.remove("pfq-special");

    removeOverlay(button);

    delete button.dataset.sparklePlayed;

}

        });

        requestAnimationFrame(update);

    }

    update();

})();
