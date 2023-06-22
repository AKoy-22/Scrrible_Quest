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


  const [word, setWord] = useState('apple');

  useEffect(() => {
    //prepare and load the canva(s)
    const c1 = canvRef.current;
    const context = c1.getContext('2d');
    const removeEventListeners = prepareCanvas(c1, context)


    return () => {
      // //clearing the eventlistners to reset the canvas
      removeEventListeners();

    };
  }, []);

  const handleSpeak = () => {
    speakWord(word);
    logAvailableVoices();

  };

  function checkAnswerBtnHandler() {
    return null;
  }

  function eraseBtnHandler() {
    return null;
  }

  return (
    <div>
      <Link className={classes.homeLink} to="/">Home</Link>
      <div className={classes.topLeftBtns}>
        <button onClick={eraseBtnHandler}>Erase</button>
        <button>Hint</button>
      </div>
      
      <div className={classes.container}>
        <h1 className={classes.title}>Words River</h1>


        <h3 className={classes.question}>{word}</h3>
        <canvas className={classes.myCanvas} ref={canvRef} width="150" height="150">error</canvas>
      </div>


      <div className={classes.container}>
        <button className={classes.btn} onClick={handleSpeak}>Speak Word</button>
        <button className={classes.btn} value='Check' onClick={checkAnswerBtnHandler} >Check</button>
      </div>
    </div>


  );
}

export default WordsMain;