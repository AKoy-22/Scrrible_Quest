import classes from './css/Login.module.css'
import NewUser from './NewUser';
import Modal from './Modal';
import { useState } from 'react';

function Login(props) {

    const [modalIsVisible, setModalIsVisible] = useState(false)



    function createUserBtnHandler(event){  //event listener onChange, 
        setModalIsVisible(true)
        return console.log("clicked Register button")
    }

    function hideModalHander(){
        setModalIsVisible(false);
    }

    return (
        <div>
            {modalIsVisible ? 
            <Modal hideModalHander={hideModalHander}>
                 <NewUser/>
            </Modal>
            : null}
                <h2>Welcome !</h2>
                <div className={classes.container}>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <button type="submit" onClick={props.loginBtnHander}>Login</button>
                </form>
                </div>
                <button className={classes.registerBtn} onClick={createUserBtnHandler}>Or Create User</button>
          
        </div>
    );

}

export default Login;