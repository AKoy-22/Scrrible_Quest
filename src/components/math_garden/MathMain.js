import React, { useRef, useEffect } from 'react';
import classes from './css/MathMain.module.css'
import { clearCanvas, prepareCanvas } from './canvas';
import { Link } from 'react-router-dom';


function MathMain() {
  const canvasRef = useRef(null);
  let ctx;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    prepareCanvas(canvas, ctx);

    return () => {

    };
  }, []);

  function checkAnswerBtnHandler(){
    const data = {
      'name': 'John Doe',
    };
  
    fetch('http://localhost:8000/test', {  
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // Handle the response from the Django backend
      console.log(response.status);
    })
    .catch(error => {
      // Handle any errors
      console.log("There was an error")
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

        <h1>Math Garden</h1>
        <Link className={classes.homeLink} to="/">Home</Link>
        <h2 className={classes.question}> <span id='n1'>3</span> + <span id='n2'>2</span> = </h2>
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



