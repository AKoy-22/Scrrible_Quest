export function newQuestion(level, operator, setAdNum1, setAdNum2, setAnswer, setUseSecondCanvas) {
    let tempAnswer;
    var NUM1, NUM2;
    if (operator === "+" || operator === "-") {
      NUM1 = getRandomNumber(level);
      NUM2 = getRandomNumber(level);
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
          NUM2 = getRandomNumber(spLevel); 
          setAdNum1(NUM1);
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

  export function getRandomNumber(lev) {
    const max = lev * 5;
    const min = (lev * 5) - 5;
    const NUM = Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
    console.log(lev);
    console.log("MAX" + max);
    console.log("MIN" + min);
    console.log("NUM" + NUM);
    return NUM;
  }