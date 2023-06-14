import classes from './css/MainMenu.module.css'
import { Link } from 'react-router-dom';


function Welcome({handleLogout}){

    let storedUserName = localStorage.getItem('userStorageName');
    storedUserName = storedUserName ? storedUserName.charAt(0).toUpperCase() + storedUserName.slice(1) : '';
    return(
        <div>
            <div className={classes.logoutLink} onClick={handleLogout}>Logout</div>
            <h2 className={classes.welcome}>Hello <span className={classes.userName}>{storedUserName}!</span></h2>
            <h3>Where do you want to go today ?</h3>
            <ul>
                <li ><Link className={classes.gameLink} to="/math-garden">Math Garden</Link></li>
                <li ><Link className={classes.gameLink}>Words River</Link></li>
            </ul>
        </div>
    );
}

export default Welcome; 