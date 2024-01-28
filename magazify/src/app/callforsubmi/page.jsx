// app/pubaccreate/page.jsx
"use client"
"use router"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { withRouter } from 'next/navigation'; // Import withRouter
const CallForSubmissions = () => {
  const router = useRouter();
  const [submissionData, setSubmissionData] = useState({
    title: "",
    content: "",
    // Add other fields as needed
  });

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Fetch user data from your backend to determine the role
        const response = await fetch("http://127.0.0.1:5000/call_for_submissions");
        const userData = await response.json();

        // Check if the user is logged in and has the role of a magazine
        if (!userData || userData.role !== 'magazine') {
          // Redirect to the login page or display an error message
          router.push('/login');
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        // Handle error as needed
      }
    };

    checkUserRole();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmissionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCallForSubmissions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/call_for_submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to call for submissions:", errorData.message);
        // Handle error as needed
      } else {
        console.log("Submission called successfully!");
        // Handle success as needed
      }
    } catch (error) {
      console.error("Error during call for submissions:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h1>Call for Submissions</h1>
      <label>
        Title
        <input
          name="title"
          value={submissionData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Content
        <input
          name="content"
          value={submissionData.content}
          onChange={handleInputChange}
        />
      </label>
      {/* Add other form fields as needed */}
      <button onClick={handleCallForSubmissions}>Call for Submissions</button>
    </div>
  );
};

export default CallForSubmissions;
