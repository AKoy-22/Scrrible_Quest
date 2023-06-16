import React, { useRef, useEffect, useState } from 'react';
import classes from './css/MathMain.module.css';
import { clearCanvas, prepareCanvas } from './canvas';
import { Link } from 'react-router-dom';
import { op, split } from '@tensorflow/tfjs';


function MathMainAdv() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  let ctx1, ctx2;

  const [adNum1, setAdNum1] = useState();
  const [adNum2, setAdNum2] = useState();
  const [useSecondCanvas, setUseSecondCanvas] = useState(false);
  const [right, setRight] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [level, setLevel] = useState(100);
  const [score, setScore] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState();


  useEffect(() => {

    const canvas1 = canvasRef1.current;
    ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
    const removeEventListeners1 = prepareCanvas(canvas1, ctx1);

    const canvas2 = canvasRef2.current;
    ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
    const removeEventListeners2 = prepareCanvas(canvas2, ctx2);

    const fetchData = async () => {
      const level = parseInt(localStorage.getItem('level'));
      setLevel(parseInt(localStorage.getItem('level')));
    };

    fetchData();
    //const lev = parseInt(localStorage.getItem('level'));

    //setLevScore({ ...levScore, "lev": level});

    //const {lev, score} = levScore;
    newQuestion();


    return () => {
      removeEventListeners1();
      removeEventListeners2();
    };
  }, [useSecondCanvas, operator]);


  function newQuestion() {
    let tempAnswer;
    var NUM1, NUM2;
    if (operator === "+" || operator === "-") {
      NUM1 = getRandomNumber(level);
      // console.log(NUM1);
      NUM2 = getRandomNumber(level);
      // console.log(NUM2);
      setAdNum1(NUM1);
      setAdNum2(NUM2);
      if (operator === "+") {
        tempAnswer = NUM1 + NUM2;
      }
      else if (operator === "-") {
        if (NUM1 < NUM2) {
          tempAnswer = NUM2 - NUM1;
          setAdNum1(NUM2);
          setAdNum2(NUM1);
        } else {
          tempAnswer = NUM1 - NUM2;
        }
      }
    }
    else if (operator === "x" || operator === "/") {
      if (operator === "x") {
        var spLevel;
        if (level < 3) {
          spLevel = 1;
        } else {
          spLevel = 2;
        }

        do {
          NUM1 = getRandomNumber(spLevel);
          NUM2 = getRandomNumber(spLevel); setAdNum1(NUM1);
          setAdNum2(NUM2);
        } while (NUM1 * NUM2 == 100);

        tempAnswer = NUM1 * NUM2;
      }
      else {
        do {
          NUM1 = Math.floor(Math.random() * 51) + 1; // Generate a random number for n1 between 1 and 30; // Generate a random number for n1
          NUM2 = Math.floor(Math.random() * 51) + 1; // Generate a random number for n2
        } while (NUM1 % NUM2 !== 0); // Repeat until n1 modulus n2 is 0
        setAdNum1(NUM1);
        setAdNum2(NUM2);
        tempAnswer = NUM1 / NUM2;
      }
    }
    setAnswer(tempAnswer);
    tempAnswer > 9 ? setUseSecondCanvas(true) : setUseSecondCanvas(false);
    console.log(tempAnswer);
  }

  function getRandomNumber(lev) {
    const max = lev * 5;
    const min = (lev * 5) - 5;
    const NUM = Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
    console.log(lev);
    console.log("MAX" + max);
    console.log("MIN" + min);
    console.log("NUM" + NUM);
    return NUM;
  }

  function setOperatorHandler(operator) {
    setOperator(operator);
    newQuestion();
  }

  function checkAnswerBtnHandler() {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;

    const imageDataURL1 = canvas1.toDataURL();
    const imageDataURL2 = canvas2.toDataURL();

    let imageDataURL = [];
    if (!useSecondCanvas) {
      imageDataURL = [imageDataURL1];
    } else {
      imageDataURL = [imageDataURL1, imageDataURL2];
    }

    console.log(imageDataURL);

    fetch('http://localhost:8000/process-image/', {
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
        var predicted_num_tot;
        !useSecondCanvas ? predicted_num_tot = data.predicted_numbers[0]
          : predicted_num_tot = (data.predicted_numbers[0]).toString() + (data.predicted_numbers[1]).toString();

        console.log("predicted Total: " + predicted_num_tot + "real answer: " + answer);

        if (parseInt(predicted_num_tot) === answer) {
          console.log("That is correct!");
          setRight(true);
          setWrong(false);
          setTimeout(() => {
            newQuestion();
            setRight(false);
            eraseBtnHandler();
            setScore(score + 1);
          }, 2000); // Delay of 3 seconds (3000 milliseconds)
        } else {
          setWrong(true);
          setTimeout(() => {
            eraseBtnHandler();
          }, 2000)
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  function eraseBtnHandler() {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
    ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
    clearCanvas(canvas1, ctx1);
    clearCanvas(canvas2, ctx2);
  }
  // Rest of the code...

  return (
    <>
      <div className={classes.container}>
        {right && <h1 className={classes.yay}>Yay!😆</h1>}
        {wrong && <h1 className={classes.nay}>Oops! Try again...🧐</h1>}

        {!right && !wrong && <h1 className={classes.title}>Math Garden</h1>}
        <Link className={classes.homeLink} onClick={eraseBtnHandler} to="/">Home</Link>
        <div className={classes.question}>
          <h2 className={classes.question}> <span id='n1'>{adNum1}</span> {operator} <span id='n2'>{adNum2}</span> = </h2>
          <canvas className={classes.myCanvas} ref={canvasRef1} width="150" height="150">error</canvas>
          <canvas className={classes.myCanvas} ref={canvasRef2} width="150" height="150"
            style={!useSecondCanvas ? { display: 'none' } : {}}>error</canvas>
        </div>
        {/* Rest of the JSX code... */}
        <div className={classes.topLeftBtns}>
          <button onClick={eraseBtnHandler}>Erase</button>
          <button>Hint</button>
          <button className={classes.opt} onClick={() => setOperatorHandler("+")}>+</button>
          <button className={classes.opt} onClick={() => setOperatorHandler("-")}>-</button>
          <button className={classes.opt} onClick={() => setOperatorHandler("x")}>x</button>
          {level > 3 ? <button onClick={() => setOperatorHandler("/")}>/</button> : null}
        </div>

      </div>
      <div className={classes.container}>
        <button className={classes.btn} value='Check' onClick={checkAnswerBtnHandler} >Check</button>
      </div>
      {/* Rest of the JSX code... */}
    </>
  );
}

export default MathMainAdv;
