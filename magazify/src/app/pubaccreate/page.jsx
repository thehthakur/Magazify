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
    <div>
      <h1>Create Magazine Account</h1>
      <label>
        Magazine Name
        <input
          name="name"
          value={magazineData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Genre
        <input
          name="genre"
          value={magazineData.genre}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Guideline
        <input
          name="guideline"
          value={magazineData.guideline}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Deadline
        <input
          name="deadline"
          value={magazineData.deadline}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={magazineData.password}
          onChange={handleInputChange}
        />
      </label>
      <checkbox>
        I agree to the terms and conditions
      </checkbox>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

export default CreateMagazineAccount;
