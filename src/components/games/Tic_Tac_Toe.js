import Cell from './Cell';
import classes from './css/tic_tac_toe.module.css'
import { useState, useRef } from 'react';


function Tic_Tac_Toe(){
    
    const [cells, setCells]=useState(["","","","","","","","",""]); //9 cells
    const [go, setGo] =useState("circle");
    const [winMsg, setWinMsg]=useState(null); 

    const [crossCells, setCrossCells]=useState([]);
    const [circleCells, setCircleCells]=useState([]);
    const [availableCells, setAvailableCells] = useState([0,1,2,3,4,5,6,7,8]);


    function addCircleCells(someId){
        // Using the functional update to update the state based on the previous state
        setCircleCells((prevCircleCells)=>{
        const newCircleCells = [...prevCircleCells, someId]; // Create a copy of the previous state array
        return newCircleCells; // Update the state with the new array
       });

       setAvailableCells((prevAvailableCells)=>{
        const newAvailableCells=prevAvailableCells.filter((number)=> number!==someId);
        return newAvailableCells;
       })
    }

    function addCrossCells(){
        
        if(availableCells.length>1){
            const randomIndex = Math.round(Math.random() * (availableCells.length - 1));//[0,3,5,7]   //index=3 ele=7  
            const nextCrossCell = availableCells[randomIndex];//returns a random id of available cell 7 in this case
        
            setAvailableCells((prevAvailableCells)=>{
                const newAvailableCells=prevAvailableCells.filter((number)=> number!==nextCrossCell);
                return newAvailableCells;
           })

            setCrossCells((prevCrossCells)=>{
                const newCrossCells = [...prevCrossCells, nextCrossCell];
                return newCrossCells;
            });
            handleCellChange("cross", nextCrossCell);
            setGo("circle");
        }
        
    }

    function handleCellChange(classNameString,id){

        setCells((prevCells)=>{
            const newCells=[...prevCells];
            newCells[id]=classNameString;
            return newCells;
        })
        // const tempCells= cells.map((cell, index)=>{
        //      if(index===id){
        //          return classNameString;
        //      }else{
        //          return cell;
        //      }
        //  })
         
        //  setCells(tempCells);
        //  console.log(tempCells);
     }

    const msg = "it is now " + go + "'s go.";
    return(
        <div className={classes.gameContainer}>

            <div className={classes.gameboard}>
                {cells.map((cell, index)=> <Cell 
                    addCircleCells={addCircleCells} 
                    addCrossCells={addCrossCells}
                    crossCells={crossCells}
                    handleCellChange={handleCellChange}
                    key={index} 
                    id={index} 
                    cell={cell} 
                    setCells={setCells} 
                    go={go} 
                    setGo={setGo} 
                    cells={cells}/> ) }
            </div>
          
            <p>{msg}</p>

        </div>
    )
}

export default Tic_Tac_Toe;