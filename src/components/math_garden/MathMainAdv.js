import React, { useRef, useEffect, useState } from 'react';
import classes from './css/MathMain.module.css';
import { clearCanvas, prepareCanvas } from './canvas';
import { Link } from 'react-router-dom';
import { newQuestion } from './mathgame_logic';


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
    //prepare and load the canva(s)
    const canvas1 = canvasRef1.current;
    ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
    const removeEventListeners1 = prepareCanvas(canvas1, ctx1);

    const canvas2 = canvasRef2.current;
    ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
    const removeEventListeners2 = prepareCanvas(canvas2, ctx2);

    //retrieve level stored in local storage
    const fetchData = async () => {
      const level = parseInt(localStorage.getItem('level'));
      setLevel(parseInt(localStorage.getItem('level')));
    };

    fetchData();
    //generate new question 
    newQuestion(level, operator, setAdNum1, setAdNum2, setAnswer, setUseSecondCanvas);


    return () => {
      //clearing the eventlistners to reset the canvas
      removeEventListeners1();
      removeEventListeners2();
    };
  }, [useSecondCanvas, operator]);


  //when another operator is chose, new question is rendered
  function setOperatorHandler(operator) {
    setOperator(operator);
    newQuestion(level, operator, setAdNum1, setAdNum2, setAnswer, setUseSecondCanvas);
  }

  //send image data to backend and validate answer with response
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

    fetch('http://localhost:8000/process-image/number', {
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
        !useSecondCanvas ? predicted_num_tot = data.predictions[0]
          : predicted_num_tot = (data.predictions[0]).toString() + (data.predictions[1]).toString();

        console.log("predicted Total: " + predicted_num_tot + "real answer: " + answer);

        if (parseInt(predicted_num_tot) === answer) {
          console.log("That is correct!");
          setRight(true);
          setWrong(false);
          setTimeout(() => {
            newQuestion(level, operator, setAdNum1, setAdNum2, setAnswer, setUseSecondCanvas);
            setRight(false);
            eraseBtnHandler();
            setScore(score + 1);
          }, 2000); // Delay of 2 seconds (2000 milliseconds)
        } else {
          setWrong(true);
          setTimeout(() => {
            eraseBtnHandler();
          }, 2000) // Delay of 2 seconds (2000 milliseconds)
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
  //clears the canvase when Erase button is clicked 
  function eraseBtnHandler() {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
    ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
    //to avoid error when canvas is empty  
    if(ctx1 && ctx2){
      clearCanvas(canvas1, ctx1);
      clearCanvas(canvas2, ctx2);
    }else if(ctx1){
      clearCanvas(canvas1, ctx1);
    }

  }


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

        <div className={classes.topLeftBtns}>
          <button onClick={eraseBtnHandler}>Erase</button>
          <button>Hint</button>
          <button className={classes.opt} onClick={() => setOperatorHandler("+")}>+</button>
          <button className={classes.opt} onClick={() => setOperatorHandler("-")}>-</button>
          <button className={classes.opt} onClick={() => setOperatorHandler("x")}>x</button>
          {level > 3 ? <button className={classes.opt} onClick={() => setOperatorHandler("/")}>/</button> : null}
        </div>

      </div>
      <div className={classes.container}>
        <button className={classes.btn} value='Check' onClick={checkAnswerBtnHandler} >Check</button>
      </div>

    </>
  );
}

export default MathMainAdv;
