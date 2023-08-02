import classes from './css/Login.module.css'
import NewUser from './NewUser';
import Modal from './Modal';
import { useState } from 'react';


function Login(props) {
/**This component is the login page - Entry point to the app 
 * Create new user form is implemented as a modal overlay controlled by state variable "modalIsVisible"
*/

    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    });

    function handleInputChange(event) {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        });
    };


    function createUserBtnHandler(event) {  //event listener onChange, 
        setModalIsVisible(true)
    }

    function hideModalHander() {
        setModalIsVisible(false);
    }

    function loginBtnHandler(event) {
        event.preventDefault();
//'http://localhost:8000/login
        fetch('https://scrriblequest-production.up.railway.app/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data.message)
                if (data.message === 'Login successful') {
                    props.handleLogin(inputValues)
                }
                else if (data.message === 'Invalid password') {
                    alert("Login failed. Please check your username and/or password !")
                }
                else if (data.message == 'Username does not exist') {
                    alert("No such user. Please sign up to create an account ! ")
                }
            })
            .catch(error => {
                // Handle any errors
                alert("There was a login error")
            });
    }

    return (
        <div>
            {modalIsVisible ?
                <Modal hideModalHander={hideModalHander}>
                    <NewUser hideModalHander={hideModalHander}/>
                </Modal>
                : null}
            <h2>Welcome !</h2>
            <div className={classes.container}>
                <form>
                    <label htmlFor="username">Your Username</label>
                    <input type="text" id="username" name="username" required onChange={handleInputChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={handleInputChange} />
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