import classes from './css/MainMenu.module.css'
import { Link } from 'react-router-dom';
const userName = "Kanna";

function Welcome({logOutBtnHander}){
    return(
        <div>
            <div className={classes.logoutLink} onClick={logOutBtnHander}>Logout</div>
            <h2 className={classes.welcome}>Welcome <span className='classes.userName'>{userName}!</span></h2>
            <h3>Where do you want to go today ?</h3>
            <ul>
                <li ><Link className={classes.gameLink} to="/math-garden">Math Garden</Link></li>
                <li ><Link className={classes.gameLink}>Words River</Link></li>
            </ul>
        </div>
    );
}

export default Welcome; 