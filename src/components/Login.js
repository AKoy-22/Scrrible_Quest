import classes from './css/Login.module.css'
import NewUser from './NewUser';
import Modal from './Modal';
import { useState } from 'react';

function Login(props) {

    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [inputValues, setInputValues] = useState({
        password: '',
        email: ''
    });

    function handleInputChange(event) {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        });
    };


    function createUserBtnHandler(event) {  //event listener onChange, 
        setModalIsVisible(true)
        return console.log("clicked Register button")
    }

    function hideModalHander() {
        setModalIsVisible(false);
    }

    function loginBtnHandler(event){
        event.preventDefault();
        props.handleLogin(inputValues);
        console.log("Login Button Clicked");
    }

    return (
        <div>
            {modalIsVisible ?
                <Modal hideModalHander={hideModalHander}>
                    <NewUser />
                </Modal>
                : null}
            <h2>Welcome !</h2>
            <div className={classes.container}>
                <form>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" required onChange={handleInputChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={handleInputChange}/>
                    <button type="submit" onClick={loginBtnHandler}>Login</button>
                </form>
            </div>
            <div>
                <button className={classes.registerBtn} onClick={createUserBtnHandler}>Or Create User</button>
            </div>


        </div>
    );

}

export default Login;