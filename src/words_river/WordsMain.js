import React, { useState, useRef, useEffect } from 'react';
import classes from './css/wordsMain.module.css'
import { Link } from 'react-router-dom';
import { clearCanvas, prepareCanvas } from '../components/math_garden/canvas';

function speakWord(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);

    // Set the voice
    const voices = speechSynthesis.getVoices();

    const selVoice = Math.round(Math.floor(Math.random() * 4) + 1);
    const selectedVoice = voices[selVoice];
    utterance.voice = selectedVoice;

    // Set the pitch
    utterance.pitch = 1.5;
    //set the speed
    utterance.rate = 0.7;

    speechSynthesis.speak(utterance);
  } else {
    console.log('Speech synthesis is not supported in this browser.');
  }
}


function logAvailableVoices() {
  if ('speechSynthesis' in window) {
    const voices = speechSynthesis.getVoices();
    console.log(voices);
  } else {
    console.log('Speech synthesis is not supported in this browser.');
  }
}

function WordsMain() {
  const canvRef = useRef(null);
  const [indexToReplace, setIndexToReplace] = useState(2);
  const [canvasReady, setCanvasReady] = useState(false);
  const [word, setWord] = useState('apple');

  // useEffect(() => {
  // },[])


  useEffect(() => {
    //prepare and load the canva(s)

    if (canvasReady) {
      const c1 = canvRef.current;
      const context = c1.getContext('2d', { willReadFrequently: true });
      const removeEventListeners = prepareCanvas(c1, context)


      return () => {
        // //clearing the eventlistners to reset the canvas
        removeEventListeners();

      };
    }

  }, [canvasReady, setIndexToReplace]);

  const handleSpeak = () => {
    speakWord(word);
    logAvailableVoices();

  };

  function checkAnswerBtnHandler() {
    setCanvasReady(false);
    setIndexToReplace(Math.floor(Math.random() * 5));

    const canvas1 = canvRef.current;
    const imageDataURL = canvas1.toDataURL();
    fetch('http://localhost:8000/process-image/letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageDataURL }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend
        console.log(data);
        const prediction = data.predicted_numbers[0];
        console.log(prediction);

      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

  }

  function eraseBtnHandler() {
    const canvas1 = canvRef.current;
    const ctx1 = canvas1.getContext('2d', { willReadFrequently: true });

    clearCanvas(canvas1, ctx1);

  }

  return (
    <div>
      <Link className={classes.homeLink} to="/">Home</Link>

      <div className={classes.container}>
        <h1 className={classes.title}>Words River</h1>

        {word.split('').map((char, index) => {

          if (index === indexToReplace) {
            return (
              <canvas
                className={classes.wordCanvas}
                ref={(ref) => {
                  if (ref) {
                    canvRef.current = ref;
                    setCanvasReady(true); // Call setCanvasReady when the canvas is rendered
                  }
                }}
                key={index}
                width="150"
                height="150"
              ></canvas>
            );
          } else {
            return <span key={index}>{char}</span>;
          }
        })}
        {/* <canvas className={classes.wordCanvas} ref={canvRef} width="150" height="150">error</canvas> */}
      </div>






      <div className={classes.topLeftBtns}>
        <button onClick={eraseBtnHandler}>Erase</button>
        <button>Hint</button>
      </div>

      <div className={classes.container}>
        <button className={classes.btnSpeak} onClick={handleSpeak}>Speak Word</button>
        <button className={classes.btn} value='Check' onClick={checkAnswerBtnHandler} >Check</button>
      </div>
    </div>


  );
}

export default WordsMain;