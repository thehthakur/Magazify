"use client";

import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/publogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }
      const userData = await response.json();
      console.log("User data:", userData);
      localStorage.setItem("data-username", userData["name"]);
    //   localStorage.setItem("data-email", userData["email"]);
      localStorage.setItem('type','magazine')
      // If needed, handle successful sign-in actions here

      // Redirect to the homepage
      window.location.href = '/'; // Replace '/' with your actual homepage path
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignIn}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p className="error error--hidden">{errorMessage}</p>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Log In</Button>
    </form>
  );
};

export default SignIn;
