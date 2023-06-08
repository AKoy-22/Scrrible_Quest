import React, { useRef, useEffect } from 'react';
import classes from './css/MathMain.module.css'
import {clearCanvas, prepareCanvas} from './canvas';
import {loadModel, predictNumber} from './loadModel';
//import OpenCVWrapper from './OpenCVWrapper';

function MathMain() {
  const canvasRef = useRef(null);
  let ctx;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    prepareCanvas(canvas, ctx);
    loadModel();
    return () => {
      // Clean up any event listeners or resources if needed
    };
  }, []);

  function checkAnswerHandler(){
    const output = predictNumber(canvasRef.current);
    console.log(output);
    clearCanvas();
  };

  return (
    <div>
      <div className={classes.container}>

        <h1>Math Garden</h1>
        <h2 className={classes.question}> <span id='n1'>3</span> + <span id='n2'>2</span> = </h2>
        <canvas className={classes.myCanvas} ref={canvasRef} width="150" height="150" >error</canvas>
      </div>
      <div className={classes.container}>
        <button id='checkAnswer' className={classes.btn} value='Check' onClick={checkAnswerHandler}>Check Answer</button>
      </div>
      {/* <OpenCVWrapper/> */}
    </div>

  )
}

export default MathMain;