import classes from './css/NewUser.module.css'

function NewUser(){

    return(
        <div className={classes.container}>      
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="year">Year</label>
            <input type="number" id="year" name="year"/>
            <button type="submit">Register</button>
        </form> 
        </div>
    )
}

export default NewUser