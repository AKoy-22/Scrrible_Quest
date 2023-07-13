import classes from './css/MathLevels.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function MathLevels() {
    /**This component is for choosing the level for Math Garden game  */
    const [level, setLevel] = useState(0);

    function levelClickHandler(level) {
        setLevel(level);
        localStorage.setItem('level', level);
    }

    return (
        <div>
            <style>
                {`
                    html,body{
                    width:100%;
                    height:100%
                    }
                    body {
                    background-image:url('../images/flower-bg.png');
                    background-size:cover;
                    background-position: center;
                    }
                `}
            </style>
       
            <Link className={classes.homeLink} to="/">Home</Link>
            <div>
            
                <h3 className={classes.chooseLevel}>Choose Your Level: </h3>
                <ul className={classes.mathLevelUL}>
                    <div className={classes.levelsContainer} >
                        <li className={classes.mathItem}><Link className={classes.levelsLink} onClick={() => levelClickHandler(1)} to="/math-garden-advanced">Egg</Link></li>
                        <li className={classes.mathItem}><Link className={classes.levelsLink} onClick={() => levelClickHandler(2)} to="/math-garden-advanced">Caterpillar</Link></li>
                        <li className={classes.mathItem}><Link className={classes.levelsLink} onClick={() => levelClickHandler(3)} to="/math-garden-advanced">Pupa</Link></li>
                        <li className={classes.mathItem}><Link className={classes.levelsLink} onClick={() => levelClickHandler(4)} to="/math-garden-advanced">Ready to Fly!</Link></li>
                    </div>
                </ul>
            </div>


        </div>
    );
}

export default MathLevels; 