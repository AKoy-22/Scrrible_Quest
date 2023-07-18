import classes from './css/cell.module.css';
import { useState, useEffect } from 'react';

function Cell({id, cell, setCells, go, setGo, cells, addCircleCells, addCrossCells, crossCells, handleCellChange}){



    function handleClick(e){
    console.log(e.target);
    //checks if the cell is taken
    const taken= e.target.firstChild.classList.contains(classes.circle) ||e.target.firstChild.classList.contains(classes.cross);
    if(!taken){
        if(go==="circle"){
            e.target.firstChild.classList.add(classes.circle);
            setGo("cross");
            handleCellChange("circle", parseInt(e.target.id));
            addCircleCells(parseInt(e.target.id));
            
        }
        setTimeout(() => {
                addCrossCells();
            }, 3000);

    }else{
        alert("That cell is taken !")
    }
}

    return(
      <>
        <div className={classes.square} id={id} onClick={handleClick}>
            <div id={id}  className={crossCells.includes(id) ? classes.cross : ''}></div> 
        </div>
      </>
        
    );
}

export default Cell;