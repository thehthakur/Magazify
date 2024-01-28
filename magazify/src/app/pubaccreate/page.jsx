// app/pubaccreate/page.jsx
"use client"
import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const CreateMagazineAccount = () => {
  const [errorMessage,setErrorMessage]=useState('')
  const [magazineData, setMagazineData] = useState({
    id:"",
    name: "",
    genre: "",
    guideline: "",
    deadline: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMagazineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateAccount =async (event) => {
    
        event.preventDefault();
    
        try {
          const response = await fetch("http://127.0.0.1:5000/create_magazine_account", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: magazineData.id,
    name: magazineData.name,
    genre: magazineData.genre,
    guideline: magazineData.guideline,
    deadline: magazineData.deadline,
    password: magazineData.password,
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || "Email already exists!!");
            return;
          }
          const userData = await response.json();
          console.log("User data:", userData);
          localStorage.setItem("data-username", userData["name"]);
        //   localStorage.setItem("data-email", userData["email"]);
          localStorage.setItem('type','magazine')
          window.location.href = "/";
    
          // If needed, handle successful sign-up actions here
        } catch (error) {
          console.error("Error during account creation:", error);
          setErrorMessage("An unexpected error occurred during account creation.");
        }
      ;
    
    // Handle the logic for creating a magazine account (e.g., API call)
    console.log("Creating magazine account:", magazineData);
    // You can make an API call here to create the magazine account
  };

  return (
    <div className="flex max-w-md flex-col gap-4 bg-gray-400 p-6 rounded-md mx-auto mt-8">
  {/* <h1 className="text-2xl font-bold text-white mb-4">Create Magazine Account</h1> */}
  <label className="flex flex-col mb-4">
    <span className="text-white">Magazine Name</span>
    <input
      name="name"
      value={magazineData.name}
      onChange={handleInputChange}
      className="bg-white p-2 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-black"
    />
  </label>
  <label className="flex flex-col mb-4">
    <span className="text-white">Genre</span>
    <input
      name="genre"
      value={magazineData.genre}
      onChange={handleInputChange}
      className="bg-white p-2 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-black"
    />
  </label>
  <label className="flex flex-col mb-4">
    <span className="text-white">Guideline</span>
    <textarea
    name="guideline"
    value={magazineData.guideline}
    onChange={handleInputChange}
    className="bg-white p-2 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-black"
    rows="4" // Set the number of visible text lines
  />
  </label>
  <label className="flex flex-col mb-4">
    <span className="text-white">Deadline</span>
    <input
    type="date"
    name="deadline"
    value={magazineData.deadline}
    onChange={handleInputChange}
     // Set the minimum value to the current date
    className="bg-white p-2 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-black"
  />
  </label>
  <label className="flex flex-col mb-4">
    <span className="text-white">Password</span>
    <input
      type="password"
      name="password"
      value={magazineData.password}
      onChange={handleInputChange}
      className="bg-white p-2 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-black"
    />
  </label>
  <div className="flex items-center gap-2">
    <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary-300" />
    <span className="text-sm text-gray-500">I agree to the terms and conditions</span>
  </div>
  <Button
    onClick={handleCreateAccount}
    className="bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
  >
    Create Account
  </Button>
</div>

  );
};

export default CreateMagazineAccount;
