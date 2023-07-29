
import classes from './css/NewUser.module.css';
import React, {useState} from 'react';

function NewUser({hideModalHander}){
  /**This is the create new user form inside the modal
   * If form is valid, new user is created in saved in backend database
   */
    const [inputValues, setInputValues] = useState({
        username:'',
        first_name: '',
        last_name:'',
        password: '',
        email: '',
        grade: ''
      });

    function handleInputChange(event){
        setInputValues({
          ...inputValues,
          [event.target.name]: event.target.value
        });
      };
    
    function validateForm() {
        // Validate first name and last name
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(inputValues.fName) || !nameRegex.test(inputValues.lName)) {
          alert('First name and last name cannot contain numbers or special characters.');
          return false;
        }
    
        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(inputValues.email)) {
          alert('Invalid email format.');
          return false;
        }
    
        // Validate password length and format
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(inputValues.password)) {
          alert('Password must be at least 8 characters long and include both letters and numbers.');
          return false;
        }
    
        // Validate grade range
        const grade = parseInt(inputValues.grade);
        if (grade < 0 || grade > 6) {
          alert('Grade must be between 0 and 6.');
          return false;
        }
    
        return true; // Form is valid
      }

    //sends data to backend if form is valid   
    function registerBtnHandler(event){
      event.preventDefault(); // Prevent form submission

        const isFormValid = validateForm();
        if(! isFormValid){
            return;
        }

        fetch('http://localhost:8000/add-user/', {  
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputValues)
        })
        .then(response => {
           // Handle the response from the Django backend
           if(response.status===200){
             hideModalHander();
           }//sets modalIsVisible=false to clear the form if registration is successful. 
           alert("You are registered. Please login with your username and password !")
         })
         .catch(error => {
           // Handle any errors
           alert("There was a registration error")
         });
        event.preventDefault();
      }
    

    return(
        <div className={classes.newUserContainer}>      
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required  onChange={handleInputChange}/>
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" required  onChange={handleInputChange}/>
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="last_name" name="last_name" required  onChange={handleInputChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required onChange={handleInputChange} />
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" name="email" required  onChange={handleInputChange}/>
            <label htmlFor="grade">Grade</label>
            <input type="number" id="grade" name="grade" onChange={handleInputChange}/>
            <button type="submit" onClick={registerBtnHandler}>Register</button>
        </form> 
        </div>
    )
}

export default NewUser;