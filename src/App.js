//import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Welcome from './components/MainMenu';


import { useState } from 'react';

function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [loginData, setLoginData] = useState(null);

  function handleLogin(userData){
      setLoginStatus(true);
      setLoginData(userData);
      console.log(userData);
      console.log(loginStatus);
  }
  function handleLogout(event){
    setLoginStatus(false);
    console.log(loginStatus);
}

  return (
     
      
      <div>
        {loginStatus? <Welcome handleLogout={handleLogout}/> :
       
        <Login handleLogin={handleLogin}/>
       
       }
      </div>
     
  );
}

export default App;
