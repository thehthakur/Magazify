'use client';
import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }
      const userData = await response.json();
      console.log('User data:', userData);
      // // console.log(data)
      localStorage.setItem('data-username',userData['name']);
      localStorage.setItem('data-email',userData['email']  )
      // console.log(data)
    

      // If needed, handle successful sign-in actions here

      // Redirect to the homepage
      // window.location.href = '/'; // Replace '/' with your actual homepage path

    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div>
      Sign In Page
      <div className="card">
        <form name="login_form" onSubmit={handleSignIn}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="error error--hidden">{errorMessage}</p>

          <input type="submit" value="Log In" className="btn" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
