
import classes from './css/NewUser.module.css';
import React, {useState} from 'react';

function NewUser(){
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

    function registerBtnHandler(event){

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
           console.log(response.status);
         })
         .catch(error => {
           // Handle any errors
           console.log("There was an error")
         });
        event.preventDefault();
        console.log(inputValues)
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

export default NewUser