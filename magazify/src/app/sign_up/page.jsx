"use client";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),dasf
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Email already exists!!");
        return;
      }
      const userData = await response.json();
      console.log("User data:", userData);
      localStorage.setItem("data-username", userData["name"]);
      localStorage.setItem("data-email", userData["email"]);
      window.location.href = "/";

      // If needed, handle successful sign-up actions here
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("An unexpected error occurred during sign-up.");
    }
  };

  return (
    <form className="card max-w-md" name="signup_form" onSubmit={handleSignUp}>
      <h1 className="center">Create an Account</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          type="text"
          id="name"
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          type="email"
          id="email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          type="password"
          id="password"
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p className="error error--hidden">{errorMessage}</p>
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUp;
