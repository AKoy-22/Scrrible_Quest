import React, { useState, useRef, useEffect } from 'react';
import classes from './css/wordsMain.module.css'
import { Link } from 'react-router-dom';
import { clearCanvas, prepareCanvas } from '../components/math_garden/canvas';
import { speakWord } from './wordsgame_logic';
import spawner from '../images/spawner.png';

function WordsMain() {
  const canvRef = useRef(null);
  const [indexToReplace, setIndexToReplace] = useState();
  const [canvasReady, setCanvasReady] = useState(false); //ensures that canvas element is rendered before prepare canvas is called
  const [word, setWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [right, setRight] = useState(false); //controls corresponding message 
  const [wrong, setWrong] = useState(false); //controls corresponding message 
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false); //canvas removed when show answer button is clicked 
  const [level, setLevel ] = useState();

  async function getRandomWord(grade) {
    try {
      const response = await fetch(`http://localhost:8000/get-random-word/${grade}`);
      const data = await response.json();
      const apiWord = data.random_word;
      setWord(apiWord);
      const len = apiWord.length;
      const randomIndex = Math.floor(Math.random() * len);
      setIndexToReplace(randomIndex);
      setAnswer(apiWord.charAt(randomIndex));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
   //retrieve level stored in local storage
    const fetchData = () => {
      const tempLevel = localStorage.getItem('wordLevel')
      setLevel(tempLevel);
      console.log(localStorage.getItem('wordLevel'));
      getRandomWord(tempLevel);   
    };

    fetchData(); 
    
  }, [])


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

  }, [canvasReady, word]);

  function handleSpeak() {
    speakWord(word);
    //logAvailableVoices();
  };

  function getIndexFromLetter() {
    const uppercaseLetter = answer.toUpperCase();
    const uppercaseA = 'A'.charCodeAt(0);
    const letterCode = uppercaseLetter.charCodeAt(0);
    const index = letterCode - uppercaseA;
    return index;
  }


  function checkAnswerBtnHandler() {
    const canvas1 = canvRef.current;
    const imageDataURL = canvas1.toDataURL();
    fetch('http://localhost:8000/process-image/letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: [imageDataURL] }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend
        console.log(data);
        const prediction = data.predictions[0];
        console.log(prediction);
        const answerIndex = getIndexFromLetter();
        if (answerIndex == parseInt(prediction)) {

          console.log("that is correct !");
          setRight(true);
          setWrong(false);
          setTimeout(() => {
            getRandomWord(level);
            setRight(false);

            eraseBtnHandler();
            setScore(score + 1);
          }, 2000)

        } else {
          console.log("oops ! try again !");
          setWrong(true);
          setTimeout(() => {
            eraseBtnHandler();
          }, 2000);
        }
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

  function showAnswerHandler() {
    setShowAnswer(true);
    console.log("show answer clicked");

    setTimeout(() => {
      setShowAnswer(false);
      getRandomWord(level);
    }, 2000)

  }
  return (
    <div>
    <style>
        {`
          body {
            background-color: #89A8CD;
          }
        `}
      </style>
      <Link className={classes.homeLink} to="/">Home</Link>

      <div className={classes.container}>
        {right && <h1 className={classes.yay}>Yay!😆</h1>}
        {wrong && <h1 className={classes.nay}>Oops! Try again...🧐</h1>}
        {!right && !wrong && <h1 className={classes.title}>Words River</h1>}


        {word.split('').map((char, index) => {

          if (index === indexToReplace && !showAnswer) {
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
        <button onClick={showAnswerHandler}>Show Answer</button>
      </div>

      <div className={classes.container}>
        <button className={classes.btnSpeak} onClick={handleSpeak}>Speak Word</button>
        <button className={classes.btn} value='Check' onClick={checkAnswerBtnHandler} >Check</button>
      </div>
      <div><img src={spawner} alt='image of a spawner'></img></div>
    </div>


  );
}

export default WordsMain;