import classes from '../components/math_garden/css/MathLevels.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function WordLevels() {


    function levelClickHandler(level) {
  
        localStorage.setItem('wordLevel', level);

    }

    return (
        <div>
            <div className={classes.logoutLink} >Logout</div>
            <Link className={classes.homeLink} to="/">Home</Link>
            <div>
            
                <h3 className={classes.chooseLevel}>Choose Your Level: </h3>
                <ul>
                    <div className={classes.levelsContainer} >
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler("1st")} to="/words-river">Eggs</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler("2nd")} to="/words-river">Alevin</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler("3rd")} to="/words-river">Smolts</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler("4th")} to="/words-river">Fry</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler("5th")} to="/words-river">Adults</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler("6th")} to="/words-river">Spanwers</Link></li>
                    </div>
                </ul>
            </div>


        </div>
    );
}

export default WordLevels; 