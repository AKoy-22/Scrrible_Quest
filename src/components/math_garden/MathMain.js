import React, { useRef, useEffect, useState } from 'react';
import classes from './css/MathMain.module.css'
import { clearCanvas, prepareCanvas } from './canvas';
import { Link } from 'react-router-dom';


function MathMain() {
  const canvasRef = useRef(null);
  let ctx;
  
  const [num1, setNum1] = useState(); // Initial value for n1
  const [num2, setNum2] = useState(); // Initial value for n2
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    const removeEventListeners = prepareCanvas(canvas, ctx);

    newQuestion();

    return () => {
      removeEventListeners(); 
    };
  },[]);

  function newQuestion() {
    const NUM1 = Math.round(Math.random() * 5);
    setNum1(NUM1);
    
    const NUM2 = Math.round(Math.random() * 4);
    setNum2(NUM2);
    
    const answer = NUM1 + NUM2;
  }




  function checkAnswerBtnHandler(){
    const canvas = canvasRef.current;
    const imageDataURL = canvas.toDataURL();

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
        var predicted_num = parseInt(data.predicted_number);
        console.log(predicted_num);
        var answer = num1 + num2;
        if(predicted_num == answer){
          console.log("That is correct!");
          setCorrect(true);
          setWrong(false);
          setTimeout(() => {
            newQuestion();
            setCorrect(false);
            eraseBtnHandler();
          }, 2000); // Delay of 3 seconds (3000 milliseconds)
        }else{
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

  function eraseBtnHandler(){
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    clearCanvas(canvas, ctx);
  }

  return (
    <>
      <div className={classes.container}>

        {correct && <h1 className={classes.yay}>Yay!</h1>}
        {wrong && <h1 className={classes.yay}>Oops! Try again.</h1>}
        {!correct && !wrong && <h1>Math Garden</h1>}
        <Link className={classes.homeLink} onClick={eraseBtnHandler} to="/">Home</Link>
        
        <h2 className={classes.question}> <span id='n1'>{num1}</span> + <span id='n2'>{num2}</span> = </h2>
        <canvas className={classes.myCanvas} ref={canvasRef} width="150" height="150" >error</canvas>
        <div className={classes.topLeftBtns}>
          <button onClick={eraseBtnHandler}>Erase</button>
          <button>Hint</button>
        </div>
        </div>
        <div className={classes.container}>
        <button className={classes.btn} value='Check' onClick={checkAnswerBtnHandler} >Check Answer</button>
      </div>
    </>

  )
}

export default MathMain;



