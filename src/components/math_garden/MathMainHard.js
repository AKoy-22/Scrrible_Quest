import React, { useRef, useEffect, useState } from 'react';
import classes from './css/MathMain.module.css';
import { clearCanvas, prepareCanvas } from './canvas';
import { Link } from 'react-router-dom';

function MathMainHard() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  let ctx1, ctx2;

  const [num1, setNum1] = useState(); // Initial value for n1
  const [num2, setNum2] = useState(); // Initial value for n2
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    const canvas1 = canvasRef1.current;
    ctx1 = canvas1.getContext('2d', { willReadFrequently: true });
    const removeEventListeners1 = prepareCanvas(canvas1, ctx1);

    const canvas2 = canvasRef2.current;
    ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
    const removeEventListeners2 = prepareCanvas(canvas2, ctx2);

    newQuestion();

    return () => {
      removeEventListeners1();
      removeEventListeners2();
    };
  }, []);

  function newQuestion() {
    const NUM1 = Math.round(Math.random() * 5);
    setNum1(NUM1);

    const NUM2 = Math.round(Math.random() * 4);
    setNum2(NUM2);

    const answer = NUM1 + NUM2;
  }

  // Rest of the code...

  return (
    <>
      <div className={classes.container}>
        {/* Rest of the JSX code... */}
        <div className={classes.canvasContainer}>
          <canvas className={classes.myCanvas} ref={canvasRef1} width="150" height="150">error</canvas>
          <canvas className={classes.myCanvas} ref={canvasRef2} width="150" height="150">error</canvas>
        </div>
        {/* Rest of the JSX code... */}
      </div>
      {/* Rest of the JSX code... */}
    </>
  );
}

export default MathMainHard;
