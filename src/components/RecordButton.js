import React, { useState, useEffect } from 'react';
// the button form material-ui is optional
// npm install @material-ui/core
// import Button from '@material-ui/core/Button';

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const RecordButton = ({
    setText,
    setIsMicOn,
    isMicOn,
    setTextDiff,
    textDiff,
    text
}) => {



    var buttonColour;
    var buttonLabel;

    if (isMicOn) {
        buttonColour = "secondary";
        buttonLabel = "Recording...";
    } else {
        buttonColour = "primary";
        buttonLabel = "Record";
    }

    useEffect(() => {
        handleListen()
    }, [isMicOn])

    useEffect(() => {
        // for 3 sec if no text is added, stop the mic
        const timer = setTimeout(() => {
            setIsMicOn(false)   
        } , 3000);
        return () => clearTimeout(timer);
    }, [text])




    const handleListen = () => {
        if (isMicOn) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }

        var lastText = "";
        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')


            console.log("transcript::", transcript)
            // setTextDiff(transcript.length - lastText.length)
            var arr = [];
            for(var i = 1; i <= (transcript.length - lastText.length); i++) {
                arr.push(i)
            }
            setTextDiff(arr)


            setText(transcript)
            lastText = transcript;
            mic.onerror = event => {
                console.log(event.error)
            }
        }

        
    }
    // if you don't want to us the button from Material-ui, just change Button to button
    return (
        <button style={{display: 'none'}} variant="contained" color={buttonColour} onClick={() => { setIsMicOn(!isMicOn) }} >{buttonLabel}</button>
    )
}

export default RecordButton;