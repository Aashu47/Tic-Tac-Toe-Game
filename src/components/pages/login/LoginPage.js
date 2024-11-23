import './LoginPage.css';
import React, { useState } from 'react';
import ButtonElement from '../../elements/button/ButtonElement';
import InputElement from '../../elements/input/InputElement';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className='login-page'>
      <ToastContainer />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <InputElement
              className='email'
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputElement
              className='password'
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <ButtonElement className='buttons' onClick={handleLogin}>Login</ButtonElement>
          <p>If you are new, <a href="/signup">click here to sign up</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
