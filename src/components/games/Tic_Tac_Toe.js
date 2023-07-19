
import Cell from './Cell';
import classes from './css/tic_tac_toe.module.css'
import { useState, useEffect } from 'react';


function Tic_Tac_Toe() {

    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]); //9 cells
    const [go, setGo] = useState("circle");
    const [winMsg, setWinMsg] = useState(null);

    const [crossCells, setCrossCells] = useState([]);
    const [circleCells, setCircleCells] = useState([]);
    const [availableCells, setAvailableCells] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [gameFinish, setGameFinish] = useState(false);

    useEffect(() => {
        checkWinner();

    }, [cells])



    function addCircleCells(someId) {
        // Using the functional update to update the state based on the previous state
        setCircleCells((prevCircleCells) => {
            const newCircleCells = [...prevCircleCells, someId]; // Create a copy of the previous state array
            return newCircleCells; // Update the state with the new array
        });

        setAvailableCells((prevAvailableCells) => {
            const newAvailableCells = prevAvailableCells.filter((number) => number !== someId);
            console.log(newAvailableCells + " newAvailableCells inside setAvailableCells function in adCeircleCells")
            return newAvailableCells;
        })
        console.log(availableCells + " inside addCircleCells function")
    }

    function addCrossCells(arr, currentCellId) {
        //several checks are implemented to ensure cross does not overwrite the circle by referencing previous availableCells  
        if (arr.length > 1) {
            let randomIndex;
            let nextCrossCell;

            do {
                randomIndex = Math.round(Math.random() * (arr.length - 1));//[0,3,5,7]   //index=3 ele=7  
                nextCrossCell = arr[randomIndex];//returns a random id of available cell 7 in this case
                console.log("random index is: " + randomIndex);
                console.log("next cross cell inside while loop is id number" + nextCrossCell);

            } while (circleCells.includes(nextCrossCell) || nextCrossCell === currentCellId)


            setAvailableCells((prevAvailableCells) => {
                const newAvailableCells = prevAvailableCells.filter((number) => number !== nextCrossCell);
                return newAvailableCells;
            })


            setCrossCells((prevCrossCells) => {
                const newCrossCells = [...prevCrossCells, nextCrossCell];
                return newCrossCells;
            });
            handleCellChange("cross", nextCrossCell);
            setGo("circle");
        }
    }

    function handleCellChange(classNameString, id) {

        setCells((prevCells) => {
            const newCells = [...prevCells];
            newCells[id] = classNameString;
            return newCells;
        })
    }

    function checkWinner() {
        const winComb = [
            [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
        ]

        winComb.forEach(comb => {
            let circleWin = comb.every(elem => cells[elem] === "circle");
            if (circleWin) {
                setWinMsg("You Win!🎊");
                setGameFinish(true);
                return;
            }
        });
        winComb.forEach(comb => {
            let circleWin = comb.every(elem => cells[elem] === "cross");
            if (circleWin) {
                setWinMsg("You Loose 😿 ");
                setGameFinish(false);

                return;
            }
        });
    }
    function playAgainHandler() {
        setGameFinish(false);
        setCircleCells([]);
        setCrossCells([]);
        setCells(["", "", "", "", "", "", "", "", ""]);
        setAvailableCells([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        setWinMsg(null);
        setGo("circle")
        
    }


    return (
        <div className={classes.gameContainer}>
            <h2>{winMsg ? winMsg : go === "circle" ? "Your turn!" : "My turn!"}</h2>

            <div className={classes.playBtnContainer}>{winMsg && <button onClick={playAgainHandler} className={classes.playBtn}>Play Again</button>} </div>
            {!gameFinish &&
                <div className={classes.gameboard}>
                    {cells.map((cell, index) => <Cell
                        addCircleCells={addCircleCells}
                        addCrossCells={addCrossCells}
                        crossCells={crossCells}
                        handleCellChange={handleCellChange}
                        key={index}
                        id={index}
                        go={go}
                        setGo={setGo}
                        cells={cells}
                        winMsg={winMsg}
                        availableCells={availableCells}
                        circleCells={circleCells} />)}
                </div>}


        </div>
    )
}

export default Tic_Tac_Toe;