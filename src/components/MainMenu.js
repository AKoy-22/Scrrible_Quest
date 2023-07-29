import classes from './css/MainMenu.module.css'
import { Link } from 'react-router-dom';
import boygirl from '../images/boy-girl.png'
import star from '../images/girl-star.png';
import star2 from '../images/boy-star.png'

function Welcome({ handleLogout }) {
    /**This component is the main menu page with two options 1. Math and 2.Words 
     * There will also be links to games once user accumulated enough scores.
     * Once user achieves score of above 5,which is controlled by gameThreshold variable, 
     * game links will appear. Tic Tac Toe for Maths game, Go Fish! for Words game.
    */
    let MathScore = localStorage.getItem('currentScoreMath');
    let WordScore = localStorage.getItem('currentScoreWords');
    const gameThreshold = 5; 
   
    let storedUserName = localStorage.getItem('userStorageName');
    storedUserName = storedUserName ? storedUserName.charAt(0).toUpperCase() + storedUserName.slice(1) : '';
    return (
        <div>
            <div className={classes.logoutLink} onClick={handleLogout}>Logout</div>
            <div className={classes.welcomeContainer}>
                <h2 className={classes.welcome}>Hello <span className={classes.userName}>{storedUserName}!</span></h2>
            </div>
            <div className={classes.boygirl}><img src={boygirl} /></div>
            <div className={classes.subTitleContainer}>
            <h3 className={classes.subTitle}>Where do you want to go today ?</h3>
                {MathScore >= gameThreshold
                    && <Link to="/tic-tac-toe"><img className={classes.starImg2} src={star2} alt="boy on a shooting star" /></Link>}
                {WordScore >= gameThreshold
                    && <Link to="/fish-game"><img className={classes.starImg} src={star} alt="girl on a shooting star" /></Link>}
            </div>

            <ul className={classes.mainUL}>
                <li className={classes.mathLink}><Link to="/math-garden-levels">Math Garden</Link></li>
                <li className={classes.wordLink} ><Link to="/words-river-levels">Words River</Link></li>
            </ul>
        </div>
    );
}

export default Welcome; 