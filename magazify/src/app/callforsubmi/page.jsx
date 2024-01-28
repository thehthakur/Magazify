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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmissionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    const handleCallForSubmissions = async () => {
    const user = (localStorage.getItem('data-username'))
    const type =  (localStorage.getItem('type'))
    try {
      const response = await fetch("http://127.0.0.1:5000/call_for_submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submissionData,
          'user': user,
          'type':type,
      }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to call for submissions:", errorData.message);
        // Handle error as needed
      } else {
        console.log("Submission called successfully!");
        window.location.href = '/'; 
        // Handle success as needed
      }
    } catch (error) {
      console.error("Error during call for submissions:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md gap-4 bg-gray-400 p-6 rounded-md mx-auto mt-8">
  <label className="w-full">
    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</span>
    <input
      name="title"
      value={submissionData.title}
      onChange={handleInputChange}
      className="w-full bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </label>
  <label className="w-full">
    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</span>
    <input
      name="content"
      value={submissionData.content}
      onChange={handleInputChange}
      className="w-full bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </label>
  {/* Add other form fields as needed */}
  <Button
    onClick={handleCallForSubmissions}
    
  >
    Call for Submissions
  </Button>
</div>

  );
};

export default CallForSubmissions;
