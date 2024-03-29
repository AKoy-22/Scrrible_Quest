
import Cell from './Cell';
import classes from './css/tic_tac_toe.module.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function TicTacToe() {
/**Circle is the user and opppnent cross is automated */
    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]); //9 cells. Keeps track of unused cells and checks for game win.  
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
        setCircleCells((prevCircleCells) => {
            const newCircleCells = [...prevCircleCells, someId]; 
            return newCircleCells; 
        });

        setAvailableCells((prevAvailableCells) => {
            const newAvailableCells = prevAvailableCells.filter((number) => number !== someId);
            return newAvailableCells;
        })
       
    }

    function addCrossCells(arr, currentCellId) {
        //several checks are implemented to ensure cross does not overwrite the circle by referencing previous availableCells  
        if (arr.length > 1) {
            let randomIndex;
            let nextCrossCell;
            do {
                randomIndex = Math.round(Math.random() * (arr.length - 1));
                nextCrossCell = arr[randomIndex];
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
            let crossleWin = comb.every(elem => cells[elem] === "cross");
            if (crossleWin) {
                setWinMsg("You Lose 😿 ");
                setGameFinish(true);
                return;
            }
        });
        winComb.forEach(comb => {
            let tie = comb.every(elem => cells[elem] !== "cross" || cells[elem] !== "circle");
            if (tie && !availableCells.length) {
                setWinMsg("It's a tie 😤 ");
                setGameFinish(true);
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
         <style>
                {`
                    html,body{
                    width:100%;
                    height:100%
                    }
                    body {
                    margin:0;
                    background-color:  rgba(178, 225, 183, 0.7);
                    background-image:url('../images/circle_cross.png');
                    background-size:50%;
                    background-position: center;
                    background-repeat: repeat;
                    }
                `}
            </style>
            <Link className={classes.homeLink} to="/">Home</Link>
            <h2 className={classes.message}>{winMsg ? winMsg : go === "circle" ? "Your turn!🫵🏼" : "My turn!"}</h2>

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

export default TicTacToe;