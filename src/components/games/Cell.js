import classes from './css/cell.module.css';
import { useEffect } from 'react';

function Cell({ id, go, setGo, cells, addCircleCells, addCrossCells, crossCells, handleCellChange, winMsg, availableCells, circleCells }) {
/** Child component of the Tic Tac Toe game */

useEffect(() => {
    console.log("props !!!! : "+availableCells);
 
}, [availableCells])

    function handleClick(e) {
        console.log(e.target);
        //checks if the cell is taken
        const currentCellId = parseInt(e.target.id);
        if (cells[currentCellId] !== "") {
            alert("That cell is already taken!")
        } else {
            if (go === "circle") {
                setGo("cross");
                handleCellChange("circle", parseInt(currentCellId));
                addCircleCells(parseInt(currentCellId));
            }
            if (!winMsg) {
                setTimeout(() => {
                    addCrossCells(availableCells, currentCellId);
                }, 3000);
            }
        }
    }


    return (
        <>
            <div className={classes.square} id={id} onClick={ handleClick}>
                <div id={id} className={crossCells.includes(id) ? classes.cross : circleCells.includes(id) ? classes.circle : ''}></div>
            </div>
        </>
    );
}

export default Cell;