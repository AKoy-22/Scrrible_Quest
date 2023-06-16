import React, { useRef, useEffect, useState } from 'react';
import classes from './css/MathMain.module.css';
import { clearCanvas, prepareCanvas } from './canvas';
import { Link } from 'react-router-dom';

function MathMainAdv() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  let ctx1, ctx2;

  const [adNum1, setAdNum1] = useState(); // Initial value for n1
  const [adNum2, setAdNum2] = useState(); // Initial value for n2
  const [useSecondCanvas, setUseSecondCanvas] = useState(false);
  const [right, setRight] = useState(false);
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
  }, [useSecondCanvas]);

  function newQuestion() {
    const NUM1 = Math.round(Math.random() * 10);
    setAdNum1(NUM1);

    const NUM2 = Math.round(Math.random() * 10);
    setAdNum2(NUM2);

    const answer = NUM1 + NUM2;
    answer > 9 ? setUseSecondCanvas(true) : setUseSecondCanvas(false);
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

        var answer = adNum1 + adNum2;

        console.log("predicted Total: " + predicted_num_tot + "real answer: " + answer);

        if (parseInt(predicted_num_tot) === answer) {
          console.log("That is correct!");
          setRight(true);
          setWrong(false);
          setTimeout(() => {
            newQuestion();
            setRight(false);
            eraseBtnHandler();
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
        {right && <h1 className={classes.yay}>Yay!</h1>}
        {wrong && <h1 className={classes.yay}>Oops! Try again.</h1>}

        {!right && !wrong && <h1 className={classes.title}>Math Garden</h1>}
        <Link className={classes.homeLink} onClick={eraseBtnHandler} to="/">Home</Link>
        <div className={classes.question}>
          <h2 className={classes.question}> <span id='n1'>{adNum1}</span> + <span id='n2'>{adNum2}</span> = </h2>
          <canvas className={classes.myCanvas} ref={canvasRef1} width="150" height="150">error</canvas>
          <canvas className={classes.myCanvas} ref={canvasRef2} width="150" height="150"
            style={!useSecondCanvas ? { display: 'none' } : {}}>error</canvas>
        </div>
        {/* Rest of the JSX code... */}
        <div className={classes.topLeftBtns}>
          <button onClick={eraseBtnHandler}>Erase</button>
          <button>Hint</button>
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
