import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import WelcomeTab from './WelcomeTab.js';
import LoginForm from './LoginForm.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');

  async function userSession(){
    const resp = await fetch('/auth/session');
    if (resp.status === 200) {
      const user = await resp.json();
      setUserName(user.user.name);
    }
  }

  useEffect(() => {
    userSession();
  }, []);

  const handleLogin = async googleData => {
    let data;
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          token: googleData.credential
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        toast.error('Failed to connect - HTTPS status ' + res.status, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      data = await res.json();
    } catch (e) {
      toast.error('Failed to login!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    toast.success('Successfully logged in!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setUserName(data.user.name);
    setIsLoggedIn(true);
    navigate('/profile');
  };

  const handleLogout = async () => {
    await fetch('/auth/logout', {
      method: 'POST',
    });
    toast.success('Successfully logged out!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setUserName('');
  };

  return <>    
    <section id="login-page-container">
      <WelcomeTab />
      <div className="login">
        <LoginForm />
        <h3>{username ? 'Welcome ' + username : 'Login with Google'}</h3>
        {!username && <GoogleLogin
          onSuccess={handleLogin}
          onError={(e) => {
            toast.error(e.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }} /> }
        {username && <button className="logout" onClick={handleLogout}>Logout</button> }
      </div>
      <ToastContainer />
    </section>
  </>;
}

export default LoginPage;