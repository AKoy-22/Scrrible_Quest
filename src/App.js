//import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Welcome from './components/MainMenu';


import { useState } from 'react';

function App() {

  const [loginStatus, setLoginStatus] = useState(false);

  function loginBtnHander(event){
      setLoginStatus(true);
      console.log(loginStatus);
  }
  function logOutBtnHander(event){
    setLoginStatus(false);
    console.log(loginStatus);
}

  return (
     
      
      <div>
        {loginStatus? <Welcome logOutBtnHander={logOutBtnHander}/> :
       
        <Login loginBtnHander={loginBtnHander}/>
       
       }
      </div>
     
  );
}

export default App;
