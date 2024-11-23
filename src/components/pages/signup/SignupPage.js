import './SignupPage.css';
import React, { useState } from 'react'; 
import ButtonElement from '../../elements/button/ButtonElement';
import InputElement from '../../elements/input/InputElement';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import {doc, setDoc} from 'firebase/firestore'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  const [ name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
   try {
      // Create user with Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if(user){
        await setDoc(doc ( db, "user", user.uid), {
          name,
          email
        });
      }
      // Show success toast notification
      toast.success("Registration successful! Redirecting to login page in 3 seconds...");

      // Delay redirect by 3 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      
    } catch (error) {
      console.error("Registration Error:", error);
            
      // Display error message based on Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError("Email already in use. Please use a different email.");
          toast.error("Email already in use. Please use a different email.");
          break;
        case 'auth/invalid-email':
          setError("Invalid email format.");
          toast.error("Invalid email format.");
          break;
        case 'auth/weak-password':
          setError("Password is too weak. Must be at least 6 characters.");
          toast.error("Password is too weak. Must be at least 6 characters.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
          toast.error("An unexpected error occurred. Please try again.");
          break;
      }
    }
  };

  return (
    <div className='signup-page'>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className='form-group'>
          <InputElement
              className='name'
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputElement
              className='email'
              placeholder="Email"
              type="email"
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
            <InputElement
              className='confirm-password'
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          <ButtonElement type="submit" className='buttons'>Sign Up</ButtonElement>
          <p>Already have an account? <a href="/login">Log in here</a></p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
