"use client";

import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      console.log("User data:", userData);
      localStorage.setItem("data-username", userData["name"]);
      localStorage.setItem("data-email", userData["email"]);

      // If needed, handle successful sign-in actions here

      // Redirect to the homepage
      window.location.href = '/'; // Replace '/' with your actual homepage path
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4 bg-gray-400 p-6 rounded-md mx-auto mt-8" onSubmit={handleSignIn}>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="email" value="Email" />
      </div>
      <TextInput
        id="email"
        type="email"
        placeholder="name@flowbite.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        // className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        // className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <p className="error error--hidden">{errorMessage}</p>
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</Label>
    </div>
    <Button type="submit" className="">Log In</Button>
  </form>
  
  );
};

export default SignIn;
