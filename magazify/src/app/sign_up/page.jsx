'use client';
import { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Email already exists!!');
        return;
      }
      window.location.href = '/';

      // If needed, handle successful sign-up actions here

    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('An unexpected error occurred during sign-up.');
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className="center">Create an Account</h1>
        <form name="signup_form" onSubmit={handleSignUp}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input type="submit" value="Sign Up" className="btn" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
