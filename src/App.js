import Login from './components/Login'
import Welcome from './components/MainMenu';
import { useState, useEffect } from 'react';

function App() {
/**Entry point to the app. Welcome or Login page is displayed
 * depending on the login status. 
 */
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginData, setLoginData] = useState(null);

  // Load login status from storage on component mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('loginStatus');
    if (storedLoginStatus === 'true') {
      setLoginStatus(true);
    }
  }, []);

  function handleLogin(userData) {
    setLoginStatus(true);
    setLoginData(userData);
    localStorage.setItem('userStorageName', userData.username);
    // Store login status in storage
    localStorage.setItem('loginStatus', 'true');
  }

  function handleLogout(event) {
    setLoginStatus(false);
    // Remove loginstorage data
    localStorage.removeItem('userStorageName');
    localStorage.removeItem('loginStatus');
  }

  return (
    <div>
      {loginStatus ? <Welcome handleLogout={handleLogout} /> :
        <Login handleLogin={handleLogin} />
      }
    </div>
  );
}
export default App;
