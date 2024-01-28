"use client"
// import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useEffect,useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Submission_Form() {
  const searchParams = useSearchParams()
  const [name,setName] = useState('')
  const [article,setarticle] = useState('')
  
  
  // console.log(name)
 
  const articleCreate =async () => {
    
    // event.preventDefault();
    const magazinename = searchParams.get('name')
  const userName = localStorage.getItem('data-username')
    try {
      const response = await fetch("http://127.0.0.1:5000/submit_article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'user':userName,
            'magazinename':magazinename,
            'Name':name,
            'article':article
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        // setErrorMessage("something went wrong");
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
    <form className="flex max-w-md flex-col gap-4 mx-auto my-12">
      <div>
        <div className="mb-2 block">

          <Label htmlFor="Name" value="Your Name" />
        </div>
        <TextInput
          id="email1"
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // value={submissionData.Name}

          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="large" value="Your article" />
        </div>
        <TextInput id="large" type="text" sizing="lg" 
        
        placeholder='article'
        value={article}
        onChange={(e) => setarticle(e.target.value)}
        
        />
      </div>
      <Button onClick={articleCreate} type="submit">Submit</Button>
    </form>
  );
}
