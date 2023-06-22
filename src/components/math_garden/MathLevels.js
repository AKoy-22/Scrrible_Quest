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
            <div className={classes.logoutLink} >Logout</div>
            <Link className={classes.homeLink} to="/">Home</Link>
            <div>
                <h3 className={classes.chooseLevel}>Choose Your Level: </h3>
                <ul>
                    <div className={classes.levelsContainer} >
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler(1)} to="/math-garden-advanced">Egg</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler(2)} to="/math-garden-advanced">Larva/Caterpillar</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler(3)} to="/math-garden-advanced">Pupa</Link></li>
                        <li ><Link className={classes.levelsLink} onClick={() => levelClickHandler(4)} to="/math-garden-advanced">Ready to Fly!</Link></li>
                    </div>
                </ul>
            </div>


        </div>
    );
}

export default MathLevels; 